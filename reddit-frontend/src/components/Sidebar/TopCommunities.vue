<template>
	<div id="topCommunities">
		<div class="header">
			<h2 class="banner"> Top Communities </h2>
		</div>
		<ol>
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TopItem :item="item" :index="index" @upvote="upvote" @downvote="downvote"></TopItem>
			</li>
		</ol>
	</div>
</template>

<script>
import TopItem from "./TopItem"
import axios from 'axios'

export default {
	name: 'TopCommunities',
	components: {
		TopItem
	},
	data() {
		return {
			communities: null
		}
	},
	mounted() {
		axios
		.get('http://localhost:8080/api/community/top?count=5')
		.then( response => (this.communities = response.data) )
	},
	methods: {
		async upvote(index) {
			if( localStorage.isAuthenticated === "true" ) {
				await axios
				.post('http://localhost:8080/api/community/upvote/'+this.communities[index].id)
				.then(response => (console.log(response)));
				this.communities[index].upvotes++;
				if( index != 0 && this.communities[index].upvotes > this.communities[index-1].upvotes )
					this.$emit("forceRerender");
			}
			else {
				alert("Please SignIn");
			}
		},
		async downvote(index) {
			if( localStorage.isAuthenticated === "true" ) {
				await axios
				.post('http://localhost:8080/api/community/downvote/'+this.communities[index].id)
				.then(response => (console.log(response)));
				this.communities[index].downvotes++;
			}
			else {
				alert("Please SignIn");
			}
		}
	}
}
</script>

<style>
#topCommunities {
	background-color: white;
	color: #1a1a1b;
	fill: #1a1a1b;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: visible;
	justify-content: center;
	margin-bottom: 50px;
}
.list {
	border-bottom: thin solid #edeff1;
}
.header {
	background-color: #0079d3;
    background-position: 50%;
    background-repeat: no-repeat;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 80px;
    position: relative;
}
.banner {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    bottom: 8px;
    color: #fff;
    left: 16px;
    position: absolute;
    vertical-align: baseline;
    margin: 0;
    padding: 0;
    border: 0;
    line-height: 20px;
}
</style>