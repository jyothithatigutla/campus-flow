"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    });

    if (error) {
        console.error("Google Sign-In Error:", error.message);
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    if (data.url) {
        redirect(data.url);
    }
}

export async function signupAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const secretKey = formData.get("secretKey") as string;

    try {
        // Security Check for higher roles
        if (role === "admin" || role === "faculty" || role === "principal") {
            const correctKey = process.env.ADMIN_SECRET_KEY || "AITS2026";
            if (secretKey !== correctKey) {
                return redirect(`/login?error=${encodeURIComponent("Invalid Secret Key for requested role")}`);
            }
        }

        const supabase = await createClient();

        const { data, error } = await supabase.auth.signUp({
            email: identifier,
            password: password,
            options: {
                data: { full_name: fullName, role: role },
            },
        });

        if (error) return redirect(`/login?error=${encodeURIComponent(error.message)}`);

        if (data.user) {
            const user = data.user;

            // 1. Create Profile
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: user.id,
                    full_name: fullName || identifier.split("@")[0],
                    email: identifier,
                    role: role,
                });

            if (profileError) console.error("Profile Error:", profileError);

            // 2. Create Role-Specific Entry
            if (role === "student") {
                await supabase.from("students").insert({
                    id: user.id,
                    name: fullName || identifier.split("@")[0],
                    email: identifier,
                    year: "3rd Year",
                    section: "Section A",
                    roll_no: "STU-" + Math.random().toString(36).substring(7).toUpperCase()
                });
            } else if (role === "faculty") {
                await supabase.from("faculty").insert({
                    id: user.id,
                    employee_id: "EMP-" + Math.random().toString(36).substring(7).toUpperCase(),
                    department: "AI & DS"
                });
            }
        }

        if (data.session) {
            return redirectByRole(role);
        } else {
            return redirect("/login?message=Check your email to confirm account");
        }
    } catch (err: any) {
        if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
        return redirect(`/login?error=${encodeURIComponent("An unexpected error occurred.")}`);
    }
}

function redirectByRole(role: string) {
    const r = role.toLowerCase();
    if (r === "admin") return redirect("/faculty/admin/dashboard");
    if (r === "principal" || r === "faculty") return redirect("/faculty/dashboard");
    if (r === "student") return redirect("/student/dashboard");
    return redirect("/");
}


export async function loginAction(formData: FormData) {
    const role = formData.get("role") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    try {
        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: identifier,
            password: password,
        });

        if (error) return redirect(`/login?error=${encodeURIComponent(error.message)}`);
        if (!user) return redirect(`/login?error=${encodeURIComponent("Authentication failed")}`);

        // 1. Self-Healing: Ensure profile exists for manually added users
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        let userRole = profile?.role || user.user_metadata?.role || "student";

        if (!profile) {
            // Create missing profile on the fly
            const { error: profileError } = await supabase.from("profiles").insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
                email: user.email,
                role: userRole,
            });
            if (profileError) console.error("Self-healing profile error:", profileError);

            // Create missing role-specific record
            if (userRole === "student") {
                await supabase.from("students").insert({
                    id: user.id,
                    name: user.user_metadata?.full_name || user.email?.split('@')[0],
                    email: user.email,
                    year: "3rd Year",
                    section: "Section A",
                    roll_no: "STU-" + Math.random().toString(36).substring(7).toUpperCase()
                });
            } else if (userRole === "faculty") {
                await supabase.from("faculty").insert({
                    id: user.id,
                    employee_id: "EMP-" + Math.random().toString(36).substring(7).toUpperCase(),
                    department: "AI & DS"
                });
            }
        }

        const selectedRole = role.toLowerCase();

        // Strict check for non-visitor roles to prevent lateral movement in demo
        if (userRole !== selectedRole && userRole !== 'admin') {
            // Sign out if trying to cross-login
            await supabase.auth.signOut();
            return redirect(`/login?error=${encodeURIComponent(`Unauthorized: You are registered as ${userRole}.`)}`);
        }

        return redirectByRole(userRole);
    } catch (err: any) {
        if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
        return redirect(`/login?error=${encodeURIComponent("An unexpected error occurred during sign in.")}`);
    }
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
