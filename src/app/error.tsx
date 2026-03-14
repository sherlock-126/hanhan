"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
