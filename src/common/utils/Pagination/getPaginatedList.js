import sortList from './sortList';
import filterList from './filterList';
/**
 *
 * @param {Object[]} list - list from which view is made
 * @param {Object} paginationParams - determines which records will be shown
 * @param {Object} paginationParams.sortBy - determines sorting
 * @param {Object} paginationParams.sortBy.field - field to sort by
 * @param {Object} [paginationParams.sortBy.desc] - true for descending sorting
 * @param {Object} paginationParams.filters - array of filter parameters
 * @param {Object} paginationParams.filters.field - field to filter by
 * @param {Object} paginationParams.filters.value - value of the field to filter by
 * @param {number} paginationParams.currentPage - determines page
 * @param {number} paginationParams.perPage - how many records per mage
 * @param {function(Object) : Object} mutateRecord - mutates elements of the list at the begining
 */
export default function getPaginatedList(list, paginationParams, mutateRecord = (x) => x) {
  const {
    filters, sortBy, currentPage, perPage,
  } = paginationParams;

  let resultList = list.map(mutateRecord);
  resultList = filterList(resultList, filters);
  if (sortBy) resultList = sortList(list, sortBy);
  return resultList.slice(perPage * (currentPage - 1), currentPage * perPage);
}
