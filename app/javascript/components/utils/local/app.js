export const truncate = (str, count) => {
  return str.length > count ? str.substring(0, count + 1) + '...' : str
}
