import {AppRegistry} from 'react-native';
import {name as appName} from '../package.json';
import App from './App';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent('app', () => App);
AppRegistry.runApplication('app', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
