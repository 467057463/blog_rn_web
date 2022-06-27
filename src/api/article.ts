import { request } from '@/utils';
import type { RequestRespon } from '@/types/util';
import type { ArticleItem, GetArticlesRespon } from '@/types/article';

type ArticleListRespon = RequestRespon<GetArticlesRespon>;

// 获取分类文章
export function getCategoryArticles(category, params?) {
  return request.get<unknown, ArticleListRespon>('/articles', {
    params: {
      ...params,
      category,
    },
  });
}

// 获取标签文章
export function getTagArticles(id: string, params?) {
  return request.get<unknown, ArticleListRespon>(`/tags/${id}/articles`, {
    params,
  });
}

// 获取文章
// 作为前面两个方法的入口
export function getArticles(category: string, tag: string, params?) {
  if (tag === '') {
    return getCategoryArticles(category, params);
  } else {
    return getTagArticles(tag, params);
  }
}

export function getArticle(id: string) {
  return request.get<unknown, RequestRespon<ArticleItem>>(`/articles/${id}`);
}
