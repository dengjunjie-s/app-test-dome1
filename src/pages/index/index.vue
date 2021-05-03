<template>
	<view class="body">
		<view class="top">
			<view class="top-address" size="mini" @click="selectRreion">
				{{address}}
			</view>
			<view class="top-search">
				<image src="../../static/shosuo.png" mode="" class="top-search-icon"></image>搜索你想要的美食
			</view>
			<view class="top-session">
				<view class="top-session-icon">
				
				</view>
			</view>
		</view>
		<swiper class="banner" autoplay='true' interval='2000'>
			<swiper-item class="banner-item">
				<image src="../../static/banner1.jpg" mode="aspectFit"></image>
			</swiper-item >
			<swiper-item class="banner-item">
				<image src="../../static/banner2.jpg" mode="aspectFit"></image>
			</swiper-item>
			<swiper-item class="banner-item">
				<image src="../../static/banner3.jpg" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="appMsg" >
			<view class="appMsg-all" v-for="item in appMsg">
				<view class="appMsg-all-img" :style="item.color">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="appMsg-all-text">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="recommended">
			<view class="recommended-title">
				<view class="recommended-title-1">每日推荐</view>
				<view class="recommended-title-screening"
				:class="{'recommended-title-screeningtrue': recommendedTitle.page4}"
				>
					<view 
					@click="recommendedChage('page1')"
					class="recommended-title-screening-1"
					:class="{'recommended-title-screening-1-1': recommendedTitle.page1}"
					>
						附近推荐<view></view>
					</view>
					<view 
					@click="recommendedChage('page2')"
					class="recommended-title-screening-1"
					:class="{'recommended-title-screening-1-1':recommendedTitle.page2}"
					>
						销量<view></view>
					</view>
					<view 
					@click="recommendedChage('page3')"
					class="recommended-title-screening-1"
					:class="{'recommended-title-screening-1-1':recommendedTitle.page3 }"
					>
						距离<view></view>
					</view>
					<view class="recommended-title-screening-2">
						筛选<view></view>
					</view>
				</view>
			</view>
			<view class="recommended-body" 
			v-for="(item,index) in recommendedInData" 
			:key="index" >
				<view class="recommended-body-left" 
				:style='{ "background-image":"url("+item.photo+")"}'>
				</view>
				<view class="recommended-body-right">
					<view class="recommended-body-right-top">
						{{item.name}}
					</view>
					<view class="recommended-body-right-middle">
						<view class="recommended-body-right-middle-1">
							{{item.score}}分　　　<span>月售{{item.month}}</span>
						</view>
						<view class="recommended-body-right-middle-2">
							<span>{{item.minutes}}分钟</span><span>{{item.meter}}m</span>
						</view>
					</view>
					<view class="recommended-body-right-buttom">
						起送￥{{item.price}} <span>配送{{item.transport}}</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: '',
				test:"",
				appMsg:[
					{
						id:1,
						img :'../../static/meishi.png',
						text:'美食',
						color:'background-image: linear-gradient(#fdb27b, #ff5d58);'
					},
					{
						id:2,
						img :'../../static/chaoshi.png',
						text:'超市',
						color:'background-image: linear-gradient(#7b8afd, #29a5fb);'
					},
					{
						id:3,
						img :'../../static/shuiguo.png',
						text:'水果',
						color:'background-image: linear-gradient(#7eea5a, #59cb38);'
					},
					{
						id:4,
						img :'../../static/yinpin.png',
						text:'饮品',
						color:'background-image: linear-gradient(#fece62, #fca615);'
					},
					{
						id:5,
						img :'../../static/yexiao.png',
						text:'夜宵',
						color:'background-image: linear-gradient(#bb89f8, #7d63fc);'
					},
					{
						id:6,
						img :'../../static/zaocan.png',
						text:'早餐',
						color:'background-image: linear-gradient(#f9d05e, #f8a919);'
					},
					{
						id:7,
						img :'../../static/tiandian.png',
						text:'甜点',
						color:'background-image: linear-gradient(#ff68b5, #fa468f);'
					},
					{
						id:8,
						img :'../../static/tese.png',
						text:'特色',
						color:'background-image: linear-gradient(#64f9db, #1bd9e5);'
					}
				],
				recommendedTitle:{
					page1:true,
					page2:false,
					page3:false,
					page4:false
				},
				recommendedInData:[]
			}
		},
		onLoad() {
			let that = this
			this.address = this.$store.state.indexCity
			uni.request({
				url:'http://mock-api.com/9KOMkBgk.mock/recommended',
				success(res){
					that.recommendedInData = res.data
				},
				fail(res) {
				}
			})
			uni.showModal({
				title: '请您确认当前位置~',
				cancelColor: '#888888',
				cancelText: '暂不',
				confirmText: '好的',
				success: (res) => {
					if(res.confirm) {
						uni.navigateTo({
							url: '../selectRegion/selectRegion'
						})
					}
				}
			})
			
		},
		onReachBottom() {
			console.log("success buttom")
			let that = this
			uni.showLoading({
				title:"加载中"
			})
			uni.request({
				url:'http://mock-api.com/9KOMkBgk.mock/recommended',
				success(res){
					that.recommendedInData = that.recommendedInData.concat(res.data)
					uni.hideLoading()
					console.log(res)
				},
				fail(res) {
					uni.hideLoading()
				}
			})
		},
		onShow() {
			uni.$on("indexCity",(e)=>{
				this.address = e.city
			})
		},
		methods: {
			recommendedChage(e){
				let item = this.recommendedTitle
				if( !item.e === true ){
					item.page1 = false
					item.page2 = false
					item.page3 = false
					item[e] = true
				}
			},
			selectRreion(){
				uni.navigateTo({
					url:"../selectRegion/selectRegion"
				})
			}
		},
		onPageScroll(a){
			if(a.scrollTop >= 518){
				this.recommendedTitle.page4 = true 
			}
			if(a.scrollTop <= 518){
				this.recommendedTitle.page4 = false
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.body {
		.top {
			padding: 60upx 30upx 0upx 30upx;
			background-color: #ff2d1d;
			height: 410upx;
			display: flex;
			justify-content: space-between;
			.top-address {
				padding: 5upx 25upx 5upx 5upx;
				border: 0;
				text-align: center;
				line-height: 60upx;
				border-radius: 30upx;
				height: 70upx;
				width: 120upx;
				color: #FFFFFF;
				background-color: rgba(255, 255, 255, 0.3);
				background-image: url(../../static/jiantou.png);
				background-size: 23upx 30upx;
				background-repeat: no-repeat;
				background-position: 85upx 19upx;
			}
			.top-search {
				color: #FFFFFF;
				text-align: center;
				background-color: rgba(255, 255, 255, 0.5);
				width: 400upx;
				height: 70upx;
				padding: 5upx 35upx 5upx 5upx;
				border: 0;
				line-height: 60upx;
				border-radius: 30upx;
				.top-search-icon {
					width: 30upx;
					height: 30upx;
				}
			}

			.top-session {
				padding: 5upx 5upx 5upx 5upx;
				width: 70upx;
				height: 70upx;
				background-color: #FFFFFF;
				background-color: rgba(255, 255, 255, 0.3);
				border-radius: 30upx;
				.top-session-icon {
					background-image: url(../../static/huihua.png);
					width: 60upx;
					height: 60upx;
					background-size: 50upx 50upx;
					background-position: center;
					background-repeat: no-repeat;
				}
			}
		}
		.banner{
			height: 382upx;
			width: 680upx;
			position: absolute;
			left: 35upx;
			top: 165upx;
			box-shadow: 2px 2px 5px #888888;
			.banner-item{
				image{
					width: 680upx;
					height: 389upx;
				}
			}
		}
		.appMsg{
			margin: 170upx 30upx 0upx 30upx;
			display: flex;
			justify-content: space-around;
			flex-wrap:wrap;
			.appMsg-all{
				margin: 0upx 30upx 30upx 30upx;
				width: 110upx;
				.appMsg-all-img{
					width: 110upx;
					height: 110upx;
					border-radius: 55upx;
					image{
						margin: 25upx;
						width: 60upx;
						height: 60upx;
					}
				}
				.appMsg-all-text{
					padding-top: 5upx;
					text-align: center;
					font-size: 10upx;
				}
			}
		}
		.recommended{
			background-color: #f2f2f2 ;
			.recommended-title{
				.recommended-title-1{	
					margin-left: 35rpx;
					font-size: 50upx;
					font-weight: bold;
					border-top: 20upx solid #f2f2f2;
					border-bottom: 20upx solid #f2f2f2;
				}
				.recommended-title-screeningtrue{
					position: fixed;
					top: 0rpx;
					right: 0;
					left: 0;
				}
				.recommended-title-screening{
					padding: 30rpx 30rpx 25rpx 30rpx;
					background-color: #fff;
					display: flex;
					justify-content: left;
					.recommended-title-screening-1{
						padding: 15upx 50upx 0 0;
						view{
							float: right;
							width: 0;
							height: 0;
							display: none;
							margin-top:10upx ;
							margin-left:10upx ;
							border-left: 10upx solid transparent;
							border-right: 10upx solid transparent;
							border-top: 15upx solid #000;
						}
					}
					.recommended-title-screening-1-1{
						font-weight: bold;
						view{
							display: inline;
						}
					}
					.recommended-title-screening-2{
						font-weight: bold;
						flex-basis:280rpx;
						padding-top: 20rpx;
						text-align: right;
						view{
							float: right;
							width: 0;
							height: 0;
							margin-top:10upx ;
							margin-left:10upx ;
							border-left: 10upx solid transparent;
							border-right: 10upx solid transparent;
							border-top: 15upx solid #000;
						}
					}
				}
			}
			.recommended-body{
				border-top: 20upx solid #f2f2f2;
				display: flex;
				border-radius: 30rpx;
				padding: 20rpx 35rpx;
				background-color: #fff;
				justify-content: space-between;
				.recommended-body-left{
					width: 140rpx;
					height: 140rpx;
					border-radius: 10rpx;
					background-color: #000;
					background-size: 100%;
					background-repeat: no-repeat;
				}
				.recommended-body-right{
					width: 500rpx;
					color: #909090;
					.recommended-body-right-top{
						font-size:35rpx;
						color: #000000;
						font-weight: bold;
					}
					.recommended-body-right-middle{
						display: flex;
						align-items:flex-end;
						justify-content: space-between;
						font-size:30rpx;
						margin: 10rpx 0; 
						color:#fca615 ;
						span{
							margin-left:30rpx ;
							color: #909090;
							font-size: 25rpx;
						}
					}
					.recommended-body-right-buttom{
						span{
							margin-left:30rpx ;
							color: #909090;
							font-size: 25rpx;
						}
					}
				}
			}
		}
		
	}
</style>
