import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value || null;
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path === "/login" && token) {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  if (path === "/profile" && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/profile"],
};
