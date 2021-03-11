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
							<div>
								<img alt="icon" :src="post.communityIcon" class="icon">
							</div>
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
								<div id="comment-button" v-on:click="displayComments(post, index)">
									<img class="comment-icon" src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-comment-icon-isolated-on-background-png-image_1875255.jpg"/>
									<button type = "button" class="button">Comments</button>
								</div>
								<div class="dropdown">
									<div v-if="post.userReact === 1" id="react-div">
										<img  @click="react(post.id,0,index)" class="react-img"  src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"/>
										<!-- <div class="react-text">Love</div> -->
									</div>
									<div v-else-if="post.userReact === 2" id="react-div">
										<img  @click="react(post.id,0,index)" class="react-img"  src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r"/>
										<!-- <p class="react-text">Support</p> -->
									</div>
									<div v-else-if="post.userReact === 3" id="react-div">
										<img  @click="react(post.id,0,index)" class="react-img"  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"/>
										<!-- <p class="react-text">Like</p> -->
									</div>
									<div v-else id="react-button">
										<img class="react-icon" src="https://icons-for-free.com/iconfiles/png/512/love+one+one+like+icon-1320184042027897906.png"/>
										<button type="button" class="button">React</button>
									</div>

									<div class="dropdown-content">
										<img @click="react(post.id, 1, index)" class="reactions" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"/>
										<img @click="react(post.id, 2, index)" class="reactions" src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r"/>
										<img @click="react(post.id, 3, index)" class="reactions" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"/>
									</div>
								</div>
								<div id="hide-button">
									<img class="hide-icon" src="https://cdn4.iconfinder.com/data/icons/internet-seccurity-blue-filled-line/32/Internet_Security_disable_hidden_eye_view_hide-512.png"/>
									<button type="button" class="button">Hide</button>
								</div>
								<div id="share-button">
									<img class="share-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNV6JlJl6vzpa-VaQyxs9bl6MKtw8qCXCg5g&usqp=CAU"/>
									<button type="button" class="button">Share</button>
								</div>
							</div>
						<div v-if="toggle[index] === true" class="comments-section">
							<div class="single-comment-section" :key="comment.id" v-for="comment in post.comments">
								<div class="icon-user">
									<img alt="icon" :src="comment[2]" class="comment-usericon">
									<div class="content-username">	
										<div class="username">{{comment[0]}}</div>
										<p id="comment">{{ comment[1]}}</p>
									</div>
								</div>
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
			toggle: [],
			commentBox: [],
			showLoginModal: false,
			isAuthenticated: false,
		};
	},
	methods: {
		 react(postId, reactId, index){
			if(localStorage.isAuthenticated === "true") {
				console.log("hello react")
				console.log(postId, reactId, index)
				this.$emit("react", postId, reactId, index)
			}
			else {
				this.emitter.emit("LoginModal", true)
			}
		},
		vote(votes, index, add) {
			if(localStorage.isAuthenticated === "true") {
				this.$emit("vote", votes, index, add)
			}
			else {
				this.emitter.emit("LoginModal", true)
			}
		},
		postComment(post,index){
			if(localStorage.isAuthenticated !== "true"){
				this.emitter.emit("LoginModal", true)
			}
			else if(this.commentBox[index]){
				const requestBody = {
					contentBody : this.commentBox[index],
					parentId: post.id,
					votes: -1000
				}
				console.log(localStorage.userId)
				axios
				.post("http://localhost:8080/api/content/create/user/"+localStorage.userId+"/community/"+post.communityId,requestBody)
				.then(response=>{console.log(response)})
				post.comments.push([localStorage.userName, this.commentBox[index], localStorage.iconURL]);
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
				{
					const commentInfo = [];
					commentInfo.push(resultList.data[i].userName);
					commentInfo.push(resultList.data[i].contentBody);
					commentInfo.push(resultList.data[i].userIcon);
					console.log("COMMENT-INFO",commentInfo);
					comments.push(commentInfo);
				}
				post[key]=comments;
			}
		},
		toggleIsAuthenticated() {
            this.isAuthenticated = !(this.isAuthenticated);
		},
	},
	mounted(){
		
	   for(var i=0 ;i<this.posts.length;i++){
		   this.toggle.push(false);
		   this.commentBox.push("")
	   }

	}
		
		
	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#posts{
	width:100%;
}
p{
	font-weight: bold;
	color:black;
	padding: 2px;
	padding-left:10px ;
	margin-block-start: 0px;
}
h4 {
	text-align: left;
	margin-bottom: 15px;
	margin-top: 0px;
}
h5 {
	margin: 0;
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
	padding-right: 5px;
	border-radius: 2px;
	color: black;
	display: flex;
	background-color: transparent;
	border: 0;
	font-size: 14px;
	font-weight: 700;
	color: rgb(135, 138, 140);
}
#comment-button:hover{
	background-color: #ffe6e6;
}

