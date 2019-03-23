## Estonian Song And Dance Celebration 2019 interactive map

### Architecture

The map frontend in implemented in [VueJS](https://vuejs.org/) and [Leaflet](https://leafletjs.com/) mapping library. We do not use Leaflet directly but use [Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet) wrapper that converts Leaflet API into Vue components.

### Map tiles

Currently the map uses Wikimedia Maps tiles (based on OSM), see https://wiki.openstreetmap.org/wiki/Tile_servers

```
https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png
```

Alternatively one can use raw OSM tiles

```
http://{s}.tile.osm.org/{z}/{x}/{y}.png
```

or commercial vendor https://www.mapbox.com/ or Google Maps.

### Tracks

Provided as GPX files, converted to GeoJSON with http://geojson.io

### Waypoints

https://navicup.com/public/pages/jQuery-requests/get-class-waypoints-json.php?url=tuletulemine-2019&app_pictures=5&astages=1281,1296,1297

This data souce does not contain counties data so it is calculated using Turf.js `buffer` and `intersect` functions using a NodeJS script:

```sh
npm i @turf/turf
cd waypoints
node convert.js > waypoints_with_counties.json
```

### POIs and photos

Currently POIs and photo data are fetched from the Google Sheets with manually entered data https://docs.google.com/spreadsheets/d/19Xj62Df8IvP-yLDpMKEWknR-ytazmbIwAIJptxHPZgA/edit#gid=0 

In future, one could use [Visit Estonia](https://www.visitestonia.com/en/map-of-estonia) data sources:

#### Sculptures and Monuments

https://www.visitestonia.com/en/google-poi?lang=en&layers=1408&_=1552986748531

#### Ruins & Historic Sites

https://www.visitestonia.com/en/google-poi?lang=en&layers=1409&_=1552986922530
