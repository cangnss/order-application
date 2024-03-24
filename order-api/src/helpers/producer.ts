import amqp from "amqplib"

export class Producer {
    channel:any;

    async createChannel(){
        const connection = await amqp.connect("amqp://localhost")
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