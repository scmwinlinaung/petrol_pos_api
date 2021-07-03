#!/bin/bash
docker stack rm petrol_pos_api
sleep 5
docker build -t petrol-pos  ../
chmod -R 777 $HOME/Desktop/Customer_Project/petrol_pos_api
docker stack deploy -c ../boolean-tech-petrol-pos.yaml petrol_pos