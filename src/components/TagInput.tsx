import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text, Overlay, Button, Input } from '@rneui/themed';
import { useStore } from '@/hook/useStore';
import { useForm, Controller } from 'react-hook-form';

export default observer(({ onChange, value }: any) => {
  const { tagStore } = useStore();
  const [tags, setTags] = React.useState<string[]>(value);
  const [visible, setVisible] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setTags(value);
  }, []);

  // form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  async function onSubmit(data) {
    try {
      setSubmitLoading(true);
      await tagStore.addTag(data.name);
      setSubmitLoading(false);
      toggleOverlay();
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
    }
  }

  // 错误验证
  const SubmitErrorHandler = (error) => console.log(error);

  function handleChange(id) {
    const index = tags.findIndex((item) => item === id);
    let _tags;
    if (index >= 0) {
      _tags = tags.filter((item) => item !== id);
    } else {
      _tags = [...tags, id];
    }
    setTags(_tags);
    onChange(_tags);
  }

  function addTag() {
    setVisible(true);
  }

  function toggleOverlay() {
    setVisible(false);
    setValue('name', '');
  }

  return (
    <>
      <View style={styles.tagWrapper}>
        <View style={styles.tagList}>
          {tagStore.data
            .filter((item) => item.name !== 'all')
            .map((tag) => (
              <Text
                style={[
                  styles.tag,
                  tags.includes(tag._id) ? styles.active : null,
                ]}
                key={tag._id}
                onPress={() => handleChange(tag._id)}
              >
                {tag.name}
              </Text>
            ))}
          <Text style={styles.addBtn} onPress={() => addTag()}>
            添加标签+
          </Text>
        </View>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <Text style={styles.title}>添加标签</Text>
        {/* 描述 */}
        <Controller
          name="name"
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
              placeholder="请输入标签名"
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Button
          title="提交"
          onPress={handleSubmit(onSubmit, SubmitErrorHandler)}
          containerStyle={styles.btnStyle}
          loading={submitLoading}
        />
      </Overlay>
    </>
  );
});

const styles = StyleSheet.create({
  tagWrapper: {},
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    lineHeight: 14,
    fontSize: 14,
    alignItems: 'center',
    height: 26,
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#ecf5ff',
    borderColor: '#409eff',
    borderWidth: 1,
    color: '#709eff',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
    // cursor: 'pointer',
  },
  addBtn: {
    height: 26,
    justifyContent: 'center',
    lineHeight: 14,
    fontSize: 14,
    textAlignVertical: 'center',
  },
  active: {
    color: '#fff',
    backgroundColor: '#709eff',
    borderColor: '#709eff',
  },
  overlay: {
    width: 320,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  btnStyle: {
    marginTop: 15,
    marginHorizontal: 10,
  },
});
