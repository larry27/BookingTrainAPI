const { loadCitiesFromFile } = require("./../../helper");
const elasticsearch = require("elasticsearch");
const Promise = require("bluebird");

class ElasticSearchClient {
  constructor(clientConfig) {
    this.client = new elasticsearch.Client(clientConfig);
  }
  
  searchCityByName(cityPhrase) {
    return this.client.search({
      index: "train",
      type: "city",
      q: `city:${cityPhrase}*`
    });
  }

  findCityById(id) {
    return this.client.get({
      index: "train",
      type: "city",
      id
    });
  }
}

module.exports = ElasticSearchClient;
