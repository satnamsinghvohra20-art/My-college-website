import os
import re
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(BASE_DIR, "pages")

errors = []
checked_links = 0

def check_file(file_path, base_folder):
    global checked_links
    rel_path = os.path.relpath(file_path, BASE_DIR)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Check stylesheets
    for match in re.finditer(r'<link[^>]+rel=[\'"]stylesheet[\'"][^>]+href=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE):
        href = match.group(1)
        if href.startswith(('http:', 'https:', '//')):
            continue
        checked_links += 1
        resolved = os.path.normpath(os.path.join(base_folder, href))
        if not os.path.exists(resolved):
            errors.append(f"[{rel_path}] Broken stylesheet: {href} -> resolved as {resolved}")

    # 2. Check scripts
    for match in re.finditer(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE):
        src = match.group(1)
        if src.startswith(('http:', 'https:', '//')):
            continue
        checked_links += 1
        resolved = os.path.normpath(os.path.join(base_folder, src))
        if not os.path.exists(resolved):
            errors.append(f"[{rel_path}] Broken script: {src} -> resolved as {resolved}")

    # 3. Check images
    for match in re.finditer(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE):
        src = match.group(1)
        if src.startswith(('http:', 'https:', '//', 'data:')):
            continue
        checked_links += 1
        resolved = os.path.normpath(os.path.join(base_folder, src))
        if not os.path.exists(resolved):
            errors.append(f"[{rel_path}] Broken image: {src} -> resolved as {resolved}")

    # 4. Check anchor links
    for match in re.finditer(r'<a[^>]+href=[\'"]([^\'"]+)[\'"]', content, re.IGNORECASE):
        href = match.group(1).split('#')[0].split('?')[0]
        if not href or href.startswith(('http:', 'https:', 'mailto:', 'tel:', 'javascript:')):
            continue
        checked_links += 1
        resolved = os.path.normpath(os.path.join(base_folder, href))
        if not os.path.exists(resolved):
            errors.append(f"[{rel_path}] Broken anchor link: {href} -> resolved as {resolved}")

# Check index.html
check_file(os.path.join(BASE_DIR, "index.html"), BASE_DIR)

# Check all pages in pages/
for pf in os.listdir(PAGES_DIR):
    if pf.endswith(".html"):
        check_file(os.path.join(PAGES_DIR, pf), PAGES_DIR)

print("=" * 60)
print(f"VALIDATION REPORT: Checked {checked_links} assets and links.")
if errors:
    print(f"FOUND {len(errors)} BROKEN REFERENCES:")
    for err in errors:
        print("  -", err)
else:
    print("SUCCESS: ZERO BROKEN REFERENCES! All stylesheets, scripts, images, and links resolve perfectly.")
print("=" * 60)
