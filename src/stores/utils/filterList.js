/**
 *
 * @param {Object[]} list - list to filter
 * @param {Object[]} filters - array of filter parameters
 * @param {string} filters[].field - field to filter by
 * @param {string} filters[].value - value of the field to filter by
 */
export default function filterList(list, filters) {
  return list.filter((m) => filters.every((f) => m[f.field] === f.value));
}
