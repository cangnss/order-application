import amqp from "amqplib"
import sendLogByEmail from "./utils/mailSender";

async function consumeMessages() {
    console.log("calisti");
    const connection = await amqp.connect("amqp://localhost");
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