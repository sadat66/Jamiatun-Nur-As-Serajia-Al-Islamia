import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ইমেইল এবং পাসওয়ার্ড দিন" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "ভুল ইমেইল বা পাসওয়ার্ড" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "ভুল ইমেইল বা পাসওয়ার্ড" },
        { status: 401 }
      );
    }

    const token = await createToken(admin.id, admin.name);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      name: admin.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
