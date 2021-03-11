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

		this.emitter.on('cardVote', (args) => {
			const postId = args.postId;
			const postVotes = args.postVotes;
			var found = 0;
			for(var index=0;index<this.cards.length;index++){
				if( this.cards[index].id == postId ){
					found = 1;
					this.cards[index].votes = postVotes;
					if( index > 0 && this.cards[index].votes > this.cards[index-1].votes ){
						this.emitter.emit('cardRerender');
					}
					if( index < 3 && this.cards[index].votes < this.cards[index+1].votes ){
						this.emitter.emit('cardRerender');
					}
					return;
				}
			}
			if( found == 0 ){
				if( this.cards[3].votes < postVotes )
					this.emitter.emit('cardRerender');
			}
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