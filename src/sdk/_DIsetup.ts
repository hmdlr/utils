import { Container } from 'typedi';
import Storephish from './Storephish';

/**
 * Sets up the dependency injection container
 */
export default () => {
  Container.set('Storephish', new Storephish());
};
