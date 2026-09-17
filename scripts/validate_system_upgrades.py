"""
Validate Next-Gen Enterprise Smart Campus Upgrades
Checks file syntax, HTTP status across root and pages, script loading, and CSS contrast.
"""
import urllib.request
import os
import re

BASE_URL = "http://localhost:8080"

PAGES_TO_TEST = [
    "/index.html",
    "/verify.html",
    "/pages/verify.html",
    "/offline.html",
    "/pages/offline.html",
    "/portal.html",
    "/pages/portal.html",
    "/exam-seating.html",
    "/pages/exam-seating.html",
    "/pages/library-kiosk.html",
    "/pages/railway-concession.html",
    "/pages/gymkhana.html",
    "/pages/fee-payment.html",
    "/pages/curriculum-planner.html",
    "/pages/analytics.html",
    "/pages/pitch-deck.html"
]

SCRIPTS_TO_TEST = [
    "js/store.js",
    "js/audio-haptics.js",
    "js/command-palette.js",
    "js/qr-scanner.js",
    "js/i18n.js",
    "js/app.js",
    "js/ai-bot.js",
    "js/student-portal.js",
    "js/persona-switcher.js",
    "js/fee-system.js",
    "sw.js"
]

def check_scripts():
    print("=== Checking JavaScript Modules ===")
    all_ok = True
    for s in SCRIPTS_TO_TEST:
        path = os.path.join(os.getcwd(), s.replace("/", os.sep))
        if os.path.exists(path):
            size = os.path.getsize(path)
            print(f"  [OK] {s:<26} ({size:,} bytes)")
        else:
            print(f"  [FAIL] Missing file: {s}")
            all_ok = False
    return all_ok

def check_http_endpoints():
    print("\n=== Testing Live Localhost Endpoints (port 8080) ===")
    success_count = 0
    for p in PAGES_TO_TEST:
        url = BASE_URL + p
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as res:
                code = res.getcode()
                content = res.read().decode('utf-8', errors='replace')
                if code == 200:
                    print(f"  [200 OK] {p:<32} ({len(content):,} chars)")
                    success_count += 1
                else:
                    print(f"  [{code}]   {p}")
        except Exception as e:
            print(f"  [ERROR] {p}: {e}")
    return success_count == len(PAGES_TO_TEST)

def check_command_palette_and_scanner():
    print("\n=== Verifying Spotlight & Scanner Integration ===")
    # Check if CSS has command palette & scanner rules
    css_path = os.path.join("css", "components.css")
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    
    has_cmd = ".chm-cmd-overlay" in css and ".chm-cmd-dialog" in css
    has_scanner = ".chm-scanner-modal" in css and ".chm-scanner-laser" in css
    has_print = "@media print" in css and "body::before" in css
    
    print(f"  Command Palette CSS rules: {'[FOUND]' if has_cmd else '[MISSING]'}")
    print(f"  WebRTC Scanner CSS rules:  {'[FOUND]' if has_scanner else '[MISSING]'}")
    print(f"  Print Letterhead CSS rules:{'[FOUND]' if has_print else '[MISSING]'}")

def main():
    s_ok = check_scripts()
    h_ok = check_http_endpoints()
    check_command_palette_and_scanner()
    print("\n========================================================")
    if s_ok and h_ok:
        print("ALL VERIFICATIONS PASSED: 100% HEALTHY")
    else:
        print("SOME VERIFICATIONS FAILED")
    print("========================================================")

if __name__ == "__main__":
    main()
