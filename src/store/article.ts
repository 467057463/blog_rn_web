import { makeAutoObservable } from 'mobx';
import union from 'lodash/union';
import without from 'lodash/without';
import { RootStore } from './index';
import {
  getArticles,
  view,
  like,
  deleteArticle,
  updateArticle,
  updateArticleInfo,
} from '@/api/article';
import type { ArticleItem } from '@/types/article';

import type { StatusType } from '@/types/util';
import type { GetArticlesRespon } from '@/types/article';

type ListMapType = Map<string, ArticleItem>;
type DataMapType = Map<
  string,
  {
    loginStatus: StatusType;
    inited: boolean;
    listId: string[];
    meta: {
      currentPage: number;
      hasNext: boolean;
    };
  }
>;

export default class ArticleStore {
  rootStore: RootStore;
  listMap: ListMapType = new Map();
  dataMap: DataMapType = new Map();

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  // 初始化数据结构
  initDataMap(keys: string[]) {
    keys.forEach((key) => {
      this.dataMap.set(key, {
        loginStatus: 'loading',
        inited: false,
        listId: [],
        meta: {
          currentPage: 0,
          hasNext: true,
        },
      });
    });
  }

  // 根据 category/tag 获取 dataMap
  getDataMap(type: string) {
    return this.dataMap.get(type)!;
  }

  // 根据 category/tag 获取文章列表
  async getArticles(category: string, tag: string, params?) {
    const map = this.getDataMap(tag || category)!;

    try {
      map.loginStatus = 'loading';
      const {
        result: { list, meta },
      } = await getArticles(category, tag, params);

      const listId = list.map((item) => {
        this.listMap.set(item._id, item);
        return item._id;
      });
      // 去重先入保留
      map.listId = union(map.listId, listId);
      map.meta = meta;
      map.loginStatus = 'success';
      map.inited = true;
    } catch (error) {
      map.loginStatus = 'error';
    }
  }

  // 浏览文章
  async viewArticle(id: string) {
    try {
      const article = this.listMap.get(id)!;
      console.log(article);
      await view(id);
      if (article) {
        article.meta.view = article.meta.view + 1;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 点赞文章
  async likeArticle(id: string) {
    try {
      const article = this.listMap.get(id)!;
      await like(id);
      if (article) {
        article.meta.like = article.meta.like + 1;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 更新文章
  async updateArticle(id: string, params: { title: string; content: string }) {
    try {
      const article = this.listMap.get(id)!;
      await updateArticle(id, params);
      if (article) {
        article.title = params.title;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 更新文章分类等信息
  async updateArticleInfo(id: string, params: FormData) {
    try {
      const article = this.listMap.get(id)!;
      const { result } = await updateArticleInfo(id, params);
      if (article) {
        const originType = [
          article.category,
          ...article.tags.map((item) => item._id),
        ];
        article.describe = result.describe;
        article.cover = result.cover;
        article.category = result.category;
        article.tags = result.tags;
        const newType = [
          result.category,
          ...result.tags.map((item) => item._id),
        ];
        const removeType = without(originType, ...newType);
        const addType = without(newType, ...originType);
        console.log(without([1, 2, 3], ...[2, 3, 4]));
        console.log(originType, newType);
        console.log(removeType, addType);
        // 移除原分类下的文章
        removeType.forEach((type) => {
          const typeData = this.getDataMap(type);
          const index = typeData.listId.findIndex((_id) => _id === id);
          if (index >= 0) {
            typeData.listId.splice(index, 1);
          }
        });

        // 在新添加的分类下增加文章
        addType.forEach((type) => {
          const typeData = this.getDataMap(type);
          typeData.listId.push(id);
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 删除文章
  async deleteArticle(id: string) {
    try {
      await deleteArticle(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
