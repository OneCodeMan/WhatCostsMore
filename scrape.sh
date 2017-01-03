#!/bin/bash
# My first script

scrapers=( saatchiart-scraper.js ottycb-scraper.js oopc-scraper.js dollhouse-scraper.js cardkingdom-scraper.js bestbuy-scraper.js arrohome-scraper.js )

for i in "${scrapers[@]}"
do
    node $i
done
