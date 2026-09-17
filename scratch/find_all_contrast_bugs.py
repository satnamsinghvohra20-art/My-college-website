import os
import glob
import re
from bs4 import BeautifulSoup

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

issues = []

def is_dark_bg(color_str):
    color_str = color_str.lower().strip()
    if any(k in color_str for k in ['#0', '#1', '#2', 'navy', 'dark', 'emerald-dark', 'rgba(0,', 'rgba(10,', 'rgba(7,', 'black']):
        return True
    return False

for fpath in html_files:
    rel = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        content = fp.read()
    
    soup = BeautifulSoup(content, "html.parser")
    
    # 1. Check all buttons (<button> and <a> with class 'btn...')
    for tag in soup.find_all(['button', 'a', 'input']):
        tag_type = tag.name
        classes = tag.get('class', [])
        style = tag.get('style', '')
        tag_id = tag.get('id', '')
        text = tag.get_text(strip=True)[:50]
        
        # Check if button has no class or only generic class
        if tag_type == 'button':
            if not classes and not style:
                issues.append({
                    'file': rel,
                    'type': 'Unstyled <button>',
                    'detail': f"id='{tag_id}' text='{text}'"
                })
        
        # Check for btn-secondary outside dark hero
        if 'btn-secondary' in classes:
            in_dark_hero = False
            curr = tag.parent
            depth = 0
            while curr and depth < 6:
                curr_cls = " ".join(curr.get('class', []))
                curr_style = curr.get('style', '')
                if any(h in curr_cls for h in ['hero', 'banner', 'dark']) or is_dark_bg(curr_style):
                    in_dark_hero = True
                    break
                curr = curr.parent
                depth += 1
            
            if not in_dark_hero:
                issues.append({
                    'file': rel,
                    'type': 'btn-secondary outside dark hero (potential white-on-white)',
                    'detail': f"id='{tag_id}' text='{text}' classes='{' '.join(classes)}'"
                })
            
        # Check inline styles for white text on light or transparent
        if 'color: #fff' in style.lower() or 'color: white' in style.lower():
            if 'background' not in style.lower():
                parent = tag.parent
                p_style = parent.get('style', '') if parent else ''
                p_cls = " ".join(parent.get('class', [])) if parent else ''
                if not any(k in p_cls for k in ['hero', 'footer', 'dark', 'nav', 'badge']) and not is_dark_bg(p_style):
                    issues.append({
                        'file': rel,
                        'type': 'White text without explicit dark background',
                        'detail': f"<{tag_type} class='{' '.join(classes)}' style='{style}'> text='{text}' | Parent: <{parent.name if parent else ''} class='{p_cls}'>"
                    })

        # Check inline styles for dark text on dark background
        if any(d in style.lower() for d in ['color: #0', 'color: black', 'color: var(--primary-navy)', 'color: var(--chm-emerald-dark)', 'color: #0f172a']):
            parent = tag.parent
            p_style = parent.get('style', '') if parent else ''
            p_cls = " ".join(parent.get('class', [])) if parent else ''
            if any(k in p_cls for k in ['hero', 'dark', 'nav']) or is_dark_bg(p_style):
                issues.append({
                    'file': rel,
                    'type': 'Dark text inside dark container',
                    'detail': f"<{tag_type} class='{' '.join(classes)}' style='{style}'> text='{text}' | Parent: <{parent.name if parent else ''} class='{p_cls}'>"
                })

by_type = {}
for iss in issues:
    t = iss['type']
    if t not in by_type:
        by_type[t] = []
    by_type[t].append(iss)

out_file = os.path.join(ROOT_DIR, "scratch", "contrast_issues_report.txt")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(f"TOTAL POTENTIAL CONTRAST ISSUES IDENTIFIED: {len(issues)}\n\n")
    for t, items in by_type.items():
        f.write(f"=== {t} ({len(items)}) ===\n")
        for item in items:
            f.write(f"  [{item['file']}] {item['detail']}\n")
        f.write("\n")

print(f"Report written successfully to {out_file}. Total issues: {len(issues)}")
