/* eslint-disable no-mixed-spaces-and-tabs */
<template>
<div id="posts">
	<div class="all-posts">
		<div class="post-title">Popular Posts</div>
		<div class="posts">
			<div class="post-container">
				<div class="single-post" :key="post.id" v-for="(post, index) in posts">
						
						<div class="votes-container">
							<button :id="post.userVote===1?'upvoted-button':'upvote-button'" @click="vote(post.votes, index, true)">^</button> 
							<p id="votes">{{ post.votes }}</p>
							<button :id="post.userVote===-1?'downvoted-button':'downvote-button'" @click="vote(post.votes, index, false)">v</button>	   
						</div>
						<div class="right-separate">
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
									<button type = "button" class="button" v-on:click="displayComments(post, index)">Comments</button>
								</div>
								<div class="dropdown">
									<div id="react-button">
										<button type="button" class="button">React</button>
									</div>
									<div class="dropdown-content">
										<img class="reactions" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"/>
										<img class="reactions" src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r"/>
										<img class="reactions" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"/>
									</div>
								</div>
								<div id="hide-button">
									<button type="button" class="button">Hide</button>
								</div>
								<div id="report-button">
									<button type="button" class="button">Report</button>
								</div>
							</div>
							<div v-if="toggle[index] === true" class="comments-section">
								<div class="single-comment-section" :key="comment.id" v-for="comment in post.comments">
									<p id="comment">{{ comment }}</p>
									<div class="reply-class">
										<button id="reply-button">reply</button>
									</div>
								</div>
								<div id="comment-box">
									<textarea type="text" class="form-control"  v-model.trim="commentBox[index]" placeholder="Enter a comment..."></textarea>
									<button id="submit-button" @click="postComment(post,index)">Comment</button>
								</div>
							</div>
						</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	name: "Posts",
	props: ['posts', 'votedPosts'],
	components:{
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
				this.showLoginModalFunc()
			}
		},
		postComment(post,index){
			if(localStorage.isAuthenticated !== "true"){
				this.showLoginModalFunc()
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
		showLoginModalFunc() {
			this.emitter.emit("LoginModal")
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
	margin-top: 0px;
}
img {
	height: auto;
	padding-bottom: 20px;
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
	background-color: #0079d3;
	color: #ffffff;
	fill: #ffffff;
	border: none;
    border-radius: 9999px;
    box-sizing: border-box;
	font-family: Noto Sans, Arial,sans-serif;
    font-size: 14px;
    height: 32px;
    padding: 0 16px;
	
    margin-top: 10px;
    align-items: center;
    text-align: center;
}
#submit-button:hover{
	background-color: #D0D0D0;
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
	 width: 80px;
    height: 25px;
    border: 1px solid #0079d3;
	border-radius: 9999px;
    background-color: white;
    color: #0279d2;
    font-weight: 700;
    padding: 0px 16px;

	
}
#reply-button:hover{
	background-color: #D0D0D0;
}
.posts {
	background-color: #d3d3d3;
}
.button {
	background-color: transparent;
	border: 0;
	font-size: 14px;
	font-weight: 700;
	color: rgb(135, 138, 140);
}
.right-separate{
	padding-left:15px;
	justify-content: center;
}
.votes-image {
	display: flex;
	
}
.main-post {
	margin-bottom: 6rem;
}
.post-title{
	text-align: left;
	font-family: IBMPlexSans, Arial, sans-serif;
	font-size: 14px;
	font-weight: 600;
	line-height: 18px;
	padding:  0 16px 10px;
	padding-left: 65px;
}
.post-comments {
	display: flex;
	padding-bottom: 30px;
	justify-content: space-between;
	width:300px;
	padding-left: 50px;
}
.reply-class{
	padding-top:10px;
	padding-right: 10px;
}
.post-container {
	background-color: #DAE0E6;
	padding-left: 40px;
	
}
.votes-container {
	background-color: #F0F0F0;
	width: 40px;
	border-left: 2px thin;
	padding-left: 5px;
	padding-top: 10px;
	height: inherit;
}

.single-comment-section {
	display: flex;
	/* border-color:black;
	border-style: solid;
	border-width: thin; */
	border-radius: 5px 5px 5px 5px;
	margin-bottom: 10px;
	background-color: #E7F3FF;  
	/* background-color: #DDEFFF; 
	background-color: #D3F4E6;  */
	justify-content: space-between;
	width:500px;
}
.input-comment{
	padding-left: 120px;
}
.community-user{
	/* background: linear-gradient(to right, grey, grey 10%, transparent 90%, transparent 100%); */
	/* background: linear-gradient(to right, grey 10%, white 90%);; */
	display: flex;
	
}
.user-name{
	padding-left: 10px;
	color: grey;
}
.community-name{
	padding-right: 20px;
	color: black;
}
.single-post:hover{
	
	
	border: 1px solid #898989
}
.single-post{
	margin-bottom: 15px;
	width: 600px;
	display: inline-flex;
	background-color: white;
	border-radius: 5px;
	border: 1px solid #ccc;
}
.all-posts{
	background-color: #DAE0E6;
	padding-top: 20px;
}
.comments-section{
	
	
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
