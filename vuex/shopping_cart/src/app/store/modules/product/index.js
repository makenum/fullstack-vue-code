import axios from 'axios';
import { UPDATE_PRODUCT_ITEMS } from './mutation-types';
const state = {
  productItems: [],
};
const mutations = {
  [UPDATE_PRODUCT_ITEMS](state, payload) {
    state.productItems = payload;
  },
};
const actions = {
  getProductItems({ commit }) {
    axios.get('/api/products').then((response) => {
      commit(UPDATE_PRODUCT_ITEMS, response.data);
    });
  },
};
const getters = {
  productItems: (state) => state.productItems,
};

const productModule = {
  state,
  mutations,
  actions,
  getters,
};

export default productModule;
