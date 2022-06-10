import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Image, Input, Text } from '@rneui/themed';

export default observer(function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          placeholder="请输入用户名"
          leftIcon={{ type: 'iconfont', name: 'user' }}
          containerStyle={{ paddingBottom: 20 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 6 }}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 5,
            marginVertical: 0,
          }}
        />
        <Input
          placeholder="请输入密码"
          leftIcon={{ type: 'iconfont', name: 'like' }}
          containerStyle={{ paddingBottom: 20 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 6 }}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 5,
            marginVertical: 0,
          }}
        />
        <Button style={styles.button} radius="6">
          登录
        </Button>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ color: '#ccc' }}>
          本站暂未开放登录,本页面仅供管理员使用
        </Text>
        <Button type="clear">放弃登录</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
});
