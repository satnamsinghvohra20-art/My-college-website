import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
js_files = sorted(glob.glob(os.path.join(ROOT_DIR, "js", "*.js")) + glob.glob(os.path.join(ROOT_DIR, "*.js")))

print(f"Scanning {len(js_files)} JS files for dynamically injected HTML...")

for f in js_files:
    rel = os.path.relpath(f, ROOT_DIR)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    # find template literals or innerHTML
    snippets = re.findall(r'(innerHTML\s*=\s*`[\s\S]*?`|innerHTML\s*=\s*"[\s\S]*?"|innerHTML\s*=\s*\'[\s\S]*?\')', c)
    print(f"\n[{rel}] Found {len(snippets)} innerHTML assignments")
    for s in snippets[:5]:
        # check for buttons or classes in snippet
        buttons = re.findall(r'<button[^>]*>([\s\S]*?)</button>', s)
        inputs = re.findall(r'<input[^>]*>', s)
        classes = re.findall(r'class=[\"\']([^\"\']+)[\"\']', s)
        if buttons or classes:
            print(f"  Snippet preview: {s[:100]}...")
            if buttons:
                print(f"    Buttons: {buttons[:3]}")
            if classes:
                print(f"    Classes: {classes[:3]}")
