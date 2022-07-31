import React from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '@rneui/themed';
import { useStore } from '@/hook/useStore';

export default observer(() => {
  const { tagStore } = useStore();

  return (
    <View style={styles.tagWrapper}>
      <View style={styles.tagList}>
        {tagStore.data.map((tag) => (
          <Text style={styles.tag} key={tag._id}>
            {tag.name}
          </Text>
        ))}
        <Text style={styles.addTagBtn}>添加标签+</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  tagWrapper: {},
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    // cursor: 'pointer',
  },
  addTagBtn: {
    // marginTop: 5,
    // cursor: 'pointer',
  },
});
