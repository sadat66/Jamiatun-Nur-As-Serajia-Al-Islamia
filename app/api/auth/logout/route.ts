import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export async function POST() {
  await removeAuthCookie();
  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  await removeAuthCookie();
  const url = new URL(request.url);
  const next = url.searchParams.get("next") || "/";
  return NextResponse.redirect(new URL(next, url.origin));
}
