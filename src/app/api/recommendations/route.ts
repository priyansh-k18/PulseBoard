import { getUnifiedContent } from "@/lib/api/fetchers";
import { connection } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connection();
  const { searchParams } = request.nextUrl;
  const payload = await getUnifiedContent({
    categories: searchParams.get("categories"),
    page: searchParams.get("page"),
    query: searchParams.get("q"),
    mode: "feed",
  });

  return NextResponse.json({
    ...payload,
    items: payload.items.filter((item) => item.type === "recommendation"),
  });
}
