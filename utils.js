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
