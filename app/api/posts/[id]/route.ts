import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET - Fetch single post by id (public: active only)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findFirst({
      where: { id, active: true },
      select: {
        id: true,
        title: true,
        content: true,
        type: true,
        createdAt: true,
      },
    });
    if (!post) {
      return NextResponse.json({ error: "পোস্ট পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Fetch post error:", error);
    return NextResponse.json(
      { error: "পোস্ট লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

// PATCH - Update a post (toggle active, update title, content)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyToken();
    if (!admin) {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.active !== undefined && { active: body.active }),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "আপডেট করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyToken();
    if (!admin) {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "মুছে ফেলতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
