<template>
	<view v-if="goods.name" class="goods-detail-container">
		<!--轮播图-->
		<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, i) in goods.image" :key="i">
				<image :src="item.src" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		
		<!--商品信息-->
		<view class="goods-box">
			<!--商品价格-->
			<view class="price"><text class="price2">¥{{goods.price}}</text>.00</view>
			
				<!--商品信息主体-->
			<view class="goods-body">
				<!--商品名字-->
				<view class="goods-name">{{goods.name}}</view>
				<!--收藏-->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		
		<!--商品图文数据-->
		<view class="image-box">
			<view class="text-image" v-for="(item,i) in goods.image" :key="i">
				<image :src="item.src" mode="widthFix"></image>
			</view>
		</view>
		
		<!--商品导航区域-->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex'

export default {
	computed: {
		...mapState('m_cart', []),
		...mapGetters('m_cart',['total'])
	},
	watch:{

		total:{
			handler(newVal){
				const findResult=this.options.find(x=>x.text=='购物车')
				if(findResult){
					findResult.info=newVal
				}
			},
			immediate:true
		}
	},
	data() {
		return {
			goods: {
				id: 1,
				name: '【脆甜多汁】红富士苹果',
				price: '100',
				image: [
					{ src: '/static/苹果2.png' },
					{ src: '/static/苹果3.jpg' }
				]
			},
			goods_info: {},
			options: [{
				icon: 'headphones',
				text: '客服'
			}, {
				icon: 'shop',
				text: '店铺',
			}, {
				icon: 'cart',
				text: '购物车',
				info: 0
			}],
			buttonGroup: [{
				text: '加入购物车',
				backgroundColor: '#ff0000',
				color: '#fff'
			}, {
				text: '立即购买',
				backgroundColor: '#ffa200',
				color: '#fff'
			}]
		}
	},
	onLoad(options) {
		const goods_id = options.goods_id
		this.getGoodsDetail(goods_id)
	},
	methods: {
		...mapMutations('m_cart',['addToCart']),
		getGoodsDetail(goods_id) {
			// 模拟获取商品详情数据
			// 实际情况中，你需要调用后端API
		},
		preview(i) {
			uni.previewImage({
				current: this.goods.image[i].src,
				urls: this.goods.image.map(item => item.src)
			})
		},
		onClick(e) {
			if (e.content.text === '购物车') {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			}
		},
		buttonClick(e) {
			if(e.content.text=='加入购物车'){
				//组织商品信息对象
				const goods1={
					goods1_id:this.goods.id,
					goods1_name:this.goods.name,
					goods1_price:this.goods.price,
					goods1_count:1,
					goods1_image:this.goods.image[0],
					goods1_state:true
				}
				//调用addTocart
				this.addToCart(goods1)
			}
			
		}
	}
}
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-box {
	padding: 10px;
	padding-right: 0;
	.price {
		color: #C00000;
		margin: 10px 0;
		.price2 {
			font-size: 25px;
		}
	}
	.goods-body {
		display: flex;
		justify-content: space-between;
		.goods-name {
			margin-right: 10px;
			border-bottom: 1px solid #efefef;
		}
		.favi {
			width: 80px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color: gray;
			border-bottom: 1px solid #efefef;
		}
	}
	.yf {
		color: gray;
		margin: 10px 0;
	}
}
.image-box {
	width: 100%;
}
.text-image {
	width: 100%;
	image {
		width: 100%;
		display: block;
	}
}
.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.goods-detail-container {
	padding-bottom: 50px;
}
</style>
 