import { ParseResultType, parseDomain } from "parse-domain";

export const httpUrl = (urlOrDomain: string): URL | null => {
  try {
    const url = new URL(urlOrDomain);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    const result = parseDomain(url.hostname);
    switch (result.type) {
      case ParseResultType.Invalid:
      case ParseResultType.NotListed:
        return null;
      case ParseResultType.Ip:
      case ParseResultType.Reserved:
      case ParseResultType.Listed:
        return url;
    }
  } catch {
    //
  }

  return httpUrl(`http://${urlOrDomain}`);
};
