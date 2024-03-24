import amqp from "amqplib"

async function consumeMessages() {
    console.log("calisti");
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct");
    
    const q = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(q.queue, "logExchange", "Info");

    channel.consume(q.queue, (message: any) => {
        const data = JSON.parse(message?.content);
        console.log(data)
        channel.ack(message);
    })
}

consumeMessages();