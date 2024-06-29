<template>
	<view>
		<!--搜索组件-->
		<view class="search-box">
			<mysearch @click="gotosearch()"></mysearch>
		</view>
		
		<!--轮播图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<view class="swiper-item">
					<image :src="item.src" class="swiper-img"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<!--分类导航-->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.src" class="nav-img"></image>
				<text class="nav-text">{{item.name}}</text>
			</view>
		</view>
		
		<!--楼层-->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!--楼层标题-->
				<view class="floor-title-box">
					<text class="floor-title">{{item.floor_title}}</text>
					
				</view>
				
				<!--楼层图片-->
				<view class="floor-img-box">
					<!--楼层左侧-->
					<navigator class="left-img-box" :url="'/subpackages/goods_list/goods_list?goods_type'+item.product_list[0].name">
						<image :src="item.product_list[0].src" class="left-img"></image>
					</navigator>
					
					<!--楼层右侧-->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list.slice(1)" :key="i2" >
							<image :src="item2.src" class="right-img" ></image>
						</navigator>
					</view>
				</view>
			</view>			
		</view>
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				//轮播图数据列表
				swiperList:[
					      {src:'/static/水稻.webp'},
					      {src:'/static/甘蔗.webp'},
					      {src:'/static/苹果.webp'}
				],
				//分类导航数据列表
				navList:[
					{src:'/static/水果苹果.png',name:'水果'},
					{src:'/static/肉.png',name:'肉'},
					{src:'/static/鱼.png',name:'水产品'},
					{src:'/static/水稻.png',name:'农作物'}
				],
				//楼层数据列表
				floorList:[
					{
						floor_title:'水果',
						product_list:[
							{src:'/static/苹果1.jpg',name:'苹果'},
							{src:'/static/苹果.webp',name:'苹果'},
							{src:'/static/苹果.webp',name:'苹果'},
							{src:'/static/苹果.webp',name:'苹果'},
							{src:'/static/苹果.webp',name:'苹果'}]
					},
					{
						floor_title:'肉类',
						product_list:[{},{},{}]
					},
					{
						floor_title:'水产',
						product_list:[{},{},{}]
					},
					{
						floor_title:'农作物',
						product_list:[{},{},{}]
					}

				],
				
			};
		},
		onLoad(){
			//调用方法获取轮播图数据
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				//const {data:res}=await uni.$http.get('')
				//请求失败
				//if(res.meta.status!==200) return uni.$showMsg()
				//this.swiperList=res.message
				//uni.$showMsg('数据请求成功')
			},
			async getNavList(){
				//const {data:res}=await uni.$http.get('')
				//if(res.meta.status!==200) return uni.$showMsg()
				//this.navList=res.massage
			},
			navClickHandler(item){
				if(item.name=='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},

			async getFloorList(){
				//const {data:res}=await uni.$http.get('')
				//if(res.meta.status!==200) return uni.$showMsg()
				//this.floorList=res.massage
			},
			gotosearch(){
				uni.navigateTo({
					url:'/subpackages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 430rpx;
		.swiper-item,
		.swiper-img{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	  margin: 15px 10rpx;
	  border: 1px solid #efefef;
	  border-radius: 30rpx;
	  text-shadow: 0rpx 0rpx 5rpx #fff;
	  box-shadow: 1rpx 1rpx 6rpx #aaaaaa;
	  .nav-item {
	    display: flex;
	    flex-direction: column;
	    padding: 10rpx; /* 适当增加内边距，使其在布局中有适当的间距 */
	  }
	  
	  .nav-img {
	    width: 60rpx;
	    height: 60rpx;
	    margin-bottom: 5rpx; /* 调整图标与文字的距离 */
	  }
	  
	  .nav-text {
	    text-align: center;
	    font-size: 14px; /* 根据需要调整字体大小 */
	    margin-top: 0; /* 确保文字与图标的间距不受其他因素影响 */
		color: gray;
	  }
	}


.floor-title-box{
	height: 50rpx;
	width: 700rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 1rpx 1rpx 6rpx #aaaaaa;
	border-radius: 30rpx;
	margin: 20rpx 27rpx;
	.floor-title{
		  display: flex;
		  justify-content: center; /* 水平居中 */
		text-align: center;
		color: gray;
	}

}

	image{
		border-radius: 10rpx;
	}
	.left-img{
		height: 410rpx;
		width: 233rpx;
	}
	.right-img{
		width: 240rpx;
		height: 200rpx;
	}
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
		
	}
	.search-box{
		position: sticky;
		top:0;
		z-index: 999;
	}

</style>
