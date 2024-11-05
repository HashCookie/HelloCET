import ScoresHistory from "../components/ScoresHistory";

export default function ScoresPage() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-5">
      <div className="relative mb-6">
        <a
          href="/"
          className="inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
      </div>
      <ScoresHistory />
    </div>
  );
}
