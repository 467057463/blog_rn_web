import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Button, Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';

import Editor from '@/components/Editor';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ModalLoading from '@/components/ModalLoading';
import { getArticle, updateArticle } from '@/api/article';
import type { StatusType } from '@/types/util';
import { delay } from '@/utils';
import { useStore } from '@/hook/useStore';

export default observer(function Edit({ route, navigation }: any) {
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
      title: '',
      content: '',
    },
  });

  // method
  // 获取数据
  async function fetchData() {
    try {
      setLoadingStatus('loading');
      const res = await getArticle(route.params.id);
      console.log(res);
      setValue('title', res.result.title);
      setValue('content', res.result.content);
      setLoadingStatus('success');
    } catch (error) {
      setLoadingStatus('error');
    }
  }

  // 提交
  async function onSubmit(data) {
    try {
      setSubmitLoading(true);
      await articleStore.updateArticle(route.params.id, data);
      setSubmitLoading(false);

      toast.show('文章更新成功', {
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
      {/* 标题 */}
      <Controller
        name="title"
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
            multiline={true}
            numberOfLines={2}
            placeholder="请输入文章标题"
            errorStyle={{ display: 'none' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        )}
      />
      {/* 文章内容 */}
      <Controller
        name="content"
        control={control}
        rules={{
          required: {
            value: true,
            message: '不能为空',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Editor onChange={onChange} value={value} />
        )}
      />
      {/* loading */}
      <ModalLoading visible={submitLoading} />
    </View>
  );
});
