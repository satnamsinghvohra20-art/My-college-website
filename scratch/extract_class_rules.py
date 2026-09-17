import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
html_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.html")) + glob.glob(os.path.join(ROOT_DIR, "pages", "*.html")))

targets = [
    'badge-gold', 'badge-emerald', 'badge-navy', 'badge-blue', 'badge',
    'status-badge', 'status-safe', 'status-danger', 'status-warning',
    'benefit-tag', 'paper-meta-tag', 'tour-badge', 'statutory-tag',
    'pill-btn', 'btn-gold', 'btn-action', 'pulse-btn', 'title-underline',
    'top-utility-bar', 'utility-inner', 'utility-item', 'utility-left', 'utility-right',
    'footer-content', 'footer-heading', 'footer-col',
    'footer__heading', 'footer__inner', 'footer__text', 'footer__title',
    'form-label', 'form-select', 'form-input', 'wizard-next', 'wizard-prev',
    'notice-card-item', 'gov-content-pane', 'sub',
    'text-success', 'text-warning', 'text-primary', 'text-info', 'text-danger'
]

found_rules = {}

for fpath in html_files:
    rel = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()
    styles = "\n".join(re.findall(r"<style[^>]*>([\s\S]*?)</style>", html))
    for t in targets:
        # search for rule matching .t
        matches = re.findall(rf'(\.{re.escape(t)}\b[^{{]*\{{[^}}]*\}})', styles)
        if matches:
            if t not in found_rules:
                found_rules[t] = []
            for m in matches:
                found_rules[t].append((rel, m.strip()))

for t in targets:
    if t in found_rules:
        print(f"=== .{t} (found in {len(found_rules[t])} places) ===")
        sample = found_rules[t][0]
        print(f"  [{sample[0]}] {sample[1][:120]}...")
    else:
        print(f"=== .{t} (NOT DEFINED IN ANY <style> BLOCK) ===")
