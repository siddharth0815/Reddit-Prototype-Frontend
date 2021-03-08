<template>
	<div id="trendingItem" style="padding-top: {{getpadding(index)}}px">
		<div class="icon-container">
			<img alt="Subreddit icon" :src="item.iconURL" class="icon">
		</div>
		<div class="vertical">
			<span class="title"> r/{{ item.title }} </span>
			<span class="small"> {{item.members}} members </span>
		</div>
		<button class="join" @click="join(item.id, index)">Join</button>
	</div>
</template>

<script>
export default {
	name: 'TrendingItem',
	props: ["item", "index"],
	methods: {
		join(id, index) {
			this.$emit("follow", localStorage.userId, id, index);
		},
		getpadding(index) {
			return ( index == 0 ? 0 : 12 );
		}
	}
}
</script>

<style scoped>
#trendingItem {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
}
.trending-container {
	display: flex;
	flex-direction: row;
}
.index {
	color: #1c1c1c;
    text-align: right;
    width: 20px;
    margin-right: 20px;
}
.title {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	font-weight: 500;
	line-height: 16px;
}
.title:hover{
	text-decoration: underline;
}
.icon {
	border-radius: 100%;
    height: 32px;
    width: 32px;
}
.icon-container {
	height: 32px;
    width: 32px;
    margin-right: 10px;
}
.vertical {
	display: block;
	width: 144px;
}
.small {
	line-height: 16px;
	display: flex;
	font-size: 12px;
	font-weight: 400;
	padding-bottom: 4px;
}
.join {
	font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    padding: 4px 16px;

	background-color: #0079d3;
	color: #ffffff;
	fill: #ffffff;
	border: none;
    border-radius: 9999px;
    box-sizing: border-box;
    height: 36px;
	width: 106px;
    align-items: center;
    text-align: center;
}
</style>
