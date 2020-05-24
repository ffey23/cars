import { observable, action } from 'mobx';
import viewList from './utils/viewList';
import filterList from './utils/filterList';

const cars = observable({
  makes: [
    { id: 1, name: 'BMW', country: 'Germany' },
    { id: 2, name: 'Ford', country: 'USA' },
    { id: 3, name: 'Volkswagen', country: 'Germany' },
    { id: 4, name: 'Nissan', country: 'Japan' },
    { id: 5, name: 'Renault', country: 'France' },
    { id: 6, name: 'Mercedes-Benz', country: 'Germany' },
  ],

  models: [
    { id: 1, makeId: 1, name: '325e' },
    { id: 2, makeId: 4, name: 'Pickup' },
    { id: 3, makeId: 6, name: 'CL550' },
    { id: 4, makeId: 3, name: 'Beetle' },
    { id: 5, makeId: 2, name: 'Bronco' },
    { id: 6, makeId: 5, name: 'Fuego' },
    { id: 7, makeId: 2, name: 'Escape' },
    { id: 8, makeId: 1, name: '640i' },
    { id: 9, makeId: 6, name: '400SE' },
    { id: 10, makeId: 3, name: 'Fox' },
    { id: 11, makeId: 5, name: '18i' },
    { id: 12, makeId: 4, name: 'Rogue' },
    { id: 13, makeId: 1, name: '750i' },
    { id: 14, makeId: 4, name: 'Quest' },
    { id: 15, makeId: 5, name: 'Sportwagon' },
    { id: 16, makeId: 2, name: 'Contour' },
    { id: 17, makeId: 6, name: '300SL' },
    { id: 18, makeId: 3, name: 'Golf' },
  ],

  selectedModel: null,

  selectModel(id) {
    this.selectedModel = id;
  },

  modelListFilters: {
    sortBy: null,
    filters: [],
    currentPage: 1,
    perPage: 6,
  },

  // Returns mutated model - needed to assign values based on makeId - NOT ACTION
  mutateRecord(model) {
    const make = this.makes.find((m) => m.id === model.makeId);
    return { ...model, make: make.name, country: make.country };
  },

  // creates list view records
  get modelsList() {
    const { models, modelListFilters } = this;
    return viewList(models, modelListFilters, this.mutateRecord.bind(this));
  },

  /**
  *  MANIPULATE FILTERS
  */

  // going to the first page after sorting changes
  sortList(sortBy) {
    this.modelListFilters = {
      ...this.modelListFilters, sortBy, currentPage: 1,
    };
  },
  // everything stays the same, just page changes
  paginateList(page) {
    this.modelListFilters.currentPage = page;
  },
  // when filters change, go to the first page
  filterList(filters) {
    this.modelListFilters = { ...this.modelListFilters, filters, currentPage: 1 };
  },

  // Filtered records count needed for tatal pages number
  get modelsListCount() {
    return filterList(
      this.models.map(this.mutateRecord.bind(this)),
      this.modelListFilters.filters,
    ).length;
  },

  get previousPage() {
    const { currentPage } = this.modelListFilters;
    return currentPage === 1 ? null : currentPage - 1;
  },

  get nextPage() {
    const { modelsListCount } = this;
    const { currentPage, perPage } = this.modelListFilters;
    return (currentPage * perPage < modelsListCount) ? currentPage + 1 : null;
  },

  updateModel(id, data) {
    const model = this.models.find((m) => m.id === id);
    Object.assign(model, data);
  },

}, {
  sortList: action,
  paginateList: action,
  filterList: action,
  updateModel: action,
  selectModel: action,
});

export default cars;
