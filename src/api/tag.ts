import { request } from '@/utils';
import type { RequestRespon } from '@/types/util';
import type { GetTagRespon } from '@/types/tag';

const defaultTag = [
  { name: 'css', _id: 'css' },
  { name: 'js', _id: 'js' },
  { name: 'typescript', _id: 'typescript' },
  { name: 'vue', _id: 'vue' },
  { name: 'react', _id: 'react' },
  { name: '动画', _id: 'animation' },
  { name: '工具', _id: 'tool' },
  { name: 'git', _id: 'git' },
  { name: 'node', _id: 'node' },
];

// 获取所以标签
export async function getTags() {
  try {
    const { result } = await request.get<unknown, RequestRespon<GetTagRespon>>(
      '/tags'
    );
    return [{ name: 'all', _id: '' }, ...defaultTag, ...result];
  } catch (error) {
    return Promise.reject(error);
  }
}
