# BookingTrainAPI

### Installation

Install application via Docker

```sh
$ docker-compose up
```
API availaible on **3000** port

### API methods
 
 1. ***Get train city**:*
**GET city/:city**

**Example**:
Request: /city/Од*
Response:
```json
[
    {
        "id": "2203802",
        "city": "Одб"
    },
    {
        "id": "2208001",
        "city": "Одесса"
    },
    {
        "id": "2060638",
        "city": "Одошнур"
    }
]
```

2.  ***Get trains list for current day***:
*****POST   */trains******
Parameters:

| Name | Description | Type | Example |
|--|--|--|--|
| from | city id | int |2200001
| to| city id | int |2218000
| date | train date | date "Y-m-d" |"2018-01-27"
| time | train time | string "hh:mm" |"00:00"

**Example**:
Request:
```json
{	"from":2200001,
	"to":2218000,
	"date":"2018-03-28"
}
```
Response:
``` json
[
    {
        "trainNumber": "002Д",
        "travelTime": "6:22",
        "trainStationFrom": {
            "name": "Киев-Пассажирский",
            "date": 1522198800,
            "code": "2200001"
        },
        "trainStationTo": {
            "name": "Львов",
            "date": 1522221720,
            "code": "2218000"
        },
        "places": [
            {
                "id": "Л",
                "places": 18
            },
            {
                "id": "К",
                "places": 65
            }
        ]
    }
]
```
3. ***Get train info***
**POST /trains-info**

| Name | Description | Type | Example |
|--|--|--|--|
| from | city id | int |2200001
| to| city id | int |2218000
| train| train number | string |"743К"
| date | train date | date "Y-m-d" |"2018-01-27"
**Example**:
Request:
```json
{
	"from":2200001,
	"to": 2218000,
	"train":"743К",
	"date":"2018-03-28"
}
```
Response:
``` json
[
    {
        "station": "Киев-Пассажирский",
        "stationId": 2200001,
        "arrive": "17:24",
        "leave": "17:34",
        "distance": "14"
    },
    {
        "station": "Святошино",
        "stationId": 2200008,
        "arrive": "17:48",
        "leave": "17:49",
        "distance": "26"
    },
    {
        "station": "Коростень",
        "stationId": 2200110,
        "arrive": "19:08",
        "leave": "19:09",
        "distance": "170"
    },
    {
        "station": "Подзамче",
        "stationId": 2218215,
        "arrive": "22:31",
        "leave": "22:32",
        "distance": "579"
    },
    {
        "station": "Львов",
        "stationId": 2218000,
        "arrive": "22:40",
        "leave": "22:40",
        "distance": "586"
    }
]
```
4. ***Get free places in wagon for current train***
**POST /train-wagons**

| Name | Description | Type | Example |
|--|--|--|--|
| from | city id | int |2200001
| to| city id | int |2218000
| date | train date | date "Y-m-d" |"2018-01-27"
| train| train number | string |"743К"
| wagonType| type of coach | string |"К"

**Example**:
Request:
```json
{
 	"from":2200001,
	"to":2218000,
	"date":"2018-03-30",
	"train":"141К",
	"wagonType":"К"
 }
```
Response:
``` json
[
    {
        "number": 7,
        "type": "К",
        "coachClass": "Б",
        "prices": {
            "Б": 30078
        }
    },
    {
        "number": 9,
        "type": "К",
        "coachClass": "Б",
        "prices": {
            "Б": 30078
        }
    },
    {
        "number": 11,
        "type": "К",
        "coachClass": "Б",
        "prices": {
            "Б": 30078
        }
    }
]
```
5. **Get free places for current wagon number**
 **POST /wagon**
 
 | Name | Description | Type | Example |
|--|--|--|--|
| from | city id | int |2200001
| to| city id | int |2218000
| date | train date | date "Y-m-d" |"2018-01-27"
| train| train number | string |"743К"
| wagonType| type of coach | string |"К"
| wagonNumber| wagon number | int |10
| wagonClass| class of wagon | string |"Б"

**Example**:  
Request:
```json
{
	"from":2200001,
	"to":2218000,
	"train":"141К",
	"date":"2018-04-30",
	"wagonNumber":10,
	"wagonType":"К",
	"wagonClass":"Б"
}
```

Response:
``` json
{
    "places": [
        [
            "001",
            "002",
            "003",
            "004"
        ]
    ],
    "schemeId": "К01",
    "placesSchema": [
        {
            "placeNumber": "2",
            "position": "up"
        },
        {
            "placeNumber": "4",
            "position": "up"
        }
    ]
}
```