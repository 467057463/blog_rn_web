import { request } from '@/utils';
import type { RequestRespon } from '@/types/util';
import type { GetArticlesRespon } from '@/types/article';
export function getArticles() {
  return request.get<unknown, RequestRespon<GetArticlesRespon>>('/articles');
}
