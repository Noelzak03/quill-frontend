"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ text }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="px-4 py-2 sm:font-medium text-white border-2 border-primary bg-secondary hover:bg-primary text-center"
    >
      {text}
    </button>
  );
}
