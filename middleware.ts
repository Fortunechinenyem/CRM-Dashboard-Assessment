import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
