#!/bin/bash
docker stack rm petrol_pos_api
sleep 5
docker build -t winlinaung/petrol_pos_api  ../
chmod -R 777 $HOME/Desktop/Customer_Project/petrol_pos_api
docker stack deploy -c ../docker-compose.yaml petrol_pos_api