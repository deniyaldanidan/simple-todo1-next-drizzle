"use client";

export default function ErrorInfo({ msg }: { msg: string }) {
  return (
    <div className="text-danger text-xl text-center min-h-screen px-page-margin-x py-10 flex items-center justify-center">
      {msg}
    </div>
  );
}
