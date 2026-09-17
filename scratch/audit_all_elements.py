import os
import glob
import re
import sys
from bs4 import BeautifulSoup

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"

html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

with open(os.path.join(ROOT_DIR, "css", "components.css"), "r", encoding="utf-8", errors="ignore") as f:
    components_css = f.read()
with open(os.path.join(ROOT_DIR, "css", "theme.css"), "r", encoding="utf-8", errors="ignore") as f:
    theme_css = f.read()
with open(os.path.join(ROOT_DIR, "css", "responsive.css"), "r", encoding="utf-8", errors="ignore") as f:
    responsive_css = f.read()

global_css = components_css + "\n" + theme_css + "\n" + responsive_css

# Read all page styles once
page_styles_dict = {}
for fpath in html_files:
    rel = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html_doc = fp.read()
    page_styles = "\n".join(re.findall(r"<style[^>]*>([\s\S]*?)</style>", html_doc))
    page_styles_dict[rel] = page_styles

report_lines = []
report_lines.append(f"TOTAL HTML FILES: {len(html_files)}")

# 1. Audit all buttons and links styled as buttons
uncovered_buttons = []
all_buttons = []

for fpath in html_files:
    rel = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html_doc = fp.read()
    
    combined_css = global_css + "\n" + page_styles_dict[rel]
    soup = BeautifulSoup(html_doc, "html.parser")
    
    for el in soup.find_all(lambda tag: tag.name == 'button' or (tag.has_attr('class') and any('btn' in c for c in tag['class']))):
        tag_name = el.name
        classes = el.get("class", [])
        el_id = el.get("id", "")
        style = el.get("style", "")
        text = el.get_text(strip=True)[:50]
        
        has_class_rule = False
        for c in classes:
            if re.search(rf"\.{re.escape(c)}\b", combined_css):
                has_class_rule = True
                break
        
        has_id_rule = False
        if el_id:
            if re.search(rf"#{re.escape(el_id)}\b", combined_css):
                has_id_rule = True
                
        has_inline_bg_color = ('background' in style.lower()) and ('color' in style.lower())
        
        button_data = {
            "file": rel,
            "tag": tag_name,
            "id": el_id,
            "classes": classes,
            "style": style,
            "text": text,
            "has_class_rule": has_class_rule,
            "has_id_rule": has_id_rule,
            "has_inline_bg_color": has_inline_bg_color
        }
        all_buttons.append(button_data)
        
        if not has_class_rule and not has_id_rule and not has_inline_bg_color:
            uncovered_buttons.append(button_data)

report_lines.append(f"\nTOTAL BUTTONS FOUND: {len(all_buttons)}")
report_lines.append(f"UNCOVERED / UNSTYLED BUTTONS: {len(uncovered_buttons)}\n")

for ub in uncovered_buttons:
    cls_str = " ".join(ub['classes']) if ub['classes'] else "(no class)"
    id_str = f"id='{ub['id']}'" if ub['id'] else "(no id)"
    report_lines.append(f"File: {ub['file']:<30} | Tag: <{ub['tag']}> {id_str:<25} Class: {cls_str:<25} | Text: '{ub['text']}'")

# 2. Check for missing classes used across HTML files
all_html_classes = set()
class_file_map = {}

for fpath in html_files:
    rel = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html_doc = fp.read()
    soup = BeautifulSoup(html_doc, "html.parser")
    for tag in soup.find_all(True):
        if tag.has_attr("class"):
            for c in tag["class"]:
                all_html_classes.add(c)
                if c not in class_file_map:
                    class_file_map[c] = set()
                class_file_map[c].add(rel)

report_lines.append(f"\nTOTAL UNIQUE CLASSES ACROSS HTML: {len(all_html_classes)}")

missing_in_global = {}
for c in sorted(all_html_classes):
    if not re.search(rf"\.{re.escape(c)}\b", global_css):
        missing_in_global[c] = class_file_map[c]

completely_unstyled = {}
for c, files in missing_in_global.items():
    styled_in_any = False
    for f in files:
        if re.search(rf"\.{re.escape(c)}\b", page_styles_dict[f]):
            styled_in_any = True
            break
    if not styled_in_any:
        completely_unstyled[c] = files

report_lines.append(f"CLASSES NOT IN GLOBAL CSS: {len(missing_in_global)}")
report_lines.append(f"CLASSES COMPLETELY UNSTYLED ANYWHERE: {len(completely_unstyled)}\n")

report_lines.append("TOP COMPLETELY UNSTYLED CLASSES BY USAGE:")
for c, files in sorted(completely_unstyled.items(), key=lambda x: len(x[1]), reverse=True):
    file_list_sample = ", ".join(sorted(list(files))[:3])
    if len(files) > 3:
        file_list_sample += f" ... (+{len(files)-3} more)"
    report_lines.append(f"  .{c:<35} (used in {len(files):>2} files: {file_list_sample})")

out_file = os.path.join(ROOT_DIR, "scratch", "detailed_audit_report.txt")
with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n".join(report_lines))

print(f"Report written to {out_file} with {len(report_lines)} lines.")
