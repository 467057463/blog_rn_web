import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { Avatar, Icon, Text, ListItem, Button, Image } from '@rneui/themed';

export default observer(function User({ navigation }: any) {
  const { userStore } = useStore();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="default"
        translucent={true}
      />
      <ImageBackground
        source={require('@/assets/bj.jpg')}
        style={{
          height: 240,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          source={require('@/assets/avatar.jpg')}
          size={70}
          rounded
          containerStyle={{
            borderWidth: 3,
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Text style={{ color: '#fff', marginTop: 5 }}>毛有文</Text>
        <Text style={{ color: '#fff' }}>github.com/467057463</Text>
        <View
          style={{
            height: 10,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        ></View>
      </ImageBackground>
      <View style={styles.listWrapper}>
        {userStore.logined ? (
          <>
            <ListItem bottomDivider>
              <Icon name="view" type="iconfont" size={16} />
              <ListItem.Content>
                <ListItem.Title>草稿箱</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
              <Icon name="lock" type="iconfont" size={16} />
              <ListItem.Content>
                <ListItem.Title>私密日记</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem>
              <Icon name="view" type="iconfont" size={16} />
              <ListItem.Content>
                <ListItem.Title>发布文章</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </>
        ) : (
          <View style={styles.interWrapper}>
            <Text style={styles.title}>自我介绍</Text>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>90年，出生于湖北</Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>喜欢吹水，喜欢把内心不悦吐出来</Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>希望世界和平，喜欢看新闻联播</Text>
            </View>

            <Text style={styles.title}>研究方向</Text>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>专职前端</Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>半 nodejs</Text>
            </View>

            <Text style={styles.title}>联系方式</Text>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>qq/467057463</Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.itemSymbol}></View>
              <Text>email/467057463@qq.com</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.btnWrapper}>
        {userStore.logined ? (
          <Button title="退出" onPress={() => userStore.logout()} />
        ) : (
          <Button title="登录" onPress={() => navigation.navigate('Login')} />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listWrapper: {
    marginHorizontal: 15,
  },
  btnWrapper: {
    marginTop: 40,
    marginHorizontal: 15,
  },
  interWrapper: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  itemSymbol: {
    width: 4,
    height: 4,
    backgroundColor: '#000',
    marginHorizontal: 8,
    borderRadius: 2,
  },
});
