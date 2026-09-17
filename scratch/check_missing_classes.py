import os
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"

with open(os.path.join(ROOT_DIR, "css", "components.css"), "r", encoding="utf-8", errors="ignore") as f:
    components_css = f.read()
with open(os.path.join(ROOT_DIR, "css", "theme.css"), "r", encoding="utf-8", errors="ignore") as f:
    theme_css = f.read()

global_css = components_css + "\n" + theme_css

classes_to_check = [
    'top-bar', 'top-bar__inner', 'top-bar__left', 'top-bar__right',
    'header__inner', 'header__brand', 'header__logo', 'header__titles', 'header__subtitle', 'header__title', 'header__affiliation', 'header__actions',
    'navbar', 'navbar__inner', 'navbar__toggle', 'navbar__menu',
    'accessibility-ctrls',
    'top-utility-bar', 'utility-inner', 'utility-item', 'utility-left', 'utility-right',
    'footer', 'footer__grid', 'footer__col', 'footer__links', 'footer__bottom', 'footer__bottom-inner',
    'footer-content', 'footer-heading', 'footer-col',
    'footer__heading', 'footer__inner', 'footer__text', 'footer__title',
    'badge', 'badge-gold', 'badge-emerald', 'badge-navy', 'badge-blue',
    'status-badge', 'status-safe', 'status-danger', 'status-warning',
    'benefit-tag', 'paper-meta-tag', 'tour-badge', 'statutory-tag',
    'pill-btn', 'btn-gold', 'btn-action', 'pulse-btn', 'title-underline',
    'sports-card', 'receipt-box', 'scanner-box',
    'modal-backdrop', 'modal-overlay', 'modal-box', 'modal-close',
    'sub', 'section-eyebrow',
    'text-success', 'text-warning', 'text-primary', 'text-info', 'text-danger',
    'form-label', 'form-select', 'form-input',
    'wizard-next', 'wizard-prev',
    'notice-card-item', 'gov-content-pane',
    'tag-nss', 'tag-ncc', 'tag-dlle', 'tag-posh', 'tag-ragging', 'tag-rota', 'tag-ugc'
]

present = []
missing = []

for c in classes_to_check:
    if re.search(rf"\.{re.escape(c)}\b", global_css):
        present.append(c)
    else:
        missing.append(c)

print(f"Total checked: {len(classes_to_check)}")
print(f"Present in global CSS: {len(present)}")
print(f"MISSING from global CSS: {len(missing)}")
for m in missing:
    print(f"  MISSING: .{m}")
