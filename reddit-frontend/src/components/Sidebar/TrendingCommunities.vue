<template>
<div>
	<div id="trendingCommunities">
		<div class="title">Trending Communities</div>
		<ol class="container">
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TrendingItem :item="item" :index="index" @follow="follow"></TrendingItem>
			</li>
		</ol>
	</div>
	
</div>
</template>

<script>
import TrendingItem from "./TrendingItem"

import axios from 'axios'

const url = 'http://localhost:8080/api/';

export default {
	name: 'TrendingCommunities',
	components: {
		TrendingItem,
		

	},
	data() {
		return {
			communities: null,
			showLoginModal: false,
			isAuthenticated: false
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
					.post(url+'community/follow/user/'+userId+'/community/'+communityId)
					console.log(response);
					this.communities[index].members++;
					alert("Joined Community Successfully!")
				}
				catch(e) {
					alert("User already exists in community");
				}
			}
			else {
				this.showLoginModalFunc()
			}
		},
		showLoginModalFunc(){
			this.emitter.emit("LoginModal")
		},
		toggleIsAuthenticated() {
            this.isAuthenticated = !(this.isAuthenticated);
        },


	}
}
</script>

<style scoped>
#trendingCommunities {
	background-color: white;
	color: #1a1a1b;
	fill: #1a1a1b;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: visible;
}
.list {
	padding: 12px 0 4px;
	height: 36px;
}
.list:first-child {
	padding-top: 0;
}
li {
	display: list-item;
}
ol {
	margin: 0;
	padding: 0;
	list-style: none;
}
.container {
	padding: 12px;
}
.title {
	font-size: 14px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 12px;
    border-radius: 3px 3px 0 0;
    display: flex;
    padding: 0 12px 12px;
	height: 30px;
	align-items: flex-end;
}
</style>
