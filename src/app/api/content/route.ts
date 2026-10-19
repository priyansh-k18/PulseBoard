import { getUnifiedContent } from "@/lib/api/fetchers";
import { connection } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connection();

  try {
    const { searchParams } = request.nextUrl;
    const payload = await getUnifiedContent({
      categories: searchParams.get("categories"),
      page: searchParams.get("page"),
      query: searchParams.get("q"),
      mode: searchParams.get("mode"),
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Content API error:", error);
    return NextResponse.json(
      {
        items: [],
        page: 1,
        hasMore: false,
        source: "mock",
        error: "Failed to fetch content",
      },
      { status: 500 },
    );
  }
}
