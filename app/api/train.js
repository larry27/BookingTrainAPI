const Promise = require("bluebird");
const requestPromise = Promise.promisify(require("request"));
const Joi = require("joi");
const { createTrains, jsonParse } = require("./../helper");
const {
  isFindTicketsResponseValid,
  isTrainInfoResponseValid,
  isTrainCoachResponseValid,
  isTrainPlaceResponseValid
} = require("./../validation/train");

const {
  API_URL,
  SEARCH_TRAIN_URL,
  TRAIN_INFO_URL,
  TRAIN_COACH_URL,
  TRAIN_PLACE_URL
} = require("../api/constants");

class TrainAPI {
  static async makePostRequest({ url, formData }) {
    return await requestPromise({ method: "POST", url, formData });
  }

  static async findTickets({ from, to, date, time = "00:00" }) {
    let formData = {
      from,
      to,
      time,
      date: date.toISOString().slice(0, 10)
    };

    const result = await TrainAPI.makePostRequest({
      url: SEARCH_TRAIN_URL,
      formData
    });

    const jsonResult = jsonParse(result.body);

    if (!isFindTicketsResponseValid(jsonResult)) {
      return [];
    }

    return createTrains(jsonResult.data.list);
  }

  static async getTrainInfo({ from, to, train, date }) {
    let formData = {
      "routes[0][from]": from,
      "routes[0][to]": to,
      "routes[0][date]": date.toISOString().slice(0, 10),
      "routes[0][train]": train
    };

    let response = await TrainAPI.makePostRequest({
      url: TRAIN_INFO_URL,
      formData
    });

    const result = jsonParse(response.body);

    if (!isTrainInfoResponseValid(result)) {
      return [];
    }

    const stationList = result.data.routes[0].list;

    return stationList.map(
      ({
        name: station,
        code: stationId,
        arrivalTime: arrive,
        departureTime: leave,
        distance
      }) => ({
        station,
        stationId,
        arrive,
        leave,
        distance
      })
    );
  }

  static async getCoachPlace({
    from,
    to,
    train,
    wagonNumber,
    wagonClass,
    wagonType,
    date
  }) {
    date = date.toISOString().slice(0, 10);
    let response = await TrainAPI.makePostRequest({
      url: TRAIN_PLACE_URL,
      formData: {
        from,
        to,
        train,
        date,
        wagon_num: wagonNumber,
        wagon_type: wagonType,
        wagon_class: wagonClass
      }
    });

    let places = [];
    const result = jsonParse(response.body);

    if (!isTrainPlaceResponseValid(result)) {
      return [];
    }

    if (result.data.places) {
      places = [...Object.values(result.data.places)];
    }

    let data = {
      places,
      schemeId: result.data.schemeId
    };

    let trainScheme = jsonParse(result.data.scheme);

    data.placesSchema = [...Object.values(trainScheme.places.floor)][0]
      .filter(el => el.type == "place")
      .map(({ num, pos }) => ({ placeNumber: num, position: pos }));

    return data;
  }

  static async getTrainCoach({
    from,
    to,
    train,
    date,
    wagonType: wagon_type_id
  }) {
    date = date.toISOString().slice(0, 10);
    let response = await TrainAPI.makePostRequest({
      url: TRAIN_COACH_URL,
      formData: {
        from,
        to,
        date,
        train,
        wagon_type_id,
        another_ec: 0,
        get_tpl: 1
      }
    });

    const result = jsonParse(response.body);

    if (!isTrainCoachResponseValid(result)) {
      return [];
    }

    return result.data.wagons.map(
      ({
        num: number,
        type,
        placesCnt: places,
        prices,
        class: coachClass
      }) => ({
        number,
        type,
        places,
        coachClass,
        prices
      })
    );
  }
}

module.exports = TrainAPI;
