import re
import json

with open('src/data/corarioSongs.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's extract entries in corarioSongs
pattern = re.compile(r'id:\s*[\'"`]([^\'"`]+)[\'"`],?\s*number:\s*(\d+),?\s*title:\s*[\'"`]([^\'"`]+)[\'"`],?\s*(?:book:\s*[\'"`][^\'"`]+[\'"`],?\s*)?category:\s*[\'"`]([^\'"`]+)[\'"`],?\s*originalKey:\s*[\'"`]([^\'"`]+)[\'"`]', re.DOTALL)

matches = pattern.findall(content)
print(f"Matched {len(matches)} entries in corarioSongs.ts")

keys_count = {}
for m in matches:
    key = m[4]
    cat = m[3]
    keys_count[key] = keys_count.get(key, 0) + 1

print("By key:", keys_count)
