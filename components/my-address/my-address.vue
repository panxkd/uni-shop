<template>
  <view>
    <!-- 收货地址 -->
    <view class="address" v-if="!selectedAddress || Object.keys(selectedAddress).length === 0">
      <button type="primary" size="mini" class="btnChoose" @click="chooseAddress()">选择收货地址</button>
    </view>  
    <!-- 收货信息 -->
    <view class="address-info" v-else>
      <view class="row">
        <view class="label">收货人：</view>
        <view class="info">{{ selectedAddress.name }}</view>
        <uni-icons class="icon" type="arrowright" size="16" @click="chooseAddress()"></uni-icons>
      </view>
      <view class="row">
        <view class="label">电话号码：</view>
        <view class="info">{{ selectedAddress.phone }}</view>
      </view>
      <view class="row">
        <view class="label">地址：</view>
        <view class="info">{{ selectedAddress.city }}{{ selectedAddress.address }}</view>
      </view>
    </view>
    <image src="/static/虚线.png" class="divider"></image>
  </view>
</template>

<script>
export default {
  name: "my-address",
  computed: {
    selectedAddress() {
      return this.$store.state.address.selectedAddress;
    }
  },
  methods: {
    chooseAddress() {
      uni.navigateTo({
        url: '/subpackages/address/address'
      });
    },
  },
};
</script>

<style lang="scss">
.address {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  .btnChoose {
    background-color: #C00000;
  }
}

.address-info {
  font-size: 12px;
  padding: 0 10px;
  margin: 10px 0;

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .label {
    width: 60px; /* 固定标签宽度 */
    text-align: left; /* 标签左对齐 */
    margin-right: 5px; /* 添加右边距 */
  }

  .info {
    flex: 1;
    word-break: break-word;
  }

  .icon {
    margin-left: 10px; /* 确保图标不靠近文字 */
  }
}

.divider {
  display: block;
  width: 100%;
  height: 5px;
}
</style>
