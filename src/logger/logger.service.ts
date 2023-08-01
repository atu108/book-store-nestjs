// src/rabbitmq-file-logger/rabbitmq-file-logger.service.ts

import { Injectable } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';
import { createWriteStream } from 'fs';
import * as moment from 'moment';

@Injectable()
export class LoggerService {
  private channel: Channel;
  private readonly queueName = 'logs';

  constructor() {
    this.connectToRabbitMQ();
  }

  private async connectToRabbitMQ() {
    const connection: Connection = await connect(process.env.QUEUE_URL);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });
    await this.channel.consume(
      this.queueName,
      (msg) => this.handleMessage(msg),
      { noAck: true },
    );
  }

  private handleMessage(msg: any) {
    const date = moment().format('DD-MM-YYYY');
    const logData = msg.content.toString();

    const logFileStream = createWriteStream(
      `${process.env.LOG_PATH}${date}.txt`,
      {
        flags: 'a+',
      },
    ); // Append to the file
    logFileStream.write(logData + '\n');
    logFileStream.close();
  }

  sendLog(logData: string): boolean {
    try {
      this.channel.sendToQueue(this.queueName, Buffer.from(logData));
      return true;
    } catch (error) {
      console.error('Error sending log data to RabbitMQ:', error);
      return false;
    }
  }
}
