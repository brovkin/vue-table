import Vue from 'vue'
import Vuex from 'vuex'
import {getProducts} from "../assets/request";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    modal: false,
    isError: false,
    errorMessage: '',
    isLoading: true,
    filter: {
      perPage: 10,
      currentPage: 1,
    },
    sorting: {
      name: 'product',
      order: 'asc'
    },
    sortData: [
      {selected: true, sorted: true, id: 'product', title: 'Product (100g serving)', active: true},
      {selected: true, sorted: false, id: 'calories', title: 'Calories', active: false},
      {selected: true, sorted: false, id: 'fat', title: 'Fat (g)', active: false},
      {selected: true, sorted: false, id: 'carbs', title: 'Carbs (g)', active: false},
      {selected: true, sorted: false, id: 'protein', title: 'Protein (g)', active: false},
      {selected: true, sorted: false, id: 'iron', title: 'Iron (%)', active: false},
    ]
  },
  mutations: {
    getData(state, data) {
      state.products = data
        .map(item => {
          return {
            ...item,
            display: false,
            checked: false
          }
        });
    },
    catchError(state, value) {
      state.errorMessage = value.error;
      state.isError = true;
    },
    loading(state) {
      state.isLoading = false
    },
    deleteItem(state, id) {
      const products = state.products.concat();
      state.products = products.filter(item => item.id !== id);
    },
    allChecked(state) {
      const products = state.products.concat();
      console.log(products);

      state.products = products.map(item => {
        return {
          ...item,
          checked: !item.checked
        }
      })
    },
    deleteChecked(state) {
      const products = state.products;
      state.products = products.filter(item => !item.checked)
    },

    itemsPerPage(state, value) {
      state.filter = {perPage: value, currentPage: 1}
    },

    incrementPage(state) {
      state.filter.currentPage = state.filter.currentPage + 1;
    },
    decrementPage(state) {
      state.filter.currentPage = state.filter.currentPage - 1;
    },
    sortingByName(state, name) {
      const sortData = state.sortData.concat();
      const obj = sortData.find(item => item.id === name);

      state.sortData = [
        {...obj, active: true, sorted: true},
        ...sortData.filter(item => item.id !== name)
          .map(item => {
            return {...item, active: false, sorted: false}
          })
      ]

      state.sorting.name = name;
    },

    sortingByOrder(state, name) {

      let order = state.sorting.order;

      order === 'asc' ? order = 'desc' : order = 'asc';

      state.sorting = {
        name, order
      }
    },

    selectedAllColumns(state, value) {
      state.sortData = state.sortData.map(item => {
        return {
          ...item,
          selected: value
        }
      })
    },

    modalChange(state, value) {
      console.log(value);
      state.modal = value;
    }

  },
  actions: {
   async getData({commit}) {
     try {
       const data = await getProducts();
       commit('loading');
       commit('getData', data);
     } catch(e) {
       commit('loading');
       commit('catchError', e);
     }
   }

  },
  getters: {
    checkedItems: state => state.products.filter(item => item.checked).length,
    getAllCount: state => state.products.length
  }
})
