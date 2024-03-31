import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleZodError(error: any) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid entity provided in payload" },
      { status: 422 },
    );
  } else {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
