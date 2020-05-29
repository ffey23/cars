const nestedProperty = require('nested-property');

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
    if (typeof nestedProperty.get(a, field) === 'string') {
      if (nestedProperty.get(a, field).toLowerCase() < nestedProperty.get(b, field).toLowerCase()) {
        return desc ? 1 : -1;
      }
      if (nestedProperty.get(a, field).toLowerCase() > nestedProperty.get(b, field).toLowerCase()) {
        return desc ? -1 : 1;
      }
      return 0;
    }
    if (typeof nestedProperty.get(a, field) === 'number') {
      if (nestedProperty.get(a, field) < nestedProperty.get(b, field)) {
        return desc ? 1 : -1;
      }
      if (nestedProperty.get(a, field) > nestedProperty.get(b, field)) {
        return desc ? -1 : 1;
      }
      return 0;
    }
    return 0;
  });
  return sortedList;
}
