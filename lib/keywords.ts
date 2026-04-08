import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

export type KeywordEntry = {
  keyword: string;
  searchVolume: number;
};

function parseLine(line: string): string[] {
  return line
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const getKeywordEntries = cache(async (): Promise<KeywordEntry[]> => {
  const csvPath = path.join(process.cwd(), "public", "keywords.csv");
  const raw = await fs.readFile(csvPath, "utf8");

  return raw
    .split(/\r?\n/)
    .slice(1)
    .map(parseLine)
    .filter((parts) => parts.length >= 2)
    .map(([keyword, searchVolume]) => ({
      keyword,
      searchVolume: Number(searchVolume.replace(/,/g, "")) || 0,
    }))
    .filter((entry) => entry.keyword.length > 0)
    .sort((a, b) => b.searchVolume - a.searchVolume);
});

export const getTopKeywords = cache(async (count: number = 8) => {
  const keywords = await getKeywordEntries();
  return keywords.slice(0, count);
});
