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

// 获取文章详情
export function getArticle(id: string) {
  return request.get<unknown, RequestRespon<ArticleItem>>(`/articles/${id}`);
}

// 新建文章
export function createArticle(params: { title: string; content: string }) {
  return request.post<unknown, RequestRespon<ArticleItem>>(`/articles`, params);
}

// 浏览文章
export function view(id: string) {
  return request.post(`/articles/${id}/view`);
}

// 点赞文章
export function like(id: string) {
  return request.post(`/articles/${id}/like`);
}

// 更新文章
export function updateArticle(
  id: string,
  params: { title: string; content: string }
) {
  return request.put(`/articles/${id}`, params);
}

// 更新文章分类等信息
export function updateArticleInfo(id: string, params: FormData) {
  return request.post<unknown, RequestRespon<ArticleItem>>(
    `/articles/${id}/update_info`,
    params,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
}

// 删除文章
export function deleteArticle(id: string) {
  return request.delete(`/articles/${id}`);
}
