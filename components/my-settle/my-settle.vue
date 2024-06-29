<template>
  <view class="settle-box">
    <!-- 全选 -->
    <label class="radio">
      <radio color="#C00000" :checked="selectAll" @click="toggleSelectAll"></radio><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{ totalAmount }}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">
      结算（{{ selectedCount }}）
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "my-settle",
  computed: {
    ...mapState('m_cart', ['totalAmount', 'selectAll', 'cart']),
    selectedCount() {
      return this.cart.filter(item => item.goods1_state).length;
    }
  },
  methods: {
    ...mapMutations('m_cart', ['toggleSelectAll']),
  }
};
</script>

<style lang="scss">
.settle-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border: 1px solid #efefef;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 10px;
}
.radio {
  display: flex;
  align-items: center;
}
.amount-box {
  .amount {
    color: #C00000;
    font-weight: bold;
  }
}
.btn-settle {
  background-color: #C00000;
  height: 50px;
  color: white;
  line-height: 50px;
  padding: 0 10px;
  min-width: 100px;
  text-align: center;
}
</style>
