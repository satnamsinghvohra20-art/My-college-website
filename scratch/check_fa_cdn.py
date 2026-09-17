import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

missing_fa = []
for f in html_files:
    rel = os.path.relpath(f, ROOT_DIR)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    has_fa_icon = bool(re.search(r'class=[\"\'][^\"\']*\b(fa-solid|fa-regular|fa-brands|fas|far|fab|fa)\b', c))
    has_fa_link = 'font-awesome' in c or 'fontawesome' in c
    if has_fa_icon and not has_fa_link:
        missing_fa.append(rel)

print(f"Total HTML files: {len(html_files)}")
print(f"Files with FA icons but MISSING FA CDN link: {len(missing_fa)}")
for m in missing_fa:
    print(f"  {m}")
