import {
  observable, action, computed, decorate, autorun,
} from 'mobx';
import getPaginatedList from './getPaginatedList';
import filterList from './filterList';

class Pagination {
    unsortedList = [];

    sortBy;

    filters = [];

    currentPage = 1;

    perPage = 6;

    list = [];

    constructor(list, initParams = {
      sortBy: null,
      filters: [],
      currentPage: 1,
      perPage: 2,
    }) {
      this.unsortedList = list;
      this.setParams(initParams);
      autorun(() => {
        this.list = this.listComputed;
      });
    }

    // creates list view records
    get listComputed() {
      const {
        unsortedList, sortBy, filters, currentPage, perPage,
      } = this;
      return getPaginatedList(unsortedList, {
        sortBy, filters, currentPage, perPage,
      });
    }

    get filteredListComputed() {
      const {
        unsortedList, sortBy, filters,
      } = this;
      return getPaginatedList(unsortedList, {
        sortBy, filters, currentPage: 1, perPage: Infinity,
      });
    }

    // filtered records count needed for total pages number
    get listCount() {
      return filterList(
        this.unsortedList,
        this.filters,
      ).length;
    }

    get listPagesCount() {
      return Math.ceil(this.listCount / this.perPage);
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

    // Go to table page where item with specified id
    // If item is in filtered list, go to the page of filtered list
    // If item is not in filtered list, clear filters and go to needed page
    goToPageWhereIsItem = (id) => {
      let index = this.filteredListComputed.findIndex((item) => id === item.id);
      if (index !== -1) this.setCurrentPage(Math.ceil((index + 1) / this.perPage));
      else {
        this.filters = [];
        index = this.filteredListComputed.findIndex((item) => id === item.id);
        this.setCurrentPage(Math.ceil((index + 1) / this.perPage));
      }
    }

    /**
     * 1. If not sorted by this field then sort desc
     * 2. If sorted desc then sort asc
     * 3. If sorted asc then unsort
     */
    setSortByField = (field) => {
      if (!this.sortBy) {
        this.setSortBy({ field, desc: true });
      } else if (this.sortBy.desc) {
        this.setSortBy({ field });
      } else {
        this.setSortBy(null);
      }
    }
}

decorate(Pagination, {
  unsortedList: observable,
  sortBy: observable,
  filters: observable,
  currentPage: observable,
  perPage: observable,
  list: observable,
  listComputed: computed,
  filteredListComputed: computed,
  listCount: computed,
  previousPage: computed,
  nextPage: computed,
  setSortBy: action,
  setCurrentPage: action,
  setFilters: action,
  setParams: action,
  setSortByField: action,
  listPagesCount: computed,
  goToPageWhereIsItem: action,
});

export default Pagination;
