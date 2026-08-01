# -*- coding: utf-8 -*-
import json

from data_part1 import part1_songs
from data_part2 import part2_songs
from data_part3 import part3_songs
from data_part4 import part4_songs
from data_part5 import part5_songs
from data_part6 import part6_songs
from data_part7 import part7_songs
from data_part8 import part8_songs
from data_part9 import part9_songs
from data_pdf_161_180 import songs_161_to_180
from data_pdf_181_222 import songs_181_to_222
from data_pdf_223_272 import songs_223_to_272

all_272 = (
    part1_songs +
    part2_songs +
    part3_songs +
    part4_songs +
    part5_songs +
    part6_songs +
    part7_songs +
    part8_songs +
    part9_songs +
    songs_161_to_180 +
    songs_181_to_222 +
    songs_223_to_272
)

formatted_songs = []
for song in all_272:
    s = dict(song)
    s["id"] = f"manantial-{s['number']}"
    s["book"] = "manantial"
    s["lyrics"] = s["lyrics"].strip()
    formatted_songs.append(s)

print(f"Total songs collected: {len(formatted_songs)}")

ts_content = f"""import {{ Song }} from '../types';

export const manantialSongs: Song[] = {json.dumps(formatted_songs, ensure_ascii=False, indent=2)};
"""

with open("src/data/manantialSongs.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated /src/data/manantialSongs.ts with all {len(formatted_songs)} songs!")
