import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await bcrypt.hash("Admin@Madrasa2026!", 12);

    const admin = await prisma.admin.upsert({
      where: { email: "admin@madrasa.com" },
      update: {
        password: hashedPassword, // Ensure the password updates if the admin already exists
      },
      create: {
        name: "মাদরাসা অ্যাডমিন",
        email: "admin@madrasa.com",
        password: hashedPassword,
      },
    });

    console.log("✅ অ্যাডমিন অ্যাকাউন্ট তৈরি হয়েছে:");
    console.log(`   ইমেইল: admin@madrasa.com`);
    console.log(`   পাসওয়ার্ড: Admin@Madrasa2026!`);
    console.log(`   আইডি: ${admin.id}`);

    const samplePosts = [
      {
        title: "মাদরাসার বার্ষিক মাহফিলের তারিখ ঘোষণা",
        type: "NEWS" as const,
        adminId: admin.id,
      },
      {
        title: "নতুন শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু",
        type: "NEWS" as const,
        adminId: admin.id,
      },
      {
        title: "দাওরায়ে হাদীসের ফলাফল প্রকাশিত",
        type: "NEWS" as const,
        adminId: admin.id,
      },
      {
        title: "রমজান মাসের সময়সূচি পরিবর্তন সংক্রান্ত বিজ্ঞপ্তি",
        type: "NOTICE" as const,
        adminId: admin.id,
      },
      {
        title: "পরীক্ষার সময়সূচি প্রকাশিত - সকল বিভাগ",
        type: "NOTICE" as const,
        adminId: admin.id,
      },
      {
        title: "ছাত্রাবাসে নতুন নিয়মাবলী জারি",
        type: "NOTICE" as const,
        adminId: admin.id,
      },
    ];

    for (const post of samplePosts) {
      await prisma.post.create({ data: post });
    }

    console.log(`\n✅ ${samplePosts.length}টি নমুনা পোস্ট তৈরি হয়েছে`);
  } catch (e) {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
