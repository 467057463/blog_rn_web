import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '@/hook/useStore';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/router';
type Props = NativeStackScreenProps<RootStackParamsList, 'Login'>;

export default observer(function Login({ route, navigation }: Props) {
  const { userStore } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data) {
    try {
      await userStore.login(data);
      navigation.navigate('Home' as any);
    } catch (error) {
      console.error(error);
    }
  }

  const SubmitErrorHandler = (error) => console.log(error);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: {
              value: true,
              message: '不能为空',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入用户名"
              errorMessage={errors.username?.message}
              leftIcon={{ type: 'iconfont', name: 'user' }}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              errorStyle={styles.errorStyle}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: '不能为空',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入密码"
              secureTextEntry={true}
              errorMessage={errors.password?.message}
              leftIcon={{ type: 'iconfont', name: 'like' }}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              errorStyle={styles.errorStyle}
            />
          )}
        />

        <Button
          style={styles.button}
          radius="6"
          onPress={handleSubmit(onSubmit, SubmitErrorHandler)}
        >
          登录
        </Button>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.tips}>本站暂未开放登录,本页面仅供管理员使用</Text>
        <Button type="clear">放弃登录</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorStyle: {
    height: 20,
  },
  containerStyle: {
    paddingBottom: 5,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 6,
  },
  leftIconContainerStyle: {
    marginLeft: 10,
    marginRight: 5,
    marginVertical: 0,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tips: {
    color: '#ccc',
  },
});
