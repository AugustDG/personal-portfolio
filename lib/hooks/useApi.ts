"use client";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed ${res.status}`);
  return res.json();
}

export function useApi<T = any>(path: string) {
  const { data, error, isLoading, mutate } = useSWR<{ data: T }>(
    path,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return { data: data?.data as T | undefined, error, isLoading, mutate };
}
