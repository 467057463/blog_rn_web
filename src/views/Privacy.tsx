import React from 'react';
import ArticleList from '@/components/articleList';
import { observer } from 'mobx-react-lite';

export default observer(function Life(props: any) {
  return <ArticleList {...props} category="PRIVACY" tag="" />;
});
