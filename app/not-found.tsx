import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl">页面未找到</h2>
        <p className="mb-4 text-gray-600">抱歉，您访问的页面不存在</p>
        <Link
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          href="/"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
