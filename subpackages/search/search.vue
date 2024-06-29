<template>
	<view>
		<!--搜索框-->
		<view class="search-box">
			<uni-search-bar  @input="input" :radius="100" cancel-button="none"></uni-search-bar>
		</view>
		
		<!--搜索列表-->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view class="sugg-item" v-for="(item,i) in searchResuits" :key="i" @click="gotoDetail(item)">
				<view class="goods-name" >{{item.name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!--搜索历史-->
		<view class="history-box" v-else>
			<!--搜索标题-->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="19" @click="clean()"></uni-icons>
			</view>
			<!--搜索列表-->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				//搜索结果
				searchResults:[],
				//搜索历史记录
				historyList:[]
			};
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			//input输入事件函数
			input(e){				
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{					
					this.kw=e
					//console.log(this.kw)
					this.getSearchList()
				},2000)
			},
			 getSearchList(){
				//判断搜索关键词是否为空
				if(this.kw.length==0){
					this.searchResults=[]
					return 
				}
				//const{data:res}=await uni.$http.get('',{query:this.kw})
				//if(res.meta.status!==200) return uni.$showMsg()
				//this.searchResults=res.message
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpackages/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
		
			//保存搜索历史记录
			saveSearchHistory(){
				//this.historyList.push(this.kw)
				const set= new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				//将搜索历史记录永久保存
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//清空搜索历史记录
			clean(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			//点击搜索历史记录跳转到商品列表
			gotoGoodsList(){
				uni.navigateTo({
					url:'/subpackages/goods_list/goods_list?query='+this.kw
				})
			},
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		background-color: #C00000;
		position: sticky;
		top:0;
		z-index: 999;
		
	}
	.sugg-list{
		padding: 0px 5px;
		.sugg-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0px;
			border-bottom: 1px solid #efefef;
			.goods-name{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.history-box{
		padding: 0 5px;
		.history-list{
			display: flex;
			.uni-tag{
				margin-top: 10px;
				margin-right: 5px;
				margin-bottom: 10px;
				background-color: #efefef;
				color: #7d7d7d;
				font-size: 20px;
				border-radius: 20px;
				justify-content: center;
				align-items: center;
				
			}
		}
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 2px solid #efefef;
			margin-bottom: 15px; /* 增加的外边距 */
		}
	}
</style>
