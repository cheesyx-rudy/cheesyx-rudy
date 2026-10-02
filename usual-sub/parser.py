#!/usr/bin/env python3
import gzip
import os
import re
import urllib.parse
import urllib.request
import zlib
from pathlib import Path

SUBSCRIPTION_URL = (
    "https://ssconnect.app/?url_ha="
    "https://flaregate.dedyn.io/api/v1/sub/7wH9ySRsmQizQNdQjkcing"
)

BASE_DIR = Path(__file__).resolve().parent
OUTPUT = BASE_DIR / "frgt.txt"
CACHE_DIR = BASE_DIR / ".cache"
CACHE_FILE = CACHE_DIR / "frgt.txt"

USER_AGENT = "Happ/4.4.1/Android/17891107313301967618"
DEVICE_OS = "Android"
DEVICE_VER_OS = "16"
DEVICE_MODEL = "24117RN76O"
HWID = "6b77631a1de1c0e8"
DEVICE_LOCALE = "ru"

URL_RE = re.compile(r'https?://[^\s<>"\']+', re.I)


def build_headers():
    return {
        "User-Agent": USER_AGENT,
        "X-Device-Os": DEVICE_OS,
        "X-Device-Locale": DEVICE_LOCALE,
        "X-Device-Model": DEVICE_MODEL,
        "X-Ver-Os": DEVICE_VER_OS,
        "X-Hwid": HWID,
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
    }


def decode_body(data, headers):
    encoding = (headers.get("Content-Encoding") or "").lower()
    try:
        if "gzip" in encoding:
            return gzip.decompress(data).decode("utf-8", errors="replace")
        if "deflate" in encoding:
            try:
                return zlib.decompress(data).decode("utf-8", errors="replace")
            except zlib.error:
                return zlib.decompress(data, -zlib.MAX_WBITS).decode(
                    "utf-8", errors="replace"
                )
    except Exception:
        pass
    return data.decode("utf-8", errors="replace")


def http_get(url):
    request = urllib.request.Request(url, headers=build_headers())
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read()
        return response.geturl(), decode_body(data, response.headers)


def looks_like_subscription(text):
    lowered = text.lower()
    return (
        "vless://" in lowered
        or "vmess://" in lowered
        or "trojan://" in lowered
        or "ss://" in lowered
        or "hysteria" in lowered
        or "tuic://" in lowered
    )


def clean_url(url):
    return url.rstrip(".,;:)]}>\"'")


def find_subscription_url(text):
    for match in re.finditer(r"url_ha=([^&\s<>\"']+)", text, re.I):
        value = urllib.parse.unquote(match.group(1))
        if value.startswith(("http://", "https://")):
            return clean_url(value)

    api_match = re.search(
        r"https?://[^\s<>\"']+/api/v1/sub/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+",
        text,
        re.I,
    )
    if api_match:
        return clean_url(api_match.group(0))

    for url in URL_RE.findall(text):
        url = clean_url(url)
        path = urllib.parse.urlsplit(url).path.lower()
        if "/api/v1/sub/" in url or "sub" in path:
            return url

    return None


def fetch_subscription():
    current_url, body = http_get(SUBSCRIPTION_URL)

    if looks_like_subscription(body):
        return body

    real_url = find_subscription_url(body)
    if not real_url and current_url != SUBSCRIPTION_URL:
        real_url = find_subscription_url(current_url)

    if not real_url:
        raise RuntimeError("Could not find the real subscription URL")

    _, subscription = http_get(real_url)

    if not looks_like_subscription(subscription):
        raise RuntimeError("Resolved URL did not return a subscription")

    return subscription


def valid_cache():
    return CACHE_FILE.exists() and CACHE_FILE.stat().st_size > 0


def write_output(content):
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    tmp = OUTPUT.with_suffix(".tmp")
    tmp.write_text(content, encoding="utf-8")
    tmp.replace(OUTPUT)


def write_cache(content):
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    tmp = CACHE_FILE.with_suffix(".tmp")
    tmp.write_text(content, encoding="utf-8")
    tmp.replace(CACHE_FILE)


def main():
    try:
        content = fetch_subscription()
        write_cache(content)
        write_output(content)
        print(f"[DONE] wrote {OUTPUT} ({len(content)} bytes)")
    except Exception as error:
        print(f"[SOURCE ERROR] {error}")
        if valid_cache():
            content = CACHE_FILE.read_text(encoding="utf-8")
            write_output(content)
            print(f"[CACHE] restored {CACHE_FILE}")
            return
        raise


if __name__ == "__main__":
    main()
