import sortList from './sortList';
import filterList from './filterList';
/**
 *
 * @param {Object[]} list - list from which view is made
 * @param {Object} filterOptions - determines which records will be shown
 * @param {Object} filterOptions.sortBy - determines sorting
 * @param {Object} filterOptions.sortBy.field - field to sort by
 * @param {Object} [filterOptions.sortBy.desc] - true for descending sorting
 * @param {Object} filterOptions.filters - array of filter parameters
 * @param {Object} filterOptions.filters.field - field to filter by
 * @param {Object} filterOptions.filters.value - value of the field to filter by
 * @param {number} filterOptions.currentPage - determines page
 * @param {number} filterOptions.perPage - how many records per mage
 * @param {function(Object) : Object} mutateRecord - mutates elements of the list at the begining
 */
export default function viewList(list, filterOptions, mutateRecord = (x) => x) {
  const {
    filters, sortBy, currentPage, perPage,
  } = filterOptions;

  let resultList = list.map(mutateRecord);
  resultList = filterList(resultList, filters);
  if (sortBy) resultList = sortList(list, sortBy);
  return resultList.slice(perPage * (currentPage - 1), currentPage * perPage);
}
