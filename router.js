const amqp = require('amqplib');
const express = require('express');
const app = express();

let products = [];
let jobCount = 0;

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('jobs');
    await channel.assertQueue('products');

    await channel.consume('products', (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received product with input ${input.name}`);
      channel.ack(message);
      products.push(input);
    });

    console.log('Waiting for product');

    app.use(express.json());

    app.post('/jobs', (req, res) => {
      const job = req.body;
      job.id = jobCount;
      console.log(job);

      channel.sendToQueue('jobs', Buffer.from(JSON.stringify(job)));
      jobCount++;

      res.end(`Job sent successfully ${job.name}`);
      console.log(`Job sent successfully ${job.name}`);
    });

    app.get('/products', (_req, res) => {
      res.json({ products });
    });

    app.listen(5000, () => console.log('Server started'));
  } catch (error) {
    console.error(error);
  }
};

connect();
