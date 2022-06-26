import { request } from '@/utils';
import type { RequestRespon } from '@/types/util';
import type { GetTagRespon } from '@/types/tag';

// 获取所以标签
export async function getTags() {
  try {
    const { result } = await request.get<unknown, RequestRespon<GetTagRespon>>(
      '/tags'
    );
    return [{ name: '全部', _id: '' }, ...result];
  } catch (error) {
    return Promise.reject(error);
  }
}
