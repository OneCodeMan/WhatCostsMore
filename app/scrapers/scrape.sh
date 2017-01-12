#!/bin/bash

for f in *.js
do
    if [[ "$f" == *-scraper.js ]]
    then
        node $f
    else
        :
    fi
done

node cleanJSON.js
echo "Created all JSON files"
node append-data.js
echo "Appended data"
