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
	async mounted() {
		const result = await axios
		.get("http://localhost:8080/api/content/sorted?count=4&sort=votes,desc");
		this.cards = result.data;

		this.emitter.on('cardVote', function(diff, postId) {
			console.log(diff, postId);
			// for(var index in this.cards){
			// 	console.log("LOOP",index,this.cards[index].id);
			// 	if( this.cards[index].id == postId ){
			// 		console.log("FOUND",index,postId,diff)
			// 		this.cards[index].votes += diff;
			// 		if( index > 0 && this.cards[index].votes > this.cards[index-1].votes ){
			// 			this.emitter.emit('cardRerender');
			// 		}
			// 		if( index < 3 && this.cards[index].votes < this.cards[index+1].votes ){
			// 			this.emitter.emit('cardRerender');
			// 		}
			// 	}
			// }
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