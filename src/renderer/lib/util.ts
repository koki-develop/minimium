import { ParseResultType, parseDomain } from "parse-domain";

export const httpUrl = (urlOrDomain: string): string | null => {
  try {
    const url = new URL(urlOrDomain);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    const result = parseDomain(url.hostname);
    switch (result.type) {
      case ParseResultType.Ip:
      case ParseResultType.Listed:
        return url.toString();
      case ParseResultType.Invalid:
      case ParseResultType.NotListed:
        return null;
      case ParseResultType.Reserved:
        if (result.hostname === "localhost") return url.toString();
        return null;
    }
  } catch {
    //
  }

  return httpUrl(`http://${urlOrDomain}`);
};
