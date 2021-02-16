<template>
	<div id="cardItem">
		<div class="topmost">{{card.userName}}</div>
		<div class="middle">{{card.contentBody.substr(0,25)}}</div>
		<div class="bottom">r/{{card.communityName}} and more</div>
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
	height: 70px;
	text-align: left;
}

.topmost {
  color: white;
  padding: 0px;
  font-size: 20px;
  margin-top: 70px;
  margin-left: 10px;
  margin-bottom: 0px;
}

.middle {
  color: white;
  padding: 0px;
  font-size: 16px;
  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 0px;
}

.bottom {
  color: white;
  padding: 10px;
  font-size: 12px;
  margin-top: 0px;
  margin-left: 20px;
  margin-bottom: 0px;
}

</style>