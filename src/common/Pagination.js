import { observable, action, decorate } from 'mobx';

class Pagination {
    sortBy;

    filters = [];

    currentPage = 1;

    perPage = 6;

    constructor(store, initParams = {
      sortBy: null,
      filters: [],
      currentPage: 1,
      perPage: 2,
    }) {
      this.setParams(initParams);
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
  sortBy: observable,
  filters: observable,
  currentPage: observable,
  perPage: observable,
  setSortBy: action,
  setCurrentPage: action,
  setFilters: action,
  setParams: action,
});

export default Pagination;
