# -*- coding: utf-8 -*-
import json
import sys

from lluvias_exact_p1 import songs_p1
from lluvias_exact_p2 import songs_p2
from lluvias_exact_p3 import songs_p3
from lluvias_exact_p4 import songs_p4
from lluvias_exact_p5 import songs_p5

all_songs = songs_p1 + songs_p2 + songs_p3 + songs_p4 + songs_p5

print(f"Total songs collected: {len(all_songs)}")

# Check duplicates or missing numbers
song_nums = [s["number"] for s in all_songs]
expected_nums = list(range(1, 254))

if song_nums != expected_nums:
    missing = set(expected_nums) - set(song_nums)
    duplicates = [x for x in song_nums if song_nums.count(x) > 1]
    print(f"Error: Missing numbers: {missing}")
    print(f"Error: Duplicates: {duplicates}")
    sys.exit(1)

print("All 253 songs verified sequentially 1..253!")

# Generate src/data/lluviasSongs.ts
# Ensure each song has id and book
for s in all_songs:
    s["id"] = f"lluvias-{s['number']}"
    s["book"] = "lluvias"

header = """import { Song } from '../types';

export const lluviasSongs: Song[] = """

json_content = json.dumps(all_songs, ensure_ascii=False, indent=2)

ts_content = header + json_content + ";\n"

with open("src/data/lluviasSongs.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully written src/data/lluviasSongs.ts!")
