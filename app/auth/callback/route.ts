import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            const user = data.user;
            const role = user.user_metadata?.role || "visitor";

            // Ensure profile exists for Google/OAuth users
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", user.id)
                .single();

            if (!profile) {
                await supabase.from("profiles").insert({
                    id: user.id,
                    full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
                    email: user.email,
                    role: role,
                });

                // If role is visitor, they don't need entry in students/faculty tables for now
            }

            const isLocalEnv = process.env.NODE_ENV === 'development'
            const forwardedHost = request.headers.get('x-forwarded-host')

            let redirectUrl = origin;
            if (!isLocalEnv && forwardedHost) redirectUrl = `https://${forwardedHost}`;

            // Redirect based on role
            if (role === 'admin') return NextResponse.redirect(`${redirectUrl}/faculty/admin/dashboard`);
            if (role === 'faculty' || role === 'principal') return NextResponse.redirect(`${redirectUrl}/faculty/dashboard`);
            return NextResponse.redirect(`${redirectUrl}/student/dashboard`);
        }
    }

    return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
