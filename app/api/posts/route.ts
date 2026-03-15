import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

const MAX_LIMIT_ADMIN = 6;
const MAX_LIMIT_PUBLIC = 50;
const DEFAULT_LIMIT = 6;

// GET - Fetch posts with pagination (public or admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // NEWS or NOTICE
    const all = searchParams.get("all"); // if "true", include inactive (admin only)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const maxLimit = all === "true" ? MAX_LIMIT_ADMIN : MAX_LIMIT_PUBLIC;
    const limit = Math.min(
      maxLimit,
      Math.max(1, parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10))
    );
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (type === "NEWS" || type === "NOTICE") {
      where.type = type;
    }

    // Only show active posts for public access
    if (all !== "true") {
      where.active = true;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          content: true,
          type: true,
          active: true,
          createdAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    const payload: {
      posts: typeof posts;
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      totalNews?: number;
      totalNotice?: number;
    } = {
      posts,
      total,
      page,
      limit,
      totalPages,
    };

    // For admin (all=true), include counts for both types for stats
    if (all === "true") {
      const baseWhere = all === "true" ? {} : { active: true };
      const [totalNews, totalNotice] = await Promise.all([
        prisma.post.count({ where: { ...baseWhere, type: "NEWS" } }),
        prisma.post.count({ where: { ...baseWhere, type: "NOTICE" } }),
      ]);
      payload.totalNews = totalNews;
      payload.totalNotice = totalNotice;
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Fetch posts error:", error);
    return NextResponse.json(
      { error: "পোস্ট লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

// POST - Create a new post (admin only)
export async function POST(request: Request) {
  try {
    const tokenPayload = await verifyToken();
    if (!tokenPayload) {
      return NextResponse.json(
        { error: "অনুমতি নেই" },
        { status: 401 }
      );
    }

    // Ensure admin still exists in DB (e.g. after DB reset), avoid foreign key error
    const admin = await prisma.admin.findUnique({
      where: { id: tokenPayload.adminId },
    });
    if (!admin) {
      return NextResponse.json(
        { error: "সেশন মেয়াদ উত্তীর্ণ। আবার লগইন করুন" },
        { status: 401 }
      );
    }

    const { title, content, type } = await request.json();

    if (!title || !type) {
      return NextResponse.json(
        { error: "শিরোনাম এবং ধরন আবশ্যক" },
        { status: 400 }
      );
    }

    if (type !== "NEWS" && type !== "NOTICE") {
      return NextResponse.json(
        { error: "ধরন অবশ্যই সংবাদ বা নোটিশ হতে হবে" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content: content ?? null,
        type,
        adminId: admin.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "পোস্ট তৈরি করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
