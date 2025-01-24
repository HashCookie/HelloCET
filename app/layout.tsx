import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "大学英语四六级在线模拟考试系统",
  description:
    "免费的大学英语四六级在线模拟考试平台，提供历年真题练习、听力训练、写作批改等功能",
  keywords: "CET4,CET6,四级,六级,英语考试,在线模拟,听力训练",
  openGraph: {
    title: "大学英语四六级在线模拟考试系统",
    description: "免费的大学英语四六级在线模拟考试平台",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
