import { Container } from 'typedi';
import Storephish from './Storephish';
import Authphish from './Authphish';

/**
 * Sets up the dependency injection container
 */
export default () => {
  Container.set('Storephish', new Storephish());
  Container.set('Authphish', new Authphish());
};
