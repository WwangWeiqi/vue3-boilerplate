/**
 * @description 基础的列表类
 * @author weiqi
 * 实现
 * 1.加载状态变化
 * 2.分页
 * 3.从列表中移除单项
 * 具体业务类可继承该global.ListBaseClass以获取相应的列表功能
 */

// import { reject } from "lodash";
import { ListBase, responseBody } from "@/interfaces";
import { findIndex } from "lodash";

export abstract class ListBaseClass<ListType extends ListBase, ItemType = any> {
  list: ListType = { rows: [], count: 0 } as unknown as ListType;
  page = 1;
  count = 10;
  inner_query = {};

  constructor(count = 10, inner_query = {}) {
    this.count = count;
    this.inner_query = inner_query;
    // makeAutoObservable(this)
  }

  init(list: ListType) {
    this.list = list;
  }

  reset() {
    this.list = { rows: [], count: 0 } as unknown as ListType;
    this.page = 1;
  }

  abstract requestListFunction(
    page: number,
    count: number,
    query: { [propeName: string]: any }
  ): Promise<responseBody<ListType>>;
  abstract postItemFunction(data: ItemType): Promise<responseBody<ItemType>>;
  abstract deleteItemFunction(id: number): Promise<responseBody<any>>;
  abstract putItemFunction(
    id: number,
    data: ItemType
  ): Promise<responseBody<ItemType>>;
  //{ [propeName: string]: { value: string; type: string } | { [propeName: string]: { value: string; type: string } }[] }
  AssembleData(query: {}) {}

  async pagination(page: number, query: any = {}) {
    const formatedQuery = { ...this.inner_query, ...query };
    this.AssembleData(formatedQuery);
    const pageInfo = (
      await this.requestListFunction(page, this.count, formatedQuery)
    ).data;
    this.list = { ...pageInfo };
    this.page = page;
  }

  async postItem(data: ItemType) {
    let postRes = (await this.postItemFunction(data)).data;
    this.list.rows.push(postRes);
    if (this.list.rows.length > this.count) {
      this.list.rows.pop();
    }
  }

  async deleteItemById(id: number) {
    await this.deleteItemFunction(id);
  }

  async putItem(id: number, data: ItemType) {
    let putRes = (await this.putItemFunction(id, data)).data;
    return putRes;
  }

  /**
   * 更新列表项
   * @param query 更新条件
   * @param value 更新内容
   */
  protected updateItemInList(query: {}, value: {}) {
    let idx = findIndex(this.list.rows, query);
    if (idx >= 0) this.list.rows.splice(idx, 1, value);
  }

  /**
   * 移除列表项
   * @param item 移除条件，符合条件的项均会被移除
   */
  protected removeItemFromList(item: {}) {
    let idx = findIndex(this.list.rows, item);
    if (idx >= 0) this.list.rows.splice(idx, 1);
  }

  getListLength() {
    return this.list.rows.length;
  }
  getList() {
    return this.list;
  }

  getPagingInfo() {
    return {
      page: this.page,
      count: this.count,
    };
  }
}
