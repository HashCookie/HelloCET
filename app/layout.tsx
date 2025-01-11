import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "HelloCET",
  description: "为准备参加大学英语四级和六级考试的学生设计的在线测试网站。",
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
