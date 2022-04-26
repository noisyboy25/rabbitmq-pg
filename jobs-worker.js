const amqp = require('amqplib');

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('jobs');
    await channel.assertQueue('products');

    await channel.consume('jobs', (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.name}`);
      if (input.name == 111) {
        channel.ack(message);
        const output = { id: input.id, name: input.name + input.name };
        channel.sendToQueue('products', Buffer.from(JSON.stringify(output)));
        console.log(`Job completed successfully ${output.name}`);
      }
    });
    console.log('Waiting for messages');
  } catch (error) {
    console.error(error);
  }
};

connect();
