export const memo = <T>(fn: () => T, equals: boolean) => {
  console.log('memo', fn, equals);
}
