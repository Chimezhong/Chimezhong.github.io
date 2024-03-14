/* 公共方法的文件 */

/* 判断两个数组是否相同(包括顺序相同) */
export const arraysAreEqual = function (
  arr1: Array<number>,
  arr2: Array<number>
) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
};
