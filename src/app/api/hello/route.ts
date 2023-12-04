import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const greeting = "Heilung";
  const data = {
    greeting,
  };
  return NextResponse.json(data);
}
