import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  console.log("MIDDLEWARE HIT:", request.nextUrl.pathname);
  
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url)); // ✅ your actual login page
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin", request.url)); // ✅
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin", request.url)); // ✅
  }
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/dashboard/:path*",
    "/admin/heroslides",
    "/admin/heroslides/:path*",
    "/admin/productlist",
    "/admin/productlist/:path*",
    "/admin/orders",
    "/admin/orders/:path*",
  ],
};