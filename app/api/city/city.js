const Promise = require("bluebird");
const ElasticSearchClient = require("./elastic");
const { sortCity } = require("./../../helper");

require('dotenv').config();
const clientConfig = {host: process.env.ELASTIC_HOST};

class CityAPI {
  constructor(clientConfig) {
    this.client = new ElasticSearchClient(clientConfig);
  }

  async getCity(cityPhrase) {
    let result = await this.client.searchCityByName(cityPhrase);

    let citySortFunction = sortCity(cityPhrase.toLowerCase().replace("*", ""));
    return result.hits.hits
      .map(({ _id: id, _source }) => ({ id, ..._source }))
      .sort(({ city: a }, { city: b }) => citySortFunction(a, b));
  }

  async getCityById(id) {
    let cityData = await this.client.findCityById(id);
    // todo validation
    let { _source: { city } } = cityData;
    return city;
  }
}

module.exports = new CityAPI(clientConfig);