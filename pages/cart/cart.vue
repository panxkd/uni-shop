<template>
  <view class="cart-box">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 商品列表区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧文本 -->
      <text class="cart-title-text">购物车</text>
      <!-- 管理按钮 -->
      <view class="manage-button">
        <button @click="toggleManage" class="manage-button">{{ isManaging ? '完成' : '管理' }}</button>
      </view>
    </view>

    <!-- 判断购物车是否为空 -->
    <view v-if="groupedCart.length === 0" class="empty-cart">
      <image src="/static/空空如也.png"></image>
      <text>暂无商品</text>
    </view>

    <!-- 循环渲染商品购物信息 -->
    <block v-else v-for="(goods, i) in groupedCart" :key="i">
      <view class="goods-item">
        <view class="goods-image">
          <radio :value="goods.goods1_state" :checked="goods.goods1_state" color="#C00000" @click="toggleRadio(goods)"></radio>
          <image :src="goods.goods1_image.src" class="image"></image>
        </view>
        <view class="goods-info">
          <text class="goods-name">{{ goods.goods1_name }}</text>
          <view class="goods-price-num">
            <text class="goods-price">价格: ￥{{ goods.goods1_price }}</text>
            <view v-if="isManaging">
              <button @click="removeItem(goods)" class="deletegoods">删除</button>
            </view>
            <view v-else>
              <uni-number-box :min="1" :value="goods.goods1_count" @change="changeQuantity(goods, $event)"></uni-number-box>
            </view>
          </view>
        </view>
      </view>
    </block>
    
    <!-- 自定义结算组件 -->
    <my-settle></my-settle>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [badgeMix],
  data() {
    return {
      isManaging: false // 状态到跟踪管理模式
    };
  },
  computed: {
    ...mapState('m_cart', ['cart', 'totalAmount', 'selectAll']),
    groupedCart() {
      const grouped = {};
      this.cart.forEach(item => {
        if (grouped[item.goods1_id]) {
          grouped[item.goods1_count] += item.goods1_count;
        } else {
          grouped[item.goods1_id] = { ...item, goods1_count: item.goods1_count };
        }
      });
      return Object.values(grouped);
    }
  },
  methods: {
    ...mapMutations('m_cart', ['toggleSelectAll', 'calculateTotal', 'toggleGoodsState', 'removeFromCart', 'updateCartQuantity']),
    toggleRadio(goods) {
      goods.goods1_state = !goods.goods1_state;
      this.toggleGoodsState(goods.goods1_id);
      this.calculateTotal();
    },
    changeQuantity(goods, newQuantity) {
      this.updateCartQuantity({ goods1_id: goods.goods1_id, quantity: newQuantity });
      this.calculateTotal();
    },
    removeItem(goods) {
      this.removeFromCart(goods.goods1_id);
      this.calculateTotal();
    },
    toggleManage() {
      this.isManaging = !this.isManaging;
    }
  },
  onShow() {
    this.calculateTotal();
  }
};
</script>

<style lang="scss">
.cart-box {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  justify-content: space-between; 
}

.cart-title-text {
  font-size: 14px;
  margin-left: 7px;
}

.manage-button {
  display: flex;
  margin-left: auto;
  margin-right: 10px;
  font-size: 14px;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
}

.goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #efefef;
}

.goods-image {
  width: 120px;
  height: 80px;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
  height: 100%;
}

.goods-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.goods-name {
  font-size: 14px;
  margin-bottom: 10px;
}

.goods-price {
  font-size: 12px;
  color: #C00000;
}

.goods-price-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deletegoods {
  display: flex;
  margin-right: auto;
  font-size: 15px;
  color: #C00000;
  background: none;
  border: none;
  cursor: pointer;
}

.empty-cart {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 20px;
  font-size: 16px;
  color: #888;
}

.empty-cart image {
  width: 30px;
  height: 30px;
}
</style>
