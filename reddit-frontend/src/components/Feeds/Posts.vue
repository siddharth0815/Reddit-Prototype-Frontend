/* eslint-disable no-mixed-spaces-and-tabs */
<template>
<div id="posts">
	<div class="all-posts">
		<div class="posts">
			<div class="post-container">
				<div class="single-post" :key="post.id" v-for="(post, index) in posts">
					<div class="votes-container">
						<button :id="post.userVote===1?'upvoted-button':'upvote-button'" @click="vote(post.votes, index, true)">^</button> 
						<p id="votes">{{ post.votes }}</p>
						<button :id="post.userVote===-1?'downvoted-button':'downvote-button'" @click="vote(post.votes, index, false)">v</button>	   
					</div>
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
						<div>
							<img :src="post.imageURL"/>
						</div>
					</div>
					<div class="post-comments">
						<div id="comment-button">
							<button type = "button" class="button" v-on:click="displayComments(post, index)">comment</button>
						</div>
						<div class="dropdown">
							<div id="react-button">
								<button type="button" class="button">react</button>
							</div>
							<div class="dropdown-content">
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"/>
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r"/>
								<img class="reactions" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"/>
							</div>
						</div>
						<div id="hide-button">
							<button type="button" class="button">hide</button>
						</div>
						<div id="report-button">
							<button type="button" class="button">report</button>
						</div>
					</div>
					<div v-if="toggle[index] === true" class="comments-section">
						<div class="single-comment-section" :key="comment.id" v-for="comment in post.comments">
							<p id="comment">{{ comment }}</p>
							<div>
								<button id="reply-button">reply</button>
							</div>
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
	<div v-if="showLoginModal===true">
		 <LoginModal @showLoginModalFunc="showLoginModalFunc" @toggleIsAuthenticated="toggleIsAuthenticated" :showLoginModal="showLoginModal" :isAuthenticated="isAuthenticated"> </LoginModal>
	</div>
</div>
</template>

<script>
import axios from 'axios'
//import AlertModal from '../Modal/AlertModal'
import LoginModal from '../Modal/LoginModal'
export default {
	name: "Posts",
	props: ['posts', 'votedPosts'],
	components:{
	 LoginModal
	},
	data() {
		return {
			toggle: [false, false, false, false, false],
			commentBox: ["","","","",""],
			showLoginModal: false,
			isAuthenticated: false,
		};
	},
	methods: {
		vote(votes, index, add) {
			if(localStorage.isAuthenticated === "true") {
				this.$emit("vote", votes, index, add)
			}
			else {
				this.showLoginModalFunc(true)
			}
		},
		postComment(post,index){
			if(localStorage.isAuthenticated !== "true"){
				this.showLoginModalFunc(true)
			}
			else if(this.commentBox[index]){
				const requestBody = {
					contentBody : this.commentBox[index],
					parentId: post.id,
				}
				axios
				.post("http://localhost:8080/api/content/create/user/77/community/78",requestBody)
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
		showLoginModalFunc(value) {
			//this.showRegisterModal=!(value);
            this.showLoginModal=value;
            console.log("showloginmodalfunc", this.showLoginModal)
		},
		toggleIsAuthenticated() {
            this.isAuthenticated = !(this.isAuthenticated);
		},
	},
	mounted(){
		
	

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
#upvoted-button{
	border-radius: 2px;
	background-color: #ffcccb;
}
#upvote-button:hover{
	background-color: #D0D0D0;
}
#downvote-button{
	border-radius: 2px;
}
#downvoted-button{
	border-radius: 2px;
	background-color:#87CEEB;
}
#downvote-button:hover{
	background-color: #D0D0D0;
}
#comment-button {
	padding-right: 0px;
	border-radius: 2px;
	color: black;
}
#comment-button:hover{
	background-color: #D0D0D0;
}
#react-button {
	padding-right: 0px;
	border-radius: 2px;
	color:black
}
#react-button:hover{
	background-color: #D0D0D0;
}
#submit-button{
	height: 20px;
}
#votes{
	padding-right: 9px;
    margin: 2px;
}
#hide-button {
	padding-right: 0px;
	border-radius: 2px;
	border:black;
}
#hide-button:hover{
	background-color: #D0D0D0;
}
#react-button {
	padding-right: 0px;
	border-radius: 2px;
	border:black;
}
#react-button:hover{
	background-color: #D0D0D0;
}
#report-button {
	padding-right: 0px;
	border-radius: 2px;
	border:black;
}
#report-button:hover{
	background-color: #D0D0D0;
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
#reply-button:hover{
	background-color: #D0D0D0;
}
.posts {
	background-color: #d3d3d3;
}
.button {
	background-color: transparent;
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
	background-color: #F0F0F0;
	position: absolute;
	width: 40px;
	border-left: 2px thin;
	padding-left: 5px;
	height: 527px;
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
	/* background: linear-gradient(to right, grey, grey 10%, transparent 90%, transparent 100%); */
	/* background: linear-gradient(to right, grey 10%, white 90%);; */
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
	margin-top:50px;
	width: 600px;
	background-color: white;
	border-radius: 4px;
	border: 1px solid #ccc;
}
.all-posts{
	background-color: #DAE0E6;
}
.comments-section{
	padding-left: 50px;
	padding-right: 50px;
	margin-bottom: 2rem;
}
.dropdown {
	position: relative;
	display: inline-block;
	padding-right: 0px;
	
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

.dropdown:hover .dropbtn {background-color:#D0D0D0;}

</style>
