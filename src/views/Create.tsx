import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Button, Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';

import Editor from '@/components/Editor';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ModalLoading from '@/components/ModalLoading';
import { createArticle } from '@/api/article';
import type { StatusType } from '@/types/util';
import { delay } from '@/utils';

export default observer(function Edit({ route, navigation }: any) {
  // data
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [promptVisible, setPromptVisible] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>();
  const [promptPosition, setPromptPosition] = useState<string>();

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
  // 提交
  async function onSubmit(data) {
    try {
      setSubmitLoading(true);
      const res = await createArticle(data);
      setSubmitLoading(false);

      setPromptVisible(true);
      setPromptPosition('top');
      setPrompt('文章发布成功');
      await delay(1000);
      setPromptVisible(false);
      navigation.navigate('EditCategory', {
        id: res.result._id,
        title: data.title,
      });
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
    }
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
          titleStyle={{ color: Platform.OS !== 'web' ? '#fff' : '#007aff' }}
        >
          保存
        </Button>
      ),
    });
  }, [navigation]);

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
