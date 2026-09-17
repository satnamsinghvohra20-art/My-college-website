import re
import glob

css_files = glob.glob('css/*.css')
all_css = ""
for f in css_files:
    with open(f, 'r', encoding='utf-8') as fp:
        all_css += fp.read() + "\n"

# Find all defined variables: --something: ...;
defined_vars = set(re.findall(r'(--[a-zA-Z0-9_-]+)\s*:', all_css))

# Find all used variables: var(--something)
used_vars = set(re.findall(r'var\((--[a-zA-Z0-9_-]+)', all_css))

missing = used_vars - defined_vars

print(f"Total defined vars: {len(defined_vars)}")
print(f"Total used vars: {len(used_vars)}")
print(f"Missing/Undefined vars: {len(missing)}")
for m in sorted(missing):
    # check where it's used
    for f in css_files:
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
            if m in c:
                print(f"  {m} used in {f}")
