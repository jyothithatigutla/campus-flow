"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function signupAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string; // Capture name if provided
    const secretKey = formData.get("secretKey") as string;

    // Security Check: If role is NOT student, require the correct Secret Key
    // This prevents students from creating Admin/Faculty accounts
    if (role !== "student") {
        const correctKey = process.env.ADMIN_SECRET_KEY || "AITS2026"; // Hardcoded backup or env var
        if (secretKey !== correctKey) {
            return redirect(`/login?error=${encodeURIComponent("Invalid Secret Key for Faculty/Admin creation")}`);
        }
    }

    const supabase = await createClient();

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
        email: identifier,
        password: password,
        options: {
            data: {
                full_name: fullName,
                role: role, // Store role in metadata for easy access
            },
        },
    });

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    // Ideally, we would insert into public.students or public.faculty here too.
    // For now, we rely on the Auth user being created.

    // If "Confirm Email" is disabled in Supabase, they are logged in automatically.
    // If enabled, they need to check email. We assume disabled for this "manual provision" flow.

    if (data.session) {
        // Logged in successfully
        if (role === "admin") redirect("/faculty/admin/dashboard");
        if (role === "principal" || role === "faculty") redirect("/faculty/dashboard");
        if (role === "student") redirect("/student/dashboard");
        redirect("/");
    } else {
        // Needs email verification
        return redirect("/login?message=Check your email to confirm account");
    }
}


export async function loginAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    // In a real app, verify that the selected role matches the user's actual role in the DB.
    // For now, we trust the auth but still rely on the UI role selection for redirection.
    // Ideally: fetch role from `public.users` table based on auth.uid()

    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
    });

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    if (!user) {
        return redirect(`/login?error=${encodeURIComponent("Authentication failed")}`);
    }

    // --- Strict Role Verification ---
    // --- Strict Role Verification (with Self-Healing) ---
    // Check if the user's registered role matches the role they are trying to login as.
    const userRole = user.user_metadata?.role;
    const selectedRole = role.toLowerCase();

    // Auto-Fix: If user has NO role (e.g. manually created via Supabase), assign them the role they are trying to login as.
    // This solves the issue of users getting stuck in a redirect loop because of missing metadata.
    if (!userRole) {
        console.log(`[Self-Healing] User ${user.email} has no role. Assigning role: ${selectedRole}`);
        const { error: updateError } = await supabase.auth.updateUser({
            data: { role: selectedRole }
        });

        if (updateError) {
            console.error("Failed to auto-update user role", updateError);
            return redirect(`/login?error=${encodeURIComponent("Failed to assign role to account. Please contact admin.")}`);
        }

        // Proceed with login since we just fixed the role
    } else {
        const registeredRole = (userRole || "").toLowerCase();
        if (registeredRole !== selectedRole) {
            // If mismatch, sign them out immediately and showError
            await supabase.auth.signOut();
            return redirect(`/login?error=${encodeURIComponent(`Unauthorized: You are registered as a ${registeredRole}, but trying to login as ${selectedRole}.`)}`);
        }
    }

    // Login successful & Role Verified
    if (selectedRole === "admin") redirect("/faculty/admin/dashboard");
    if (selectedRole === "principal" || selectedRole === "faculty") redirect("/faculty/dashboard");
    if (selectedRole === "student") redirect("/student/dashboard");

    redirect("/");
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
