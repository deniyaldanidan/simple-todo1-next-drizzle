"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ backgroundColor: "#000a05" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "15px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.5em",
              color: "#f22",
            }}
          >
            Something went wrong!
          </h2>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "8px 20px",
              backgroundColor: "#a1a7c8",
              color: "black",
              fontSize: "1.15rem",
              borderRadius: "10px",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
