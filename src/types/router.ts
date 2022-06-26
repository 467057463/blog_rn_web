import { NavigatorScreenParams } from '@react-navigation/native';
// root 路由参数
export type RootStackParamsList = {
  Home: NavigatorScreenParams<HomeParamsList>;
  Login: undefined;
  // Details: {
  //   id: string;
  // };
};

// home 路由参数
export type HomeParamsList = {
  Technology: undefined;
  Life: undefined;
  About: undefined;
  Details: {
    id: string;
  };
};
