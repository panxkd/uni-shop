const state = () => ({
  cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  total: 0,
  selectAll: false, // 新增：全选状态
  totalAmount: 0 // 新增：总金额
});

const getters = {
  total(state) {
    return state.cart.reduce((acc, item) => acc + item.goods1_count, 0);
  }
};

const mutations = {
  addToCart(state, goods1) {
    const findResult = state.cart.find(x => x.goods1_id == goods1.goods1_id);
    if (!findResult) {
      state.cart.push({ ...goods1, goods1_state: false });
    } else {
      findResult.goods1_count++;
    }
    this.commit('m_cart/updateTotal');
    this.commit('m_cart/saveToStorage');
  },
  saveToStorage(state) {
    uni.setStorageSync('cart', JSON.stringify(state.cart));
  },
  updateCartQuantity(state, { goods1_id, quantity }) {
    const item = state.cart.find(x => x.goods1_id == goods1_id);
    if (item) {
      item.goods1_count = quantity;
      this.commit('m_cart/updateTotal');
      this.commit('m_cart/calculateTotal'); // 计算总金额
      this.commit('m_cart/saveToStorage');
    }
  },
  updateTotal(state) {
    state.total = state.cart.reduce((acc, item) => acc + item.goods1_count, 0);
  },
  toggleGoodsState(state, goods1_id) {
    const item = state.cart.find(x => x.goods1_id == goods1_id);
    if (item) {
      item.goods1_state = !item.goods1_state;
      this.commit('m_cart/calculateTotal'); // 计算总金额
      this.commit('m_cart/saveToStorage');
    }
  },
  removeFromCart(state, goods1_id) {
    state.cart = state.cart.filter(item => item.goods1_id !== goods1_id);
    this.commit('m_cart/updateTotal');
    this.commit('m_cart/calculateTotal'); // 计算总金额
    this.commit('m_cart/saveToStorage');
  },
  toggleSelectAll(state) {
    state.selectAll = !state.selectAll;
    state.cart.forEach(item => {
      item.goods1_state = state.selectAll;
    });
    this.commit('m_cart/calculateTotal'); // 计算总金额
    this.commit('m_cart/saveToStorage');
  },
  calculateTotal(state) {
    state.totalAmount = state.cart.reduce((total, item) => {
      return item.goods1_state ? total + item.goods1_price * item.goods1_count : total;
    }, 0);
  }
};

const actions = {
  // 其他 actions
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
