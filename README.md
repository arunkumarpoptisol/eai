# EOI:

## Overview

This Node.js application listens to RabbitMQ, triggers an adapter to fetch data from an API, processes it with a dynamic JSONata expression, and sends the transformed data to another RabbitMQ queue. Additionally, it includes an Express API to handle webhooks from Shopify.
## Project Structure

```plaintext
EOI/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   │
│   ├── controllers/
│   │   ├── adapterController.js
│   │   ├── transformController.js
│   │   └── webhookController.js
│   │
│   ├── services/
│   │   ├── adapterService.js
│   │   └── transformService.js
│   │
│   ├── models/
│   │   └── Log.js
│   │
│   ├── routes/
│   │   ├── apiRoutes.js
│   │   └── index.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── queue/
│   │   ├── rabbitmqListener.js
│   │   ├── processMessage.js
│   │   └── sendMessage.js
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── .env.example
├── README.md
├── package.json
└── package-lock.json
```
## Features

- **RabbitMQ Integration**: Listens to an input queue and processes messages.
- **Dynamic Adapter**: Retrieves an authentication token and fetches data from a specified API.
- **Data Transformation**: Applies dynamic JSONata expressions to transform data.
- **Shopify Webhook Handling**: Securely handles incoming webhooks from Shopify.
- **Express API**: Manages HTTP requests for the webhook.

## Requirements

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **RabbitMQ** (v3.x or higher)
- **Shopify Webhook Secret** (available in your Shopify admin panel)
- **API Credentials** for the third-party API you are connecting to.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/EOI.git
cd rabbitmq-processor
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:
```

PORT=4000
## Mongo
MONGODB_URI=mongodb://localhost:27017/

## rabbitmq
RABBITMQ_URL=amqp://localhost
INPUT_QUEUE=input_queue
OUTPUT_QUEUE=output_queue
API_URL=https://api.example.com/data
API_TOKEN_URL=https://api.example.com/token

## shopify
SHOPIFY_WEBHOOK_SECRET=your-shopify-webhook-secret
API_CLIENT_ID=your-api-client-id
API_CLIENT_SECRET=your-api-client-secret

```

### 4. Start RabbitMQ

Ensure that RabbitMQ is installed and running on your machine. You can download and install RabbitMQ from [here](https://www.rabbitmq.com/download.html).

To start RabbitMQ, you can use the following commands depending on your operating system:

### On Linux or macOS

If you installed RabbitMQ using a package manager like `apt` or `brew`, you can start it with:

```bash
sudo service rabbitmq-server start

or

brew services start rabbitmq

```
### On Windows
If you installed RabbitMQ using the installer, you can start it from the Start Menu under `RabbitMQ Server > Start Service`.

Alternatively, you can start it from the command line:

```
rabbitmq-server.bat

```

### If you're using Docker Desktop, you can easily run RabbitMQ in a Docker container.

### Start RabbitMQ in Docker

1. Ensure Docker Desktop is installed and running on your machine.

2. Pull the RabbitMQ Docker image:

   ```bash
   docker pull rabbitmq:3-management
   ```
3. Run RabbitMQ in a container:   
    ```bash      
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management 
    ```
   - The `-d` flag runs the container in detached mode.
   - The `--name` rabbitmq option names the container "rabbitmq".
   - The `-p 5672:5672` option maps the RabbitMQ port for AMQP protocol.
   - The `-p 15672:15672` option maps the RabbitMQ management UI to your local machine.


4. Access the RabbitMQ Management UI:

    Open your browser and navigate to http://localhost:15672.

    -  The default username is guest.
    -  The default password is guest.

### 5. Configure MongoDB
Ensure MongoDB is installed and running on your machine. You can download and install MongoDB from [here](https://www.mongodb.com/try/download/community).


### 6. Run the Application
```bash
npm run start 

or 

node index.js
```
The application will start both the Express server and the RabbitMQ listener.