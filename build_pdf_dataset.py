# -*- coding: utf-8 -*-
import json

# Part 1: Songs 1-160 from existing valid data parts (data_part1 through data_part9)
from data_part1 import part1_songs
from data_part2 import part2_songs
from data_part3 import part3_songs
from data_part4 import part4_songs
from data_part5 import part5_songs
from data_part6 import part6_songs
from data_part7 import part7_songs
from data_part8 import part8_songs
from data_part9 import part9_songs

songs_1_to_160 = (
    part1_songs + part2_songs + part3_songs + part4_songs +
    part5_songs + part6_songs + part7_songs + part8_songs + part9_songs
)

print(f"Loaded {len(songs_1_to_160)} songs for 1-160.")
