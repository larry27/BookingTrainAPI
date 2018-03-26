const Promise = require("bluebird");

const Place = require("./api/dto/place");
const Train = require("./api/dto/train");
const Station = require("./api/dto/station");

const trainHasEmptyPlaces = places => Array.isArray(places) && places.length;

const createTrains = trainsData => {
  try {
    return trainsData
      .filter(({ types }) => trainHasEmptyPlaces(types))
      .map(({ num, types, from, to, travelTime }) => {
        const trainStationFrom = new Station({
          code: from.code,
          name: from.station,
          date: from.sortTime
        });

        const trainStationTo = new Station({
          code: to.code,
          name: to.station,
          date: to.sortTime
        });

        const train = new Train({
          num,
          trainStationFrom,
          trainStationTo,
          travelTime
        });

        types.forEach(({ id, places }) => {
          train.addPlace(new Place({ id, places }));
        });

        return train;
      });
  } catch (e) {
    return [];
  }
};

const sanitizeString = str => str.replace(/[\-,\s,\.]/g, "").toLowerCase();

const sortCity = searchString => (a, b) => {
  a = sanitizeString(a);
  b = sanitizeString(b);

  let isAStartWith = a.startsWith(searchString);
  let isBStartWith = b.startsWith(searchString);

  // string start with search string
  if (isAStartWith && isBStartWith) {
    if (a.length === searchString.length) {
      return -1;
    }

    if (b.length === searchString.length) {
      return 1;
    }

    if (a.length - b.length > 0) {
      return 1;
    }

    return -1;
  }

  // string start with search string
 
  if (isAStartWith) {
    return -1;
  }

  if (isBStartWith) {
    return 1;
  }

  /// string just containts reuqiired string

  let aindexOf = a.indexOf(searchString);
  let bindexOf = b.indexOf(searchString);

  if (aindexOf < bindexOf) return -1;
  if (aindexOf > bindexOf) return 1;

  return 0;
};

const jsonParse = jsonStr => {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    return {};
  }
};

module.exports = { createTrains, sortCity, jsonParse };
