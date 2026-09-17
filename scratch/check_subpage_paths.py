import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"

# 1. Check pages/ directory
subpages = glob.glob(os.path.join(ROOT_DIR, "pages", "*.html"))
print(f"Checking {len(subpages)} subpages for missing '../' before css/js/assets:")

for f in subpages:
    rel = os.path.relpath(f, ROOT_DIR)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    # matches like src="assets/ or href="css/
    broken = re.findall(r'(?:href|src)=[\"\']((?:assets|css|js)/[^\"\']+)[\"\']', c)
    if broken:
        print(f"\n[{rel}] Found {len(broken)} paths missing '../':")
        for b in set(broken):
            print(f"   {b}")
