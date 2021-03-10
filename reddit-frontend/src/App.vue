<template>
	<div id="app">
		<div class="navbar">
			<Navbar @react="react" ></Navbar>
		</div>
		<div class="lower">
			<div class="cards-container">
				<div>
					<div class="cards-title">Trending today</div>
				</div>
				<Cards :key="cardKey"></Cards>
			</div>
			<div class="bottom">
				<Posts @vote="vote" @react="react" :posts="posts" :votedPosts="votedPosts"/>
				<div class="sidebar">
					<Sidebar></Sidebar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Posts from './components/Feeds/Posts'
import Sidebar from './components/Sidebar/Sidebar'
import Cards from './components/Topbar/Cards'
import Navbar from './components/Navbar/Auth'
import axios from 'axios'
// import VueAxios from 'vue-axios'

export default {
	name: 'App',
	components: {
		Posts,
		Sidebar,
		Cards,
		Navbar,
	},
	data() {
		return {
			posts: [],
			votedPosts: [],
			reactedPosts: [],
			cardKey: 0
		}
	},
	methods: {
		async vote(votes, index, add) {
			const result = await axios
			.post('http://localhost:8080/api/content/vote/user/'+localStorage.userId+'/content/'+this.posts[index].id+'?add='+add)
			this.posts[index].votes += result.data;
			this.posts[index].userVote += result.data;
			this.emitter.emit('postVote');
			this.emitter.emit('cardVote', result.data, this.posts[index].id);
		},
		async react(postId, reactId, index){
			if(reactId!==-1){
			const result = await axios
				.post("http://localhost:8080/api/UserContent/react/"+localStorage.userId+"/"+postId+"/"+reactId)
				console.log(result)
			if(result)	
			this.posts[index].userReact = reactId;
			}
			else{
				for (var i in this.posts)
				{
					this.posts[i].userReact=0;
					this.posts[i].userVote=0;
				}
			}
		},
		cardRerender(){
			this.cardKey++;
		}
	},
	async mounted(){
		
		const result = await axios
		.get('http://localhost:8080/api/content/-1')
		this.posts = result.data;

		if(localStorage.isAuthenticated === "true"){
			
		const res = await axios
		.get('http://localhost:8080/api/UserContent/'+localStorage.userId)
		this.votedPosts = res.data

		const keyVote = "userVote"
		const keyReact = "userReact"
		for(var post in this.posts){
			console.log(this.posts[post].id)
				var foundVote = 0;
				for(var voted in this.votedPosts){
					if(this.posts[post].id=== this.votedPosts[voted].contentId){
						this.posts[post][keyVote] = this.votedPosts[voted].votes;
						this.posts[post][keyReact] = this.votedPosts[voted].reaction;
						foundVote = 1;
					}
			   }
			   if(foundVote === 0)
			   this.posts[post][keyVote] = 0;
			   if(!this.posts[post][keyReact])
			   this.posts[post][keyReact] = 0;
			}
			console.log(this.posts)
		}

		this.emitter.on('cardRerender', () => {
			this.cardRerender();
		});
	}
}
</script>

<style >
html, body {
  margin: 0px !important;
  padding: 0px !important;
}
#app {
	font-family: IBMPlexSans, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background:	#DAE0E6;
}
.bottom {
	display: flex;
	justify-content: center;
	padding-left:165px;
	padding-right:250px;
}
.sidebar {
	padding-top: 20px;
	padding-left: 0px;
}
.navbar{
	background-color: white;
	flex: 0;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 80;
	margin-top: 0;
	height: 48px;
	display: inline-flex;
	flex-direction: row;
	align-items: center;
}
.cards-container {
	margin: 0px 186px 0px 186px;
	padding: 16px 24px 0;
}
.cards-title {
	text-align: left;
	font-family: IBMPlexSans, Arial, sans-serif;
	font-size: 14px;
	font-weight: 600;
	line-height: 18px;
	padding: 0 16px 10px;
}
.lower {
	padding-top: 48px;
}
button{
	border: 0;
	outline: 0;
}
</style>
