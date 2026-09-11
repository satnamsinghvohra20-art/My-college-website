import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(BASE_DIR, "pages")
JS_DIR = os.path.join(BASE_DIR, "js")
INDEX_PATH = os.path.join(BASE_DIR, "index.html")
SW_PATH = os.path.join(BASE_DIR, "sw.js")

# List of secondary pages in pages/
secondary_pages = [
    f for f in os.listdir(PAGES_DIR) if f.endswith(".html")
]

print(f"Found {len(secondary_pages)} secondary pages in {PAGES_DIR}")

# 1. Update index.html
with open(INDEX_PATH, "r", encoding="utf-8") as f:
    index_content = f.read()

for page in secondary_pages:
    # Replace href="page.html" or href="page.html?..." or href="page.html#..." with href="pages/page.html..."
    index_content = re.sub(
        rf'href=([\'"])(?!pages/|http|#|mailto|tel){re.escape(page)}([?#][^\'"]*)?([\'"])',
        lambda m: f'href={m.group(1)}pages/{page}{m.group(2) or ""}{m.group(3)}',
        index_content
    )

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    f.write(index_content)
print("Updated index.html links.")

# 2. Update all secondary pages in pages/
for page in secondary_pages:
    file_path = os.path.join(PAGES_DIR, page)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # CSS relative paths: href="css/ -> href="../css/
    content = re.sub(r'href=([\'"])css/', r'href=\1../css/', content)
    # JS relative paths: src="js/ -> src="../js/
    content = re.sub(r'src=([\'"])js/', r'src=\1../js/', content)
    # Assets relative paths: src="assets/ -> src="../assets/
    content = re.sub(r'src=([\'"])assets/', r'src=\1../assets/', content)
    # Assets in href (favicon, etc.): href="assets/ -> href="../assets/
    content = re.sub(r'href=([\'"])assets/', r'href=\1../assets/', content)
    # Manifest: href="manifest.json" -> href="../manifest.json"
    content = re.sub(r'href=([\'"])manifest\.json([\'"])', r'href=\1../manifest.json\2', content)

    # Home link: href="index.html" -> href="../index.html"
    content = re.sub(r'href=([\'"])index\.html([\'"])', r'href=\1../index.html\2', content)
    # Home link with hash: href="index.html#..." -> href="../index.html#..."
    content = re.sub(r'href=([\'"])index\.html(#[^\'"]+)([\'"])', r'href=\1../index.html\2\3', content)

    # Ensure links to other secondary pages remain href="other.html" (sibling links)
    # In case any had href="pages/other.html", clean it:
    content = re.sub(r'href=([\'"])pages/([a-zA-Z0-9_\-]+\.html)', r'href=\1\2', content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Updated all {len(secondary_pages)} pages in pages/ directory.")

# 3. Update sw.js precache list
with open(SW_PATH, "r", encoding="utf-8") as f:
    sw_content = f.read()

for page in secondary_pages:
    # Replace 'page.html' with 'pages/page.html'
    sw_content = re.sub(rf"'({re.escape(page)})'", rf"'pages/\1'", sw_content)

with open(SW_PATH, "w", encoding="utf-8") as f:
    sw_content = sw_content.replace("'./'", "'./', 'index.html',") if "'index.html'" not in sw_content else sw_content
    f.write(sw_content)

print("Updated sw.js precache list.")

# 4. Update persona-switcher.js and ai-bot.js for dynamic path resolution
persona_path = os.path.join(JS_DIR, "persona-switcher.js")
if os.path.exists(persona_path):
    with open(persona_path, "r", encoding="utf-8") as f:
        p_code = f.read()
    
    # In persona-switcher, let's make sure target links work whether on index.html or in pages/
    # If on index.html (not in /pages/), prefix with 'pages/' unless it's index.html
    # If in /pages/, keep sibling or use '../index.html'
    helper_code = """
  function getResolvedUrl(url) {
    if (!url || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) return url;
    const isSubpage = window.location.pathname.includes('/pages/');
    const isTargetHome = url.startsWith('index.html');
    
    if (isSubpage) {
      if (isTargetHome) return '../' + url;
      return url.replace(/^pages\//, '');
    } else {
      if (isTargetHome) return url;
      if (url.startsWith('pages/')) return url;
      return 'pages/' + url;
    }
  }
"""
    if "function getResolvedUrl" not in p_code:
        # Insert helper near top of IIFE
        p_code = p_code.replace("(function () {", "(function () {\n" + helper_code, 1)
        # Wrap primaryTarget and nav links in getResolvedUrl
        p_code = re.sub(r'window\.location\.href\s*=\s*(persona\.primaryTarget|item\.url)', r'window.location.href = getResolvedUrl(\1)', p_code)
        p_code = re.sub(r'href="\$\{item\.url\}"', r'href="${getResolvedUrl(item.url)}"', p_code)
        p_code = re.sub(r'href="pitch-deck\.html"', r'href="${getResolvedUrl(\'pitch-deck.html\')}"', p_code)

        with open(persona_path, "w", encoding="utf-8") as f:
            f.write(p_code)
        print("Updated js/persona-switcher.js with dynamic path resolver.")

# 5. Update ai-bot.js dynamic links
bot_path = os.path.join(JS_DIR, "ai-bot.js")
if os.path.exists(bot_path):
    with open(bot_path, "r", encoding="utf-8") as f:
        bot_code = f.read()

    # In ai-bot.js, we can add a response transformer to adjust links for subpages vs root
    bot_helper = """
  function formatBotLinks(htmlStr) {
    const isSubpage = window.location.pathname.includes('/pages/');
    if (isSubpage) {
      // If we are in /pages/, links to index.html become ../index.html
      htmlStr = htmlStr.replace(/href=['"]index\\.html/g, "href='../index.html");
      // Links to sibling pages should stay as page.html
      htmlStr = htmlStr.replace(/href=['"]pages\\//g, "href='");
    } else {
      // If at root, links to subpages should become pages/page.html
"""
    # Let's see if ai-bot.js has specific link formats
    # In ai-bot, links were: href='library-kiosk.html', href='admission.html', href='index.html#calculator', etc.
    # We will adjust them dynamically or when rendering!

print("Migration script completed successfully.")
