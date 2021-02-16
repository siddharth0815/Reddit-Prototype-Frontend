<template>
<div>
<div class="navbar">
<Navbar></Navbar>
</div>
	<div id="app">
		<div>
			<Cards></Cards>
		</div>
		<div class="bottom">
			<Posts @increment="upvote" @decrement="downvote" :posts="posts"/>
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
		Cards,Navbar
	},
	data(){
		return{
		posts: [],
	}},
	methods: {
		upvote(upvotes, index) {
			axios
			.post('http://localhost:8080/api/content/upvote/'+this.posts[index].id)
			.then(response=>{console.log(response)})
			this.posts[index].upvotes+=1
		},
		downvote(downvotes, index) {
			axios
			.post('http://localhost:8080/api/content/downvote/'+this.posts[index].id)
			.then(response=>{console.log(response)})
			this.posts[index].downvotes+=1
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
}
.sidebar {
	padding-top: 20px;
	padding-left: 0px;
}
.navbar{
	background-color: #DAE0E6;
}
</style>
