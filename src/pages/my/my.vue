<template>
	<view class="container">
		<view class="top">
			<view>我的</view>
		</view>
		<view class="userMsg">
			<view class="userMsg-img">
				<image src="../../static/egg.jpg" class="userMsg--img"></image>
			</view>
			<view class="userMsg-name">梦中人</view>
			<view class="userMsg-phone">13690124814</view>
		</view>
		<view class="top-title">
			<view class="top-title-1">
				<image src="../../static/shoucang.png"></image>
				<view class>收藏</view>
			</view>
			<view class="top-title-1">
				<image src="../../static/pinglun.png"></image>
				<view class>评论</view>
			</view>
			<view class="top-title-1">
				<image src="../../static/liulan.png"></image>
				<view class>浏览</view>
			</view>
		</view>
		<view class="bottom"
		style="background-image: url(../../static/shouhuo.png);">
			<view class="bottom-msg">收货地址</view>
		</view>
		<view class="bottom"
		style="background-image: url(../../static/shangjiashoucang.png);">
			<view class="bottom-msg">收藏商家</view>
		</view>
		<view class="bottom"
		style="background-image: url(../../static/youhui.png);">
			<view class="bottom-msg">优惠卷</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	.container{
		.top{
			display: flex;
			color: #fff;
			font-size: 35rpx;
			justify-content: center;
			background-color: #ff2d1d;
			padding-top: 50rpx;
			height: 300rpx;
		}
		.userMsg{
			background-color: #fff;
			text-align: center;
			font-weight: 550;
			.userMsg-img{
				display: flex;
				justify-content: center;
				align-items:Center;
				.userMsg--img{
					width: 150rpx;
					height: 150rpx;
					border-radius: 75rpx;
					position: absolute;
					top: 210rpx;
					border: 7rpx solid #fff;
				}
			}	
			.userMsg-name{
				padding-top: 80rpx;
			}
			.userMsg-phone{
				color: #979797;
			}
		}
		.top-title{
			border-bottom: 20rpx solid #f2f2f2;
			padding-top:100rpx ;
			padding-bottom:40rpx ;
			background-color: #fff;
			display: flex;
			justify-content: space-around;
			.top-title-1{
				text-align: center;
				image{
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
		.bottom{
			font-size: 35rpx;
			background-color: #fff;
			background-repeat: no-repeat;
			background-size: 50rpx 50rpx;
			background-position: 30rpx center;
			padding: 30rpx 0rpx;
			margin-bottom: 7rpx;
			.bottom-msg{
				margin-left:90rpx;
				margin-right: 50rpx;
				background-image: url(../../static/jiantou.png);
				background-repeat: no-repeat;
				background-size: 30rpx 30rpx;
				background-position: right center;
			}
		}
	}
</style>
