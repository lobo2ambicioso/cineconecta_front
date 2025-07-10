import { NextRequest, NextResponse } from "next/server";

const VALID_PATHS = ["/", "/login", "/register", "/catalog", "/films"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isValidStaticPath = VALID_PATHS.includes(pathname);
  const isValidDynamicPath = VALID_PATHS.some(path =>
    pathname.startsWith(path + "/")
  );

  if (
    !isValidStaticPath &&
    !isValidDynamicPath &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.includes(".")
  ) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/404";
    return NextResponse.rewrite(notFoundUrl);
  }

  return NextResponse.next();
}
