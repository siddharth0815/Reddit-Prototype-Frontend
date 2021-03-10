<template>
<div class="flex-container">
	<div v-bind:key="card.id" v-for="card in cards" :style="bgImage(card.imageURL)">	
	      <CardItem v-bind:card="card"/>		
	</div>
</div>
</template>

<script>
import CardItem from './CardItem.vue';
import axios from "axios";

export default {
	name: "Cards",
	components: {
		CardItem
	},
	data(){
		return {
			cards: null
		}
	},
	mounted() {
		axios
		.get("http://localhost:8080/api/content/top?count=4")
		.then(response => {
			this.cards = response.data;
			console.log(response.data)
		 });
	},
	methods: {
		bgImage(image) {
			return 'background-image: url("' + image + '")';
		}
	}
}
</script>

<style scoped>
.flex-container {
	display: flex;
	justify-content: center;
	align-content: flex-start;
	height: 160px;
}
.flex-container > div {
	font-size: 30px;
	background-size: 240px 166px;
	border-radius: 5px;
	margin-left: 10px;
	background-repeat : no-repeat;
	flex: 0 0 8em;
	inline-size: 6.2em;
	object-fit: fill;
}
</style>