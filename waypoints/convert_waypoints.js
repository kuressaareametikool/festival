const turf = require("@turf/turf");

const waypoints = require("./waypoints.json");

countiesData = [
  {
    county: "harjumaa",
    data: require("./tracks/harjumaa.json")
  },
  {
    county: "hiiumaa",
    data: require("./tracks/hiiumaa.json")
  },
  {
    county: "jogevamaa",
    data: require("./tracks/jogevamaa.json")
  },
  {
    county: "laanemaa",
    data: require("./tracks/laanemaa.json")
  },
  {
    county: "laanevirumaa",
    data: require("./tracks/laanevirumaa.json")
  },
  {
    county: "parnumaa",
    data: require("./tracks/parnumaa.json")
  },
  {
    county: "polvamaa",
    data: require("./tracks/polvamaa.json")
  },
  {
    county: "raplamaa",
    data: require("./tracks/raplamaa.json")
  },
  {
    county: "saaremaa",
    data: require("./tracks/saaremaa.json")
  },
  {
    county: "tartu",
    data: require("./tracks/tartu.json")
  },
  {
    county: "valgamaa",
    data: require("./tracks/valgamaa.json")
  },
  {
    county: "viljandimaa",
    data: require("./tracks/viljandimaa.json")
  },
  {
    county: "vorumaa",
    data: require("./tracks/vorumaa.json")
  }
];

const output = waypoints.map(w => {
  w.lat = parseFloat(w.lat);
  w.lng = parseFloat(w.lng);
  countiesData.forEach(c => {
    if (
      turf.intersect(
        turf.buffer(turf.point([w.lng, w.lat]), 1),
        turf.buffer(c.data.features[0], 1)
      )
    ) {
      w.county = c.county;
    }
  });
  return w;
});

console.log(JSON.stringify(output));
