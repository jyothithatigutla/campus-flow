
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // 1. Redirect to dashboard if logged in and trying to access login
    if (path === "/login" && user) {
        // In a real app we'd check the user's role from the DB here
        // handling a basic redirect for now
        return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }

    // 2. Protect role-based routes with Redirect Loops
    if (!user) {
        if (path.startsWith("/faculty") || path.startsWith("/student")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        const userRole = user.user_metadata?.role as string;

        // Block Students from Faculty/Admin areas
        if (userRole === "student" && path.startsWith("/faculty")) {
            return NextResponse.redirect(new URL("/student/dashboard", request.url));
        }

        // Block Faculty from Student areas
        if ((userRole === "faculty" || userRole === "admin" || userRole === "principal") && path.startsWith("/student")) {
            return NextResponse.redirect(new URL("/faculty/dashboard", request.url));
        }
    }

    return response;
}
