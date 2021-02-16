<template>
	<div id="trendingItem">
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
		}
	}
}
</script>

<style>
#trendingItem {
    align-items: center;
    display: flex;
    height: 48px;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
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
	width: 170px;
}
.vertical {
	display: block;
	margin-left: 40px;
}
.small {
	line-height: 10px;
}
.join {
	background-color: #0079d3;
	color: #ffffff;
	fill: #ffffff;
	border: none;
    border-radius: 9999px;
    box-sizing: border-box;
	font-family: Noto Sans, Arial,sans-serif;
    font-size: 14px;
    height: 32px;
    padding: 0 16px;
    align-items: center;
    text-align: center;
}
</style>
