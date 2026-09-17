import os
import glob
import re
from bs4 import BeautifulSoup

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

print("Finding all hero/banner classes across all HTML files:")
hero_classes = set()
for f in html_files:
    rel = os.path.relpath(f, ROOT_DIR)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    soup = BeautifulSoup(c, 'html.parser')
    for tag in soup.find_all(True):
        classes = tag.get('class', [])
        for cls in classes:
            if any(k in cls.lower() for k in ['hero', 'banner', 'jumbotron']):
                hero_classes.add((cls, rel))

for cls, f in sorted(hero_classes):
    print(f"  .{cls:<25} in {f}")
