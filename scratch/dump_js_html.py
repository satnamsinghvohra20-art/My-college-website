import os
import glob
import re

ROOT_DIR = r"c:\Users\satna\Downloads\chm clone"
js_files = sorted(glob.glob(os.path.join(ROOT_DIR, "js", "*.js")) + glob.glob(os.path.join(ROOT_DIR, "*.js")))

output_lines = []

for f in js_files:
    rel = os.path.relpath(f, ROOT_DIR)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    matches = re.findall(r'(innerHTML\s*=\s*`[\s\S]*?`|innerHTML\s*=\s*"[\s\S]*?"|innerHTML\s*=\s*\'[\s\S]*?\')', c)
    output_lines.append(f"\n=================================================================")
    output_lines.append(f"FILE: {rel} (found {len(matches)} assignments)")
    output_lines.append("=================================================================")
    for idx, m in enumerate(matches):
        output_lines.append(f"\n--- Snippet #{idx+1} ---")
        output_lines.append(m)

out_file = os.path.join(ROOT_DIR, "scratch", "js_html_audit.txt")
with open(out_file, 'w', encoding='utf-8') as fp:
    fp.write("\n".join(output_lines))

print(f"Audit saved to {out_file}")
