import type { ContentCategory, ContentResponse } from "@/types/content";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost/api";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  tagTypes: ["Feed", "Trending"],
  endpoints: (builder) => ({
    getFeed: builder.query<
      ContentResponse,
      { categories: ContentCategory[]; page: number; query?: string }
    >({
      query: ({ categories, page, query = "" }) => {
        const params = new URLSearchParams({
          categories: categories.join(","),
          page: String(page),
          mode: "feed",
        });
        if (query) params.set("q", query);
        return `/content?${params.toString()}`;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const { categories, query } = queryArgs;
        return `${categories.slice().sort().join(",")}|${query ?? ""}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        const existingIds = new Set(currentCache.items.map((item) => item.id));
        const appended = newItems.items.filter(
          (item) => !existingIds.has(item.id),
        );
        currentCache.items.push(...appended);
        currentCache.page = newItems.page;
        currentCache.hasMore = newItems.hasMore;
        currentCache.source = newItems.source;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.query !== previousArg?.query ||
        currentArg?.categories.join(",") !== previousArg?.categories.join(","),
      providesTags: ["Feed"],
    }),
    getTrending: builder.query<ContentResponse, { categories: ContentCategory[] }>(
      {
        query: ({ categories }) => {
          const params = new URLSearchParams({
            categories: categories.join(","),
            mode: "trending",
          });
          return `/content?${params.toString()}`;
        },
        providesTags: ["Trending"],
      },
    ),
  }),
});

export const { useGetFeedQuery, useGetTrendingQuery } = contentApi;
