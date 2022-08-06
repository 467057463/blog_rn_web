import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Button, Input, Text } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import FileInput from '@/components/FileInput';
import TagInput from '@/components/TagInput';
import { Picker } from '@react-native-picker/picker';
import { useToast } from 'react-native-toast-notifications';

import { getArticle, updateArticleInfo } from '@/api/article';
import type { StatusType } from '@/types/util';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ModalLoading from '@/components/ModalLoading';
import { delay } from '@/utils';
import { useStore } from '@/hook/useStore';

export default observer(function EditCategory({ route, navigation }: any) {
  const toast = useToast();
  const { articleStore } = useStore();

  // data
  const [loadingStatus, setLoadingStatus] = useState<StatusType>('loading');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
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
      category: 'DRAFT',
      tags: [] as string[],
      removeCover: false,
      title: '',
    },
  });

  // method
  // 获取数据
  async function fetchData() {
    try {
      setLoadingStatus('loading');
      const res = await getArticle(route.params.id);
      console.log(res);
      setValue('describe', res.result.describe);
      setValue('cover', res.result.cover);
      setValue('category', res.result.category);
      setValue('title', res.result.title);
      setValue(
        'tags',
        res.result.tags.map((item) => item._id)
      );
      setLoadingStatus('success');
    } catch (error) {
      setLoadingStatus('error');
    }
  }

  function handleRemoveCover(value) {
    setValue('removeCover', value);
  }

  // 提交
  async function onSubmit(data) {
    console.log(data);
    const formData = new FormData();
    if (data.cover) {
      formData.append('cover', data.cover);
    }
    if (data.describe) {
      formData.append('describe', data.describe);
    }
    if (data.category) {
      formData.append('category', data.category);
    }
    if (data.tags) {
      formData.append('tags', JSON.stringify(data.tags));
    }
    if (data.removeCover) {
      formData.append('removeCover', data.removeCover);
    }
    try {
      setSubmitLoading(true);
      await articleStore.updateArticleInfo(route.params.id, formData);
      setSubmitLoading(false);
      toast.show('文章信息更新成功', {
        placement: 'top',
        duration: 1000,
        animationType: 'slide-in',
      });
      await delay(1000);
      navigation.navigate('Details', {
        id: route.params.id,
        title: data.title,
      });
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
    }
  }

  // 错误验证
  const SubmitErrorHandler = (error) => console.log(error);

  useEffect(() => {
    fetchData();
  }, []);

  // 保存按钮
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSubmit(onSubmit, SubmitErrorHandler)}
          size="sm"
          containerStyle={{ marginRight: 15 }}
          type="clear"
          titleStyle={{ color: Platform.OS !== 'web' ? '#fff' : '#007aff' }}
        >
          保存
        </Button>
      ),
    });
  }, [navigation]);

  if (loadingStatus === 'loading') {
    return <Loading />;
  }

  if (loadingStatus === 'error') {
    return <Error />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* 描述 */}
      <Controller
        name="describe"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.label}>文章简介</Text>
            </View>
            <View style={[styles.inputWrapper]}>
              <Input
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="请添加文章简介"
                errorMessage={errors.describe?.message}
                containerStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  marginHorizontal: 0,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
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
            <View>
              <Text style={styles.label}>文章图片</Text>
            </View>
            <View style={[styles.inputWrapper, { paddingBottom: 10 }]}>
              <FileInput
                onChange={onChange}
                onRemove={handleRemoveCover}
                value={value}
              />
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
            <View>
              <Text style={styles.label}>文章分类</Text>
            </View>
            <View style={[styles.inputWrapper, { paddingBottom: 10 }]}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                style={{ marginHorizontal: 0, paddingHorizontal: 0 }}
              >
                <Picker.Item label="技术" value="TECHNICAL" />
                <Picker.Item label="随笔" value="LIFE" />
                <Picker.Item label="日记" value="PRIVACY" />
                <Picker.Item label="草稿" value="DRAFT" />
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
            <View style={[styles.inputWrapper]}>
              <TagInput onChange={onChange} value={value} />
            </View>
          </View>
        )}
      />
      {/* loading */}
      <ModalLoading visible={submitLoading} />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    paddingVertical: 10,
    fontSize: 18,
    color: '#808080',
  },
  inputWrapper: {
    // flex: 1,
    // paddingTop: 10,
  },
});
