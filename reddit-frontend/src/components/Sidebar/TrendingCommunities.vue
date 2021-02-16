<template>
	<div id="trendingCommunities">
		<ol>
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TrendingItem :item="item" :index="index" @follow="follow"></TrendingItem>
			</li>
		</ol>
	</div>
</template>

<script>
import TrendingItem from "./TrendingItem"
import axios from 'axios'

const url = 'http://localhost:8080/api/';

export default {
	name: 'TrendingCommunities',
	components: {
		TrendingItem
	},
	data() {
		return {
			communities: null
		}
	},
	mounted() {
		axios
		.get(url+'community/trending?count=5')
		.then( response => (this.communities = response.data) );
	},
	methods: {
		async follow(userId, communityId, index) {
			if( localStorage.isAuthenticated === "true" ) {
				try {
					const response = await axios
					.post(url+'community/follow/'+userId+'/'+communityId)
					console.log(response);
					this.communities[index].members++;
				}
				catch(e) {
					alert("User already exists in community");
				}
			}
			else {
				alert("Please SignIn");
			}
		}
	}
}
</script>

<style>
#trendingCommunities {
	background-color: white;
	color: #1a1a1b;
	fill: #1a1a1b;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: visible;
}
.nolinebreak {
	display: flex;
}
.list {
	border-bottom: thin solid #edeff1;
}
</style>
