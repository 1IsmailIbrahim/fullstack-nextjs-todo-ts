"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <div className="grid h-[calc(100vh-72px)] px-4 place-content-center">
        <div className="text-center">
          <h1 className="font-black text-red-600 text-9xl">Error!</h1>
          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            Something Went Wrong
          </p>
          <p className="mt-4">
            Oops something went wrong. Try to refresh this page or <br /> feel
            free to contact us if the problem persists.
          </p>
          <Button className="mt-4" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </html>
  );
}
