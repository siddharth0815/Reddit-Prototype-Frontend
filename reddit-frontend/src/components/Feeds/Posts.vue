/* eslint-disable no-mixed-spaces-and-tabs */
<template>
<div id="posts">
	<div class="all-posts">
		<div class="posts">
			<div class="post-container">
				<div class="single-post" :key="post.id" v-for="(post, index) in posts">
					<div class="community-user">
						<div class="community-name">
							<h5>r/{{post.communityName}}</h5>
						</div>
						<div class="user-name">
							<h5>Posted by {{post.userName}}</h5>
						</div>
					</div>
					<h4>{{ post.contentBody}}</h4>
					<div class="votes-image">
						<div class="votes-container">
							<button id="upvote-button" @click="upvote(post.upvotes, index)">^</button>
							<p id="upvotes">{{ post.upvotes }}</p>
							<p id="downvotes">{{ post.downvotes }}</p>
							<button id="downvote-button" @click="downvote(post.downvotes, index)">v</button>
						</div>
						<div>
							<img :src="post.imageURL"/>
						</div>
					</div>
					<div class="post-comments">
						<div id="comment-button">
							<button v-on:click="displayComments(post, index)">comment</button>
						</div>
						<div class="dropdown">
							<button class="dropbtn">react</button>
							<div class="dropdown-content">
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"/>
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r"/>
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"/>
							</div>
						</div>
						<div id="hide-button">
							<button>hide</button>
						</div>
						<div id="report-button">
							<button>report</button>
						</div>
					</div>
					<div v-if="toggle[index] === true" class="comments-section">
						<div class="single-comment-section" :key="comment.id" v-for="comment in post.comments">
							<p id="comment">{{ comment }}</p>
							<!-- <div>
								<button id="reply-button">reply</button>
							</div> -->
						</div>
						<div id="comment-box">
							<textarea type="text" class="form-control"  v-model.trim="commentBox[index]" placeholder="Enter a comment..."></textarea>
							<button id="submit-button" @click="postComment(post,index)">submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-if="show===true">
		<AlertModal @showModal="showModal" :show="show"></AlertModal>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import AlertModal from '../Modal/AlertModal'
export default {
	name: "Posts",
	props: ['posts'],
	components:{
	 AlertModal
	},
	data() {
		return {
			toggle: [false, false, false, false, false],
			commentBox: ["","","","",""],
			show: false,
			showLogin: false,
		};
	},
	methods: {
		upvote(upvotes, index) {
			if(localStorage.isAuthenticated === "true"){
				this.$emit("increment", upvotes, index)
			}
			else{
				this.showModal(true)
			}
		},
		downvote(downvotes, index) {
			if(localStorage.isAuthenticated === "true"){
				this.$emit("decrement", downvotes, index)
			}
			else{
				this.showModal(true)
			}
		},
		postComment(post,index){
			if(localStorage.isAuthenticated !== "true"){
				this.showModal(true)
			}
			else if(this.commentBox[index]){
				const requestBody = {
					contentBody : this.commentBox[index],
					parentId: post.id,
				}
				axios
				.post("http://localhost:8080/api/content/create/77/78",requestBody)
				.then(response=>{console.log(response)})
				post.comments.push(this.commentBox[index]);
				this.commentBox[index]="";
			}
			else{
				alert("Please write a comment")
			}
		},
		async displayComments(post, index) {
			const key = "comments";
			const comments = [];
			this.toggle[index] = !this.toggle[index];
			if(this.toggle[index])
			{
				const resultList = await axios.get('http://localhost:8080/api/content/'+post.id)
				for (var i in resultList.data)
					comments.push(resultList.data[i].contentBody);
				post[key]=comments;
			}
		},
		showModal(value){
			this.show = value
			console.log(this.show)
		},
		showLoginModal(value){
			this.showLogin = value
		}
		
		
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
	font-weight: bold;
	color:black;
	padding: 2px;
	padding-left:10px ;
}
h4 {
	text-align: left;
	margin-bottom: 15px;
	padding-left: 75px;
	margin-top: 0px;
}
img {
	height: auto;
	padding-bottom: 20px;
	padding-left: 50px;
	height: 350px;
	width: 500px;
}
textarea{
	width: 400px;
	height: 50px; 
	margin-right: 20px;
}
#upvote-button{
	border-radius: 2px;
}
#downvote-button{
	border-radius: 2px;
}
#comment-button {
	padding-right: 20px;
	border-radius: 2px;
	color: black;
	
}
#react-button {
	padding-right: 20px;
	border-radius: 2px;
	
}
#submit-button{
	height: 20px;
}
#hide-button {
	padding-right: 20px;
	border-radius: 2px;
	border:black;
	
}
#comment {
	padding-right: 20px;
}
#comment-box{
	display: flex;
	justify-content: space-between;
}
#reply-button{
	margin-top: 20px;
}
.posts {
	background-color: #d3d3d3;
}
.votes-image {
	display: flex;
	
}
.main-post {
	margin-bottom: 6rem;
}
.post-comments {
	display: flex;
	padding-left: 150px;
	padding-bottom: 30px;
}
.post-container {
	background-color: #DAE0E6;
	padding-left: 40px;
}
.votes-container {
	background-color: #DAE0E6;
	padding-bottom: 20px;
	position: absolute;
	width: 40px;
	border-left: 2px thin;
	padding-left: 5px;
	height: auto;
}
.single-comment-section {
	
	display: flex;
	border-color:black;
	border-style: solid;
	border-radius: 10px 10px 10px 10px;
	border-width: thin;
	margin-bottom: 10px;
	background-color: #DAE0E6;
	justify-content: space-between;
	width:500px;
	
}
.input-comment{
	padding-left: 120px;
}
.post-comments{
	display: flex;
}
.community-user{
	display: flex;
	padding-left: 75px;
	
}
.user-name{
	padding-left: 10px;
	color: grey;
}
.community-name{
	padding-right: 20px;
	color: black;
}
.single-post{
	border-color: black;
	border-width: thin;
	border-style: solid;
	margin-top:50px;
	width: 600px;
	background-color: white;
	border-radius: 10px 10px 10px 10px;
}
.all-posts{
	background-color: #DAE0E6;
 
}
.comments-section{
	padding-left: 50px;
	padding-right: 50px;
	margin-bottom: 2rem;
}


.dropbtn {
	
}

.dropdown {
	position: relative;
	display: inline-block;
	padding-right: 20px;
	
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: #f1f1f1;
	width: 50px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
	
}

.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}
.reactions{
	height:25px;
	width:25px;
	justify-content: left;
	padding-left:10px;
	padding-bottom:10px;
	padding-top:2px;

}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color:grey;}

</style>
