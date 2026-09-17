import os
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"

root_files_to_fix = ['analytics.html', 'exams.html', 'placement.html', 'portal.html']

for fname in root_files_to_fix:
    fpath = os.path.join(ROOT_DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    # Replace ../css/ with css/
    c = c.replace('../css/', 'css/')
    # Replace ../js/ with js/
    c = c.replace('../js/', 'js/')
    # Replace ../assets/ with assets/
    c = c.replace('../assets/', 'assets/')
    # Replace ../index.html with index.html
    c = c.replace('../index.html', 'index.html')
    
    with open(fpath, 'w', encoding='utf-8') as fp:
        fp.write(c)
    print(f"Fixed paths in root {fname}")

# Add FontAwesome CDN to placement.html and pages/placement.html if missing
fa_tag = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'

for p in [os.path.join(ROOT_DIR, 'placement.html'), os.path.join(ROOT_DIR, 'pages', 'placement.html')]:
    with open(p, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if 'font-awesome' not in c and 'fontawesome' not in c:
        c = c.replace('<link rel="stylesheet" href="css/theme.css">', fa_tag + '  <link rel="stylesheet" href="css/theme.css">')
        c = c.replace('<link rel="stylesheet" href="../css/theme.css">', fa_tag + '  <link rel="stylesheet" href="../css/theme.css">')
        with open(p, 'w', encoding='utf-8') as fp:
            fp.write(c)
        print(f"Added FontAwesome CDN to {os.path.relpath(p, ROOT_DIR)}")
