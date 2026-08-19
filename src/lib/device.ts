const KEY = "torii-device-id";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isDeviceId(value: string): boolean {
  return UUID.test(value);
}

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing && isDeviceId(existing)) return existing;
    const next = window.crypto.randomUUID();
    window.localStorage.setItem(KEY, next);
    return next;
  } catch {
    return "";
  }
}
