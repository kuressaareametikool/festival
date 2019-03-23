export const parseSheet = data => {
  return data.feed.entry.map(entry => {
    return Object.keys(entry)
      .map(field => {
        if (field.startsWith("gsx$")) {
          return [field.split("$")[1], entry[field].$t];
        }
      })
      .filter(field => field)
      .reduce((field, item) => {
        field[item[0]] = item[1];
        return field;
      }, {});
  });
};

export const waypointsToGeoJSON = waypoints => {
  return {
    type: "FeatureCollection",
    features: waypoints.map(w => ({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [parseFloat(w.lng), parseFloat(w.lat)]
      }
    }))
  };
};

export const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const shorten = (str, length = 50, suffix = "...") =>
  `${str.slice(0, length)}${str.length - 1 > length ? suffix : ""}`;

export const titleCase = string =>
  string
    .split(" ")
    .map(([h, ...t]) => h.toUpperCase() + t.join("").toLowerCase())
    .join(" ");

export const iconSizes = zoom => {
  const sizes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1.5, 2, 2, 2, 3, 3, 3];
  return sizes[zoom];
};

export const countyCenters = {
  hiiumaa: [58.87, 22.67],
  saaremaa: [58.37, 22.46],
  harjumaa: [59.35, 24.93],
  valgamaa: [57.86, 26.23],
  vorumaa: [57.89, 27.01],
  parnumaa: [58.45, 24.52],
  idavirumaa: [59.23, 27.42],
  jarvamaa: [58.9, 25.63],
  laanemaa: [58.95, 23.81],
  laanevirumaa: [59.23, 26.38],
  polvamaa: [58.08, 27.12],
  raplamaa: [58.93, 24.66],
  viljandimaa: [58.33, 25.57],
  tartumaa: [58.39, 26.73],
  jogevamaa: [58.74, 26.49],
  eesti: [58.82, 25.54]
};

export const zooms = {
    overview: 7,
    county: 9,
    waypoint: 11 
}