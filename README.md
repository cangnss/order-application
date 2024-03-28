
# Order Application

It is a microservice application for project, order and customer domains. This is powered by TypeScript and Express and has the functionality to add, update, delete orders, add products, update, delete, etc. that you would expect from an ordering system. It is a node.js application that provides the main functions. Order logs are recorded with audit database RabbitMQ. Order logs are sent via e-mail every day.

## Technologies

- **Nodejs**
- **Expressjs**
- **Typescript**
- **Postgresql**
- **Jest**
- **RabbitMQ**
- **Docker**
- **Validation**
- **Logger**
- **Nodemailer**
- **API Gateway**
- **Micro service**

### Requirements
- Node 16
- Docker
- Git

### Setup
Clone the repo and install the dependencies.

Step 1: Open the order-application folder in terminal
```
git clone https://github.com/cangnss/order-application.git
cd order-application
```
Step 2: Enter the order-api folder and install the dependencies
```
cd order-api
npm install
npm run dev
```
Step 3: Enter the api-gateway folder and install the dependencies
```
cd api-gateway
npm install
npm run dev
```

### Running with Docker
Clone this repo to your desktop and run ``` deploy.sh ```. Make sure Docker is running. Open the cloned project in git bash terminal.
```
git clone https://github.com/cangnss/order-application.git
cd order-application
bash deploy.sh
```

After clone if you want to view the data from the pgadmin interface after cloning, you can install pgadmin by filling in the relevant configuration information in the compose file and view the database. Access to the interface is provided with ``` http://localhost:8080 ```

### Tests
Enter the order-api folder in terminal after that run ``` npm test ```. Results are showing in terminal.

### Logs
Log records are located under the ```order-api/logs``` folder.

### RabbitMQ Logs
Log records related to the order are also displayed in the RabbitMQ interface at ```http://localhost:15673``` port. You can access the interface by entering username ```guest``` and password ```guest```. These order log records are transmitted via e-mail. Emails can be sent by changing the ```TARGET_ADDRESS``` value in the Compose file.

### Postman API Endpoints
[Endpoints](https://github.com/cangnss/order-application/blob/main/OrderApplication.postman_collection.json)
