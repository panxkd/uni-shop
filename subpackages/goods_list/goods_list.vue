<template>
  <view id="app">
    <view class="container">
      <view class="column" v-for="(column, index) in productColumns" :key="index">
        <view class="product-box" v-for="product in column" :key="product.id" @click="gotoDetail(product)">
          <img :src="product.image" class="product-img" :alt="product.name">
          <view class="product-name">{{ product.name }}</view>
          <view class="product-price">¥{{ product.price }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //请求参数对象
      queryObj: {
        query: '', //搜索关键词
        goods_id: '', //商品id
        pagenum: 1, //第一页
        pagesize: 20 //每一页数量
      },
      products: [
        { id: 1, name: '商品1', price: '100', image: '/static/苹果.webp' },
        { id: 2, name: '商品2', price: '200', image: '/static/苹果.webp' },
        { id: 3, name: '商品3', price: '300', image: '/static/苹果.webp' },
        { id: 4, name: '商品4', price: '400', image: '/static/苹果.webp' },
        { id: 5, name: '商品5', price: '500', image: '/static/苹果.webp' }
      ],
      total: 0
    };
  },
  onLoad(options) {
    this.queryObj.query = options.goods_type || '';
    this.queryObj.goods_id = options.goods_id || '';
    this.getProducts();
  },
  methods: {
    //获取商品列表数据
    async getProducts(cb) {
      // const { data: res } = await uni.$http.get('', this.queryObj);
      // if (res.meta.status !== 200) return uni.$showMsg();
      // this.products = [...this.products, ...res.message.goods];
      // 示例数据
      const newProducts = [];
      this.products = [...this.products, ...newProducts];
      if (cb) cb();
    },
	gotoDetail(products){
		uni.navigateTo({
			url:'/subpackages/goods_detail/goods_detail?goods_id='+products.id
		})
	},
  },
  onReachBottom() {
    //让页码值自增加一
    this.queryObj.pagenum++;
    this.getProducts();
  },
  onPullDownRefresh() {
    //重置关键数据
    this.queryObj.pagenum = 1;
    this.total = 0;
    //this.isloading=false,
    this.products = [];
    //重新发起数据请求
    this.getProducts(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 1000); // 延迟1秒后停止下拉刷新
    });
  },
  computed: {
    productColumns() {
      // 将商品分成两列
      const columns = [[], []];
      this.products.forEach((product, index) => {
        columns[index % 2].push(product);
      });
      return columns;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 0;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  padding: 5px;
  border: 0px solid #ccc;
  border-radius: 10px;
  margin: 5px; /* 减小间距 */
}

.product-box {
  display: flex;
  flex-direction: column;
  
  padding: 0; /* 移除内边距 */
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  max-width: 100%; /* 调整为百分比，确保不超出屏幕 */
}

.product-box img {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0; /* 确保图片和盒子边角对齐 */
  margin: 0; /* 移除图片的外边距 */
}

.product-name {
  margin-top: 0; /* 确保没有间距 */
  font-size: 16px;
  font-weight: bold;
  padding: 10px 10px; /* 增加适当的内边距以分隔内容 */
}

.product-price {
  margin-top: 0; /* 确保没有间距 */
  font-size: 14px;
  color: #f00;
  padding: 0px 10px; /* 增加适当的内边距以分隔内容 */
  padding-bottom: 10px; /* 增加适当的内边距以分隔内容 */
}

.product-img {
  border-radius: 10px 10px 0 0;
  width: 100%; /* 设定为百分比，确保不超出屏幕 */
  height: 400rpx;
}
</style>
