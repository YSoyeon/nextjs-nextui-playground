'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="kr">
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold">
            Oops! Something went wrong.
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            We apologize for the inconvenience. Please try again later.
          </p>
          <button
            type="button"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={reset}
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
