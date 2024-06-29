// store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import address from '@/store/address.js'; // 引入 address 模块
import m_cart from '@/store/m_cart'; // 引入 m_cart 模块
import customStorage from '@/store/customStorage'; // 引入自定义存储插件

const store = createStore({
  modules: {
    address,
    m_cart
  },
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['address'], // 只持久化 address 模块
      storage: {
        getItem: key => customStorage.getItem(key),
        setItem: (key, value) => customStorage.setItem(key, value),
        removeItem: key => customStorage.removeItem(key)
      }
    })
  ]
});

export default store;
