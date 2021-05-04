<template>
	<view class="container">
		<view class="top">
			<view class="top-title" v-for="(item,index) in topTitle" @click="[changeTitle(index),getOrder()]">
				<view :class="{'top-title-inof':index === topStyle}">{{item}}</view>
			</view>
		</view>
		<view class="order-list"
		v-for="item in orderMsg">
			<view class="order-list-top">
				<view class="order-list-top-left">
					<image :src="item.picture"></image>
				</view>
				<view class="order-list-top-right">
					<view class="order-list-top-right-1">{{item.name}}</view>
					<view class="order-list-top-right-2">
						{{item.date}}<span>{{item.time}}</span>
					</view>
					<view class="order-list-top-right-3">
						{{item.firstGoods}}X{{item.number}}等{{item.GoodsNumber}}件商品
					</view>
				</view>
			</view>
			<view class="order-list-bottom">
				<view class="order-list-bottom-button">评价</view>
				<view class="order-list-bottom--button" v-if="item.effective">再来一单</view>
				<view class="order-list-bottom-button" v-else>已失效</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topTitle:['全部','待付款','待配送','待收货','评价'],
				topStyle:0,
				orderMsg:[]
			};
		},
		onLoad() {
			this.getOrder()
		},
		methods:{
			changeTitle(index){
				this.topStyle = index
			},
			getOrder(){
				uni.showLoading({
					title:'加载中'
				})
				let obj = this
				uni.request({
					url: 'http://mock-api.com/9KOMkBgk.mock/GetTheOrder',
					method: 'POST',
					data:{
						userid:35
					},
					success(res){
						uni.hideLoading()
						obj.orderMsg = res.data
					},
					fail(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.container{
	.top{
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		height: 77rpx;
		.top-title{
			padding: 0rpx 30rpx;
			line-height: 65rpx;
			color: #979797;
			.top-title-inof{
				color: #000;
				font-weight: 600;
				border-bottom: 6rpx solid #ff2d1d;
			}
		}
	}
	.order-list{
		margin-top: 20rpx;
		background-color: #fff;
		.order-list-top{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			.order-list-top-left{
				image{
					width: 150rpx;
					height: 150rpx;
				}
			}
			.order-list-top-right{
				width: 500rpx;
				.order-list-top-right-1{
					font-weight: bold;
					font-size: 40rpx;
					background-image: url(../../static/jiantou.png);
					background-repeat: no-repeat;
					background-size: 30rpx 30rpx;
					background-position: right center;
					margin-right: 20rpx;
				}
				.order-list-top-right-2{
					color: #979797;
					font-size: 20rpx;
					margin: 10rpx 0;
				}
				.order-list-top-right-3{
					font-weight: 520;
				}
			}
		}
		.order-list-bottom{
			border-top: 5rpx solid #f2f2f2;
			display: flex;
			padding: 15rpx 0;
			justify-content:flex-end;
			.order-list-bottom-button{
				border: 5rpx solid #6c6a6b;
				padding: 4rpx 15rpx;
				border-radius: 15rpx;
				margin-right:30rpx ;
			}
			.order-list-bottom--button{
				border: 5rpx solid #ff2d1d;
				background-color: #ff2d1d;
				padding: 4rpx 15rpx;
				color: #fff;
				border-radius: 15rpx;
				margin-right:30rpx ;
			}
		}
	}
}
</style>
