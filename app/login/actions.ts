"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function signupAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string; // Capture name if provided
    const secretKey = formData.get("secretKey") as string;

    try {
        console.log(`[Signup] Starting signup for role: ${role}, identifier: ${identifier}`);

        // Security Check: If role is NOT student, require the correct Secret Key
        if (role !== "student") {
            const correctKey = process.env.ADMIN_SECRET_KEY || "AITS2026";
            if (secretKey !== correctKey) {
                console.warn(`[Signup] Invalid secret key for role: ${role}`);
                return redirect(`/login?error=${encodeURIComponent("Invalid Secret Key for Faculty/Admin creation")}`);
            }
        }

        const supabase = await createClient();

        const { data, error } = await supabase.auth.signUp({
            email: identifier,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                },
            },
        });

        if (error) {
            console.error(`[Signup] Supabase Error: ${error.message}`);
            return redirect(`/login?error=${encodeURIComponent(error.message)}`);
        }

        if (data.session) {
            console.log(`[Signup] Success, redirecting based on role: ${role}`);
            if (role === "admin") redirect("/faculty/admin/dashboard");
            if (role === "principal" || role === "faculty") redirect("/faculty/dashboard");
            if (role === "student") redirect("/student/dashboard");
            redirect("/");
        } else {
            console.log(`[Signup] Success, email confirmation required`);
            return redirect("/login?message=Check your email to confirm account");
        }
    } catch (err: any) {
        if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
        console.error(`[Signup] Unexpected Error:`, err);
        return redirect(`/login?error=${encodeURIComponent("An unexpected error occurred during signup.")}`);
    }
}


export async function loginAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    // In a real app, verify that the selected role matches the user's actual role in the DB.
    // For now, we trust the auth but still rely on the UI role selection for redirection.
    // Ideally: fetch role from `public.users` table based on auth.uid()

    try {
        console.log(`[Login] Attempting login for role: ${role}, identifier: ${identifier}`);
        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: identifier,
            password: password,
        });

        if (error) {
            console.error(`[Login] Supabase Error: ${error.message}`);
            return redirect(`/login?error=${encodeURIComponent(error.message)}`);
        }

        if (!user) {
            console.warn(`[Login] Authentication failed: No user returned`);
            return redirect(`/login?error=${encodeURIComponent("Authentication failed")}`);
        }

        const userRole = user.user_metadata?.role;
        const selectedRole = role.toLowerCase();

        if (!userRole) {
            console.log(`[Self-Healing] User ${user.email} has no role. Assigning role: ${selectedRole}`);
            const { error: updateError } = await supabase.auth.updateUser({
                data: { role: selectedRole }
            });

            if (updateError) {
                console.error("[Self-Healing] Failed to auto-update user role", updateError);
                return redirect(`/login?error=${encodeURIComponent("Failed to assign role to account. Please contact admin.")}`);
            }
        } else {
            const registeredRole = (userRole || "").toLowerCase();
            if (registeredRole !== selectedRole) {
                console.warn(`[Login] Role mismatch: Registered as ${registeredRole}, trying as ${selectedRole}`);
                await supabase.auth.signOut();
                return redirect(`/login?error=${encodeURIComponent(`Unauthorized: You are registered as a ${registeredRole}, but trying to login as ${selectedRole}.`)}`);
            }
        }

        console.log(`[Login] Success, redirecting based on role: ${selectedRole}`);
        if (selectedRole === "admin") redirect("/faculty/admin/dashboard");
        if (selectedRole === "principal" || selectedRole === "faculty") redirect("/faculty/dashboard");
        if (selectedRole === "student") redirect("/student/dashboard");

        redirect("/");
    } catch (err: any) {
        if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
        console.error(`[Login] Unexpected Error:`, err);
        return redirect(`/login?error=${encodeURIComponent("An unexpected error occurred during sign in.")}`);
    }
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
