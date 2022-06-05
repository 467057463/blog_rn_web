import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from '../package.json';
import App from './App';

function Root(){
  return (
    <>
      <style type="text/css">{`
        @font-face {
          font-family: 'Iconfont';
          src: url(${require('react-native-vector-icons/Fonts/Iconfont.ttf')}) format('truetype');
        }
      `}</style>
      <App/>
    </>
  )
}
if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent('app', () => Root);
AppRegistry.runApplication('app', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
