import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
root_files = glob.glob(os.path.join(ROOT_DIR, "*.html"))

print(f"Checking {len(root_files)} root HTML files for broken '../' paths:")

for f in root_files:
    rel = os.path.basename(f)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    # Check for ../ in href or src
    broken = re.findall(r'(?:href|src)=[\"\'](\.\./[^\"\']+)[\"\']', c)
    if broken:
        print(f"\n[{rel}] Found {len(broken)} broken '../' paths:")
        for b in set(broken):
            print(f"   {b}")
    else:
        print(f"[{rel}] All paths OK (no '../')")
