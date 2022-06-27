import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// root 路由参数
export type RootStackParamsList = {
  Technology: NavigatorScreenParams<TechnologyParamsList>;
  Life: NavigatorScreenParams<LifeParamsList>;
  About: undefined;
  // Details: {
  //   id: string;
  // };
  // Login: undefined;
};

// Technology 路由参数
export type TechnologyParamsList = {
  Home: NavigatorScreenParams<TechnologyTabParamsList>;
  Details: {
    id: string;
  };
};

// Technology tab 路由参数
export type TechnologyTabParamsList = {
  [K: string]: undefined;
};

// Life 路由参数
export type LifeParamsList = {
  Home: undefined;
  Details: {
    id: string;
  };
};

//
export type ScreenProps<name extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, name>;
