<template>
	<view class="container">
		<scroll-view scroll-y class="left-list">
			<view
			v-for="(item, index) in leftList"
			:key="item.lid"
			:class="['left-item',{'left--item': index == currentIndex}]"
			:data-index="item.lid"
			@click="selectCity">
			{{item.value}}
			</view>
		</scroll-view>
		<view class="right-list" v-if="currentIndex === 0">
			<text class="title">当前定位</text>
			<text class="title-gps" :data-city='gpsCity' @click="comfirmCity">
				<image class="title-gps-img" src="../../static/positioning.png" mode="scaleToFill"/>
				{{gpsCity}}
			</text>
			<text class="title-city">热门城市</text>
			<view
			class="right-item"
			v-for="el in dynamicRightLest"
			:key="el.rid"
			:data-city="el.value"
			@click="comfirmCity">
				{{el.value}}
			</view>
			
		</view>
		<view class="right-list" v-else>
			<view
			class="right-item"
			v-for="el in dynamicRightLest"
			:key="el.rid"
			:data-city="el.value"
			@click="comfirmCity">
				{{el.value}}
			</view>
		</view>
	</view>
</template>

<script>
	import regions from './region.js'
	export default{
		data(){
			return{
				leftList:[],
				currentIndex:0,
				rightLast:[],
				gpsCity:'定位中'
			}
		},
		onLoad(){
			this.comfirmCity('onload')
		},
		methods:{
			selectCity(e){
				this.currentIndex = e.target.dataset.index
			},
			comfirmCity(e){
				console.log(e)
				if(e === 'onload' || e.target.dataset.city === '定位中'){
					uni.showLoading({
						title:'正在定位中',
						success(){
							setTimeout(function () {
							    uni.hideLoading();
							}, 1000);
						}
					})
					uni.getLocation({
						geocode:true,
						success: (res) => {
							this.gpsCity = res.address.city.replace(/(市|自治州|特别行政区|地区|盟|区)/g, '')
						},
						fail:(res) => {
							uni.showLoading({title:'定位失败'})
							setTimeout(function () {
							    uni.hideLoading();
							}, 1000);
						}
					});
				}else{
					this.$store.commit('changeIndexCity',e.target.dataset.city)
					uni.$emit("indexCity",{ city:e.target.dataset.city })
					uni.navigateBack({
						delta:1
					})
				}
			}
		},
		computed:{
			dynamicRightLest(){
				this.rightLast = []
				this.leftList[this.currentIndex].children.map((el,i)=>{
					if(el.value.indexOf('族') === -1){
						this.rightLast.push({rid:i,value:el.value.replace(/(市|自治州|特别行政区|地区|盟|区)/g, '')})
					}
				})
				return this.rightLast
			}
		},
		created() {
			let arrs = regions[0].children
			arrs.map((item, index) => {
				this.leftList.push(
					{
						lid: index, 
						value: item.value.replace(/(省|自治区|特别行政区|回族|壮族|维吾尔)/g, ''), 
						children: item.children,
					}
				)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		justify-content: space-between;
		.left-list{
			background-color: #f6f8f9;
			height: 100vh;
			width: 160rpx;
			.left-item{
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}
			.left--item{
				font-weight: 500;
				border-right: #ff2d1d solid 5rpx;
			}
		}
		.right-list{
			width: 590rpx;
			padding: 30rpx 0rpx 0rpx 30rpx;
			.title{
				font-size: 30rpx;
				line-height: 80rpx;
				display: block;
			}
			.title-gps{
				float: left;
				padding: 15rpx 30rpx;
				border: 1rpx solid #dfe3e6;
				.title-gps-img{
					width: 30rpx;
					height: 30rpx;
					margin-right: 5rpx;
				}
			}
			.title-city{
				font-size: 30rpx;
				line-height: 80rpx;
				display: block;
				margin-top: 200rpx;
			}
			.right-item{
				float: left;
				margin: 10rpx 0 ;
				margin-right: 25rpx;
				padding: 15rpx 50rpx;
				border: 1rpx solid #dfe3e6;
			}
		}
	}
</style>
