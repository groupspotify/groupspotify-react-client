import TopicSubscriber from './subscriber'
import TopicPublisher from './publisher'
import solace from "solclientjs";
const factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles7;
solace.SolclientFactory.init(factoryProps);

export const initSubscriber = (topicName) => {
  return new TopicSubscriber(solace, topicName);
}

export const initPublisher = (topicName) => {
    return new TopicPublisher(solace, topicName);
  }