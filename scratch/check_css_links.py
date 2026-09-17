import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

print(f"Checking CSS links across {len(html_files)} HTML files...")

missing_links = []
for f in html_files:
    rel = os.path.relpath(f, ROOT_DIR)
    is_subpage = 'pages' in rel
    expected_theme = "../css/theme.css" if is_subpage else "css/theme.css"
    expected_comp = "../css/components.css" if is_subpage else "css/components.css"
    expected_resp = "../css/responsive.css" if is_subpage else "css/responsive.css"
    
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    has_theme = expected_theme in c
    has_comp = expected_comp in c
    has_resp = expected_resp in c
    
    if not (has_theme and has_comp and has_resp):
        missing_links.append({
            'file': rel,
            'theme': has_theme,
            'components': has_comp,
            'responsive': has_resp,
            'all_links': re.findall(r'<link[^>]*rel=[\"\']stylesheet[\"\'][^>]*>', c)
        })

print(f"Files with missing or wrong relative CSS links: {len(missing_links)}")
for m in missing_links:
    print(f"  {m['file']}: theme={m['theme']}, comp={m['components']}, resp={m['responsive']}")
    for l in m['all_links']:
        print(f"    {l}")
