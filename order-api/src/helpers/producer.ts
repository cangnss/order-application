import amqp from "amqplib"
import dotenv from "dotenv"
dotenv.config();

export class Producer {
    channel:any;
    connectionString:string;
    async createChannel(){
        this.connectionString = process.env.PRODUCER_URL || "amqp://rabbitmq:5672"
        const connection = await amqp.connect(this.connectionString, "heartbeat=60")
        // const connection = await amqp.connect("amqp://localhost", "heartbeat=60")
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey:string, message: any) {
        if (!this.channel) {
            await this.createChannel();
        }

        await this.channel.assertExchange("logExchange", "direct")

        const logDetails = { 
            logType: routingKey,
            message: message,
            dateTime: new Date()
        }
        
        await this.channel.publish("logExchange", routingKey, Buffer.from(JSON.stringify(logDetails)))

        console.log(`the message ${message} is sent to exchange logExchange`)
    }
}