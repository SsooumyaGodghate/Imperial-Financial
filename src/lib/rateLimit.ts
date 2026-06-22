interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const cache = new Map<string, RateLimitRecord>();

// Clean up cache periodically to prevent leaks
if (typeof global !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now > value.resetTime) {
        cache.delete(key);
      }
    }
  }, 60000).unref?.();
}

/**
 * Checks if the request is within rate limits
 * @param ip IP Address of the client
 * @param limit Max number of requests allowed in window
 * @param windowMs Window size in milliseconds
 * @returns boolean True if request is allowed, false if rate limited
 */
export function isRateLimited(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = cache.get(ip);

  if (!record) {
    cache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return false;
  }

  record.count += 1;
  return record.count > limit;
}
