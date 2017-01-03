#!/bin/bash
# TODO: Just loop through current directory and execute command
#       on any file that ends with "-scraper.js"

scrapers=( saatchiart-scraper.js ottycb-scraper.js oopc-scraper.js dollhouse-scraper.js cardkingdom-scraper.js bestbuy-scraper.js arrohome-scraper.js )

for i in "${scrapers[@]}"
do
    node $i
done
