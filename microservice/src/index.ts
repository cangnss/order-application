import amqp from "amqplib"
import sendLogByEmail from "./utils/mailSender";
import dotenv from "dotenv"
dotenv.config();

async function consumeMessages() {
    console.log("calisti", process.env.SERVICE_URL);
    let connectionString: string = "";
    if (process.env.SERVICE_URL !== undefined) {
        console.log("service url: ", process.env.SERVICE_URL)
        connectionString = process.env.SERVICE_URL || "amqp://rabbitmq:5672"
    }
    const connection = await amqp.connect(connectionString, "heartbeat=60");
    // const connection = await amqp.connect("amqp://localhost", "heartbeat=60");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct");
    
    const q = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(q.queue, "logExchange", "Info");

    channel.consume(q.queue, (message: any) => {
        let mailMessage: string = "";
        const data = JSON.parse(message?.content);
        console.log(data)
        data.message.forEach((order: any) => {
            mailMessage += `Quantity: ${order.quantity} Price: ${order.price} Status: ${order.status} Created Date: ${order.createdAt}\n`
        })
        sendLogByEmail(mailMessage)
        channel.ack(message);
    })
}

consumeMessages();