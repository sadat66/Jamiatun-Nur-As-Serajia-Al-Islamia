import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "জামিআ'তুন নূর আস সিরাজিয়া আল ইসলামিয়া | Jamiatun Noor As-Sirajia Al-Islamia",
  description:
    "জামিআ'তুন নূর আস সিরাজিয়া আল ইসলামিয়া, তেজগাঁও, ঢাকা ১২১৫ - একটি ঐতিহ্যবাহী ইসলামী শিক্ষা প্রতিষ্ঠান",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
