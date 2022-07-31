import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Button, Input, Text } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import FileInput from '@/components/FileInput';
import TagInput from '@/components/TagInput';
import { Picker } from '@react-native-picker/picker';

export default observer(function EditCategory({ route, navigation }: any) {
  // form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      describe: '',
      cover: '',
      category: '',
      tags: '',
    },
  });
  // 提交
  async function onSubmit(data) {
    console.log(data);
  }

  // 错误验证
  const SubmitErrorHandler = (error) => console.log(error);

  // 保存按钮
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSubmit(onSubmit, SubmitErrorHandler)}
          size="sm"
          containerStyle={{ marginRight: 15 }}
          type="clear"
        >
          保存
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {/* 描述 */}
      <Controller
        name="describe"
        control={control}
        rules={{
          required: {
            value: true,
            message: '不能为空',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>文章简介</Text>
            <View style={styles.inputWrapper}>
              <Input
                multiline={true}
                numberOfLines={4}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="请添加文章简介"
              />
            </View>
          </View>
        )}
      />
      {/* 图片 */}
      <Controller
        name="cover"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>文章图片</Text>
            <View style={[styles.inputWrapper, { paddingHorizontal: 10 }]}>
              <FileInput onChange={onChange} value={value} />
            </View>
          </View>
        )}
      />
      {/* 分类 */}
      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>文章分类</Text>
            <View style={[styles.inputWrapper, { paddingHorizontal: 10 }]}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
        )}
      />
      {/* 标签 */}
      <Controller
        name="tags"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>文章标签</Text>
            <View style={[styles.inputWrapper, { paddingHorizontal: 10 }]}>
              <TagInput />
            </View>
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },
  label: {
    paddingTop: 10,
    height: 40,
    fontSize: 16,
    color: '#808080',
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flex: 1,
    paddingTop: 10,
  },
});
