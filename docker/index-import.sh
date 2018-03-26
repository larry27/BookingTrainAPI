#!/bin/bash

host="$1"
port="$2"

while true
do
	nc -z $host $port

	if [ $? -eq 0 ]; then
		echo "Elasticsearch has been started"
		# delay for init elastic se
		sleep 10

		# init snapshot
		curl -XPUT "$host:$port/_snapshot/cities?pretty" -H 'Content-Type: application/json' -d'
		{
			"type": "fs",
			"settings": {
				"location": "/usr/share/elasticsearch/snapshot/indices",
				"compress": true
			}
		}'
		
		# remove previous index
		curl -XDELETE "$host:$port/train?pretty"

		# restore index
		curl -XPOST "$host:$port/_snapshot/cities/snapshot_1/_restore?pretty" -H 'Content-Type: application/json' -d'
		{
		"indices": "train"
		}'
		
		echo "All indices were created"

		break
	else
		echo "Elasticsearch is starting ..."
	fi

sleep 1
done