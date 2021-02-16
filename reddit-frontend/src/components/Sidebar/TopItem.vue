<template>
	<div id="topItem">
		<span class="index"> {{index+1}} </span>
		<span class="title"> r/{{item.title}} </span>
		<div class="small">
			<button @click="upvote(index)">^</button>
			<div class="fixwidth">
				<span> {{item.upvotes}} </span>
			</div>
			<button @click="downvote(index)">v</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'TopItem',
	props: ["item", "index"],
	methods: {
		upvote(id) {
			this.$emit("upvote",id);
		},
		downvote(id) {
			this.$emit("downvote",id);
		}
	}
}
</script>

<style>
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
}
.title {
	display: flex;
	flex-direction: column;
	width: 170px;
}
.small {
	display: flex;
	font-size: 10px;
}
.fixwidth {
	justify-content: center;
	text-align: center;
	width: 40px;
}
.icon-upvote {
	content: "\f13d";
}
</style>
