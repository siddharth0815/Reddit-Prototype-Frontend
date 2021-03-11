<template>
<div id="cardItem">
	<div class="topmost">{{card.userName}}</div>
	<div class="middle">{{card.contentBody.substr(0,25)}}</div>
	<div class="bottom">
		<img alt="icon" :src="card.communityIcon" class="icon">
		r/{{card.communityName}} and more
	</div>
</div>
</template>

<script>
export default {
	name: "CardItem",
	props: ["card"]
}
</script>
	
<style scoped>
#cardItem {
	border-radius: 10px 10px 10px 10px;
	text-align: left;
	color: white;
}
.topmost {
	font-weight: 800;
	font-size: 20px;
	margin-top: 90px;
	margin-left: 10px;
}
.middle {
	font-weight: 700;
	font-size: 16px;
	margin-left: 10px;
}
.bottom {
	font-weight: 600;
	font-size: 12px;
	margin-left: 10px;
	padding:0;
	justify-content: left;
	background-color: transparent ;
}
.icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
	border-radius: 100%;
	padding: 0;
}
</style>