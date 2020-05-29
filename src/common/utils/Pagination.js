import {
  observable, action, computed, decorate,
} from 'mobx';
import viewList from './viewList';
import filterList from './filterList';

class Pagination {
    unsortedList = [];

    sortBy;

    filters = [];

    currentPage = 1;

    perPage = 6;

    constructor(list, initParams = {
      sortBy: null,
      filters: [],
      currentPage: 1,
      perPage: 2,
    }) {
      this.unsortedList = list;
      this.setParams(initParams);
    }

    // creates list view records
    get list() {
      const {
        unsortedList, sortBy, filters, currentPage, perPage,
      } = this;
      return viewList(unsortedList, {
        sortBy, filters, currentPage, perPage,
      });
    }

    // filtered records count needed for total pages number
    get listCount() {
      return filterList(
        this.unsortedList,
        this.filters,
      ).length;
    }

    get previousPage() {
      const { currentPage } = this;
      return currentPage === 1 ? null : currentPage - 1;
    }

    get nextPage() {
      const { currentPage, perPage, listCount } = this;
      return (currentPage * perPage < listCount) ? currentPage + 1 : null;
    }

    setParams = (params) => {
      this.sortBy = params.sortBy;
      this.filters = params.filters;
      this.currentPage = params.currentPage;
      this.perPage = params.perPage;
    }


    // going to the first page after sorting changes
    setSortBy = (sortBy) => {
      this.sortBy = sortBy;
      this.currentPage = 1;
    }

    // everything stays the same, just page changes
    setCurrentPage = (page) => {
      this.currentPage = page;
    }

    // when filters change, go to the first page
    setFilters = (filters) => {
      this.filters = filters;
      this.currentPage = 1;
    }
}

decorate(Pagination, {
  unsortedList: observable,
  sortBy: observable,
  filters: observable,
  currentPage: observable,
  perPage: observable,
  list: computed,
  listCount: computed,
  previousPage: computed,
  nextPage: computed,
  setSortBy: action,
  setCurrentPage: action,
  setFilters: action,
  setParams: action,
});

export default Pagination;
