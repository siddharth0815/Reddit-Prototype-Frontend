<template>
	<div id="topItem">
		<span class="index"> {{index+1}} </span>
		<img alt="icon" :src="item.iconURL" class="icon">
		<span class="title"> r/{{item.title}} </span>
		<div class="small">
			<button @click="vote(index, true)">^</button>
			<div class="fixwidth">
				<span> {{item.votes}} </span>
			</div>
			<button @click="vote(index, false)">v</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'TopItem',
	props: ["item", "index"],
	methods: {
		vote(id, add) {
			this.$emit("vote", id, add);
		}
	}
}
</script>

<style scoped>
#topItem {
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
	margin-right: 12px;
}
.icon {
	background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 24px;
    box-sizing: border-box;
    flex: none;
    height: 32px;
    line-height: 32px;
    margin: 0 8px;
    width: 32px;
}
.title {
	display: flex;
	flex-direction: column;
	width: 170px;
	font-size: 14px;
	font-weight: 500;
	line-height: 16px;
}
.small {
	line-height: 16px;
	display: flex;
	font-size: 12px;
	font-weight: 400;
	padding-bottom: 4px;
}
.fixwidth {
	justify-content: center;
	text-align: center;
	width: 40px;
}
button{
	border-radius: 2px;
}
button:hover{
background-color: #D0D0D0;
}
</style>
