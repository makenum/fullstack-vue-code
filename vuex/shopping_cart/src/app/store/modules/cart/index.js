import axios from 'axios';
import { UPDATE_CART_ITEMS, CHECKOUT_CART } from './mutation-types';
const state = {
  cartItems: [],
};
const mutations = {
  // 更新购物车列表
  [UPDATE_CART_ITEMS](state, payload) {
    state.cartItems = payload;
  },
};
const actions = {
  // 获取购物车商品
  getCartItems({ commit }) {
    axios.get('/api/cart').then((response) => {
      commit(UPDATE_CART_ITEMS, response.data);
    });
  },
  // 添加商品
  addCartItem({ commit }, cartItem) {
    axios.post('/api/cart', cartItem).then((response) => {
      commit(UPDATE_CART_ITEMS, response.data);
    });
  },
  // 移除商品
  removeCartItem({ commit }, cartItem) {
    axios.post('/api/cart/delete', cartItem).then((response) => {
      commit(UPDATE_CART_ITEMS, response.data);
    });
  },
  // 移除所有商品
  removeAllCartItems({ commit }) {
    axios.post('/api/cart/delete/all').then((response) => {
      commit(UPDATE_CART_ITEMS, response.data);
    });
  },
};
const getters = {
  cartItems: (state) => state.cartItems,
  cartTotal: (state) => {
    return state.cartItems
      .reduce((acc, cartItem) => {
        return cartItem.quantity * cartItem.price + acc;
      }, 0)
      .toFixed(2);
  },
  cartQuantity: (state) => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  },
};

const cartModule = {
  state,
  mutations,
  actions,
  getters,
};

export default cartModule;
