class Train {
  constructor({
    num,
    travelTime,
    places = [],
    trainStationFrom = {},
    trainStationTo = {}
  }) {
    this.trainNumber = num;
    this.travelTime = travelTime;
    this.trainStationFrom = trainStationFrom;
    this.trainStationTo = trainStationTo;
    this.places = places;
  }

  addPlace(place) {
    this.places.push(place);
  }

  setStationFrom(station) {
    this.trainStationFrom = station;
  }

  setStationTo(station) {
    this.trainStationTo = station;
  }
}

module.exports = Train;
