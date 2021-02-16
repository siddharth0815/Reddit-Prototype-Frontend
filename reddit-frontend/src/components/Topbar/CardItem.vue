<template>
	<div id="cardItem">
		<br/>
		<h1>{{card.userName}}</h1>
		<br/>
		<small>{{card.contentBody.substr(0,25)}}</small>
		<br/>
		<small>r/{{card.communityName}} and more</small>
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
	border-color: black;
	border-width: thin;
	border-style: solid;
	border-radius: 10px 10px 10px 10px;
}
p {
	color: white;
	line-height: 0em;
}
h1 {
	color: white;
	font-size: 20px;
	display: inline;
}
small {
	font-size: 18px;
	color: white;
}
</style>