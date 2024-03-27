#!/bin/bash

docker-compose up -d

if [ $? -eq 0 ]; then
  echo "Servisler başarıyla başlatıldı."
  sleep 10s
  api_gateway_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/order-service/api/customer)
  echo $api_gateway_status
  if [ $api_gateway_status -eq 200 ]; then
    echo "API Gateway başarıyla çalışıyor."
  else
    echo "Hata: API Gateway çalışmıyor."
  fi
else
  echo "Hata: Servisler başlatılamadı."
fi