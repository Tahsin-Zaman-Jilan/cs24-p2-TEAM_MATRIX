export function transformRoleArray(arr:string[]) {
  return arr.map((item) => {
    return item.toLowerCase().replace(/_/g, " ");
  });
}
