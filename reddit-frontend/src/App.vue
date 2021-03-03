<template>
	<div id="app">
		<div class="navbar">
			<Navbar></Navbar>
		</div>
		<div class="cards-container">
			<div>
				<div class="cards-title">Trending today</div>
			</div>
			<Cards></Cards>
		</div>
		<div class="bottom">
			<Posts @vote="vote" :posts="posts"/>
			<div class="sidebar">
				<Sidebar></Sidebar>
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
		Navbar
	},
	data() {
		return {
			posts: [],
		}
	},
	methods: {
		async vote(votes, index, add) {
			const result = await axios
			.post('http://localhost:8080/api/content/vote/user/'+localStorage.userId+'/content/'+this.posts[index].id+'?add='+add)
			this.posts[index].votes += result.data;
			this.emitter.emit('postVote')
		},
	},
	mounted(){
		axios
		.get('http://localhost:8080/api/content/-1')
		.then(response=> {this.posts = response.data});
	}
}
</script>

<style>
html, body {
  margin: 0px !important;
  padding: 0px !important;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background:	#DAE0E6;
}
.bottom {
	display: flex;
	justify-content: center;
}
.sidebar {
	padding-top: 20px;
	padding-left: 0px;
}
.navbar{
	background-color: white;
	border: 0;
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
}
</style>
