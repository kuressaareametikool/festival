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
  const sizes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1.5, 2, 2, 2, 3, 3, 3]
  return sizes[zoom]
}
