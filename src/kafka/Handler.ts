import { KafkaMessage } from 'kafkajs';
import { getLogger } from '../Logger';

const logger = getLogger();

export const kafkaConsumeMessage = async (
  topic: string,
  message: KafkaMessage,
  topicHandler: { [topic: string]: (arg: any) => Promise<void> }
) => {
  const handler = topicHandler[topic];
  if (!handler) {
    logger.error(`No handler for topic ${topic}`);
    return;
  }
  let parsedMessage: any;
  try {
    parsedMessage = JSON.parse(message.value.toString());
  } catch (e) {
    logger.error(`Error parsing message ${message.value.toString()}`);
    return;
  }
  try {
    await handler(parsedMessage);
  } catch (e) {
    logger.error(e);
  }
};
