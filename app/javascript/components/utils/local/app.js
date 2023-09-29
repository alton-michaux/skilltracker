export const truncate = (str) => {
  return str.length > 100 ? str.substring(0, 101) + '...' : str
}
