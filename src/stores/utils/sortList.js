/**
 *
 * @param {Object[]} list - list to sort
 * @param {Object} sortBy - determines sorting
 * @param {string} sortBy.field - field to sort by
 * @param {boolean} [sortBy.desc] - true for descending sorting
 */
export default function sortList(list, sortBy) {
  const { field, desc } = sortBy;
  const sortedList = list.slice().sort((a, b) => {
    if (typeof a[field] === 'string') {
      if (a[field].toLowerCase() < b[field].toLowerCase()) {
        return desc ? 1 : -1;
      }
      if (a[field].toLowerCase() > b[field].toLowerCase()) {
        return desc ? -1 : 1;
      }
      return 0;
    }
    if (typeof a[field] === 'number') {
      if (a[field] < b[field]) {
        return desc ? 1 : -1;
      }
      if (a[field] > b[field]) {
        return desc ? -1 : 1;
      }
      return 0;
    }
    return 0;
  });
  return sortedList;
}
