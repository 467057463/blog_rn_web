import { request } from '@/utils';
import type { RequestRespon } from '@/types/util';
import type { GetTagRespon } from '@/types/tag';

// 获取所以标签
export function getTags() {
  return request.get<unknown, RequestRespon<GetTagRespon>>('/tags');
}