#react-button {
	padding-right: 5px;
	padding-left: 5px;
	border-radius: 2px;
	color:black;
	display:flex;
}
#react-button:hover{
	background-color: lightgreen;
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
	padding-right: 5px;
	padding-left: 5px;
	scroll-padding-left: 2px;
	border-radius: 2px;
	border:black;
	display: flex;
}
#hide-button:hover{
	background-color: #E7F3FF;
}
#react-button {
	padding-right: 0px;
	border-radius: 2px;
	border:black;
}
#react-button:hover{
	background-color: #e6ffe6;
}
#share-button {
	padding-right: 5px;
	padding-left: 5px;
	border-radius: 2px;
	border:black;
	display: flex;
}
#share-button:hover{
	background-color: #FFFF99;
}
#comment {
	padding-right: 20px;
	margin-bottom: 12px;
	font-weight: normal;
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
.react-icon{
	height: 25px;
	width: 30px;
	padding-bottom: 0px;
	padding-top: 5px;
}
.comment-icon{
	height: 25px;
	width: 30px;
	padding-bottom: 0px;
	padding-top: 5px;
}
/* .react-text{
	padding-left: 0px;
	padding-top: 15px;
} */
.share-icon{
	height: 23px;
	width: 30px;
	padding-bottom: 0px;
	padding-top: 5px;
}

.hide-icon{
	height: 25px;
	width: 30px;
	padding-bottom: 0px;
	padding-top: 5px;
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
	padding-top: 8px;
	justify-content: center;
}
.votes-image {
	display: flex;
}
.main-post {
	margin-bottom: 6rem;
}
.react-div{
	display: flex;
	padding-right: 6px;

}
.react-img{
	height:25px;
	width:30px;
	padding-bottom: 0px;
	padding-left:4px;
	padding-right:10px;
	padding-top: 5px;
}
.icon-user {
	display: flex;
	align-items: center;
	margin-left: 10px;
}
.comment-usericon {
	width: 20px;
	height: 20px;
	border-radius: 100%;
	padding: 0;
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
	border-radius: 5px;
	margin-bottom: 10px;
	background-color: #E7F3FF;  
	/* background-color: #DDEFFF; 
	background-color: #D3F4E6;  */
	justify-content: space-between;
	width:500px;
}
.username{
	text-align: left;
	padding-left: 10px;
	padding-top: 5px;
	font-size: 14px;
	font-weight:700;
}
.username:hover{
	text-decoration: underline;
}

.input-comment{
	padding-left: 120px;
}
.community-user{
    display: flex;
    flex-flow: row nowrap;
	align-items: center;
    position: relative;
	margin: 0 8px 8px;
}
.user-name{
	padding-left: 10px;
	color: grey;
}
.community-name{
	padding-right: 20px;
	color: black;
}
.community-name:hover{
	text-decoration: underline;
}
.icon {
	width: 20px;
	height: 20px;
	margin-right: 4px;
	border-radius: 100%;
	padding: 0;
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
	background-color: #E7F3FF;
	width: 50px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	border: 5px solid greenyellow;
	z-index: 1;
}

.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}
.reactions{
	height:28px;
	width:28px;
	justify-content: left;
	padding-left:2px;
	padding-bottom:10px;
	padding-top:2px;
}

.dropdown-content a:hover {background-color: blue;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color:#D0D0D0;}

</style>
