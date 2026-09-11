"""
Root-level forwarding script for PowerPoint presentation generation.
Delegates to scripts/generate_ppt.py to ensure seamless execution from either directory.
"""
import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
target_script = os.path.join(script_dir, "scripts", "generate_ppt.py")

if not os.path.exists(target_script):
    print(f"Error: Target script not found at {target_script}")
    sys.exit(1)

# Execute scripts/generate_ppt.py with its own directory in scope
with open(target_script, "r", encoding="utf-8") as f:
    code = f.read()

exec(compile(code, target_script, "exec"), {"__file__": target_script, "__name__": "__main__"})
