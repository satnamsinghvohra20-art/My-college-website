"""
Root-level forwarding script for Academic PDF Report generation.
Delegates to scripts/generate_pdf_report.py to ensure seamless execution from either directory.
"""
import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
target_script = os.path.join(script_dir, "scripts", "generate_pdf_report.py")

if not os.path.exists(target_script):
    print(f"Error: Target script not found at {target_script}")
    sys.exit(1)

with open(target_script, "r", encoding="utf-8") as f:
    code = f.read()

exec(compile(code, target_script, "exec"), {"__file__": target_script, "__name__": "__main__"})
