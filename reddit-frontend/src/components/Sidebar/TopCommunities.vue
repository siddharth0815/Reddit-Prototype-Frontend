<template>
<div>
	<div id="topCommunities">
		<div class="header">
			<h2 class="banner"> Top Communities </h2>
		</div>
		<ol>
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TopItem :item="item" :index="index" @vote="vote"></TopItem>
			</li>
		</ol>
	</div>
	</div>
</template>

<script>
import TopItem from "./TopItem"
import axios from 'axios'


export default {
	name: 'TopCommunities',
	components: {
		TopItem,
	},
	data() {
		return {
			communities: null,
			showLoginModal: false,
			isAuthenticated: false,
		}
	},
	mounted() {
		axios
		.get('http://localhost:8080/api/community/sorted?count=5&sort=votes,desc')
		.then( response => (this.communities = response.data) )
	},
	methods: {
		async vote(index, add) {
			if( localStorage.isAuthenticated === "true" ) {
				await axios
				.post('http://localhost:8080/api/community/vote/user/'+localStorage.userId+'/community/'+this.communities[index].id+'?add='+add)
				.then(response => (console.log(response)));
				if( add ) {
					this.communities[index].votes++;
					if( index != 0 && this.communities[index].votes > this.communities[index-1].votes )
						this.$emit("forceRerender");
				}
				else {
					this.communities[index].votes--;
					if( index != 4 && this.communities[index].votes < this.communities[index+1].votes )
						this.$emit("forceRerender");
				}
			}
			else {
				this.showLoginModalFunc()
			}
		},
		showLoginModalFunc() {
			this.emitter.emit("LoginModal")
		},
		toggleIsAuthenticated() {
            this.isAuthenticated = !(this.isAuthenticated);
        },
		

	}
}
</script>

<style scoped>
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
li {
	display: list-item;
}
ol {
	margin: 0;
	padding: 0;
	list-style: none;
}
h2 {
	margin-top: 0px;
}
</style>