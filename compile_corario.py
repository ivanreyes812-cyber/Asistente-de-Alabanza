# -*- coding: utf-8 -*-
import json

from corario_data_adoracion_1 import adoracion_part1
from corario_data_adoracion_2 import adoracion_part2
from corario_data_alabanza_1 import alabanza_part1
from corario_data_alabanza_2 import alabanza_part2

all_raw_coros = adoracion_part1 + adoracion_part2 + alabanza_part1 + alabanza_part2

print(f"Total raw coros loaded: {len(all_raw_coros)}")

formatted_songs = []
for index, item in enumerate(all_raw_coros, start=1):
    song = {
        "id": f"corario-{index}",
        "book": "corario",
        "number": index,
        "title": item["title"].strip(),
        "category": item["category"].strip(),
        "originalKey": item["key"].strip(),
        "bpm": item.get("bpm", 120 if item["category"] == "Alabanza" else 70),
        "lyrics": ""
    }
    formatted_songs.append(song)

json_str = json.dumps(formatted_songs, ensure_ascii=False, indent=2)

ts_content = "import { Song } from '../types';\n\nexport const corarioSongs: Song[] = " + json_str + ";\n"

with open('src/data/corarioSongs.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated src/data/corarioSongs.ts with {len(formatted_songs)} coros!")
