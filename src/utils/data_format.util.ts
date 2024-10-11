/*
 * @Author: weiqi
 * @Date: 2022-03-22 17:22:53
 * @LastEditors: weiqi
 * @LastEditTime: 2022-08-12 00:00:15
 * @Description: file content
 * @FilePath: /tongheOA/backend/ms-tonghe/src/utils/data_format_util.ts
 */
/**
 * @description 数据规范工具类
 */
import _ from "lodash";

export const convertStringToObj = (arg: string | object | null) => {
  const t = Object.prototype.toString.call(arg);
  switch (t) {
    case "[object Object]":
      return arg;
    case "[object String]":
      return JSON.parse((arg as string) ?? "{}");
    case "[object Null]":
      return {};
    default:
      throw "数据格式只能为string | object | null";
  }
};

export const formatCardAccount = (cardAccount: string) => {
  return cardAccount.replace(
    /([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})/,
    "$1 $2 $3 $4"
  );
};
