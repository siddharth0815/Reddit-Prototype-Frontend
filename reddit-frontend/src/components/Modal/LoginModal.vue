<template>
<div>
	<transition name="fade" appear>
		<div class="modal-overlay" v-if="showModal"></div>
	</transition>
	<transition name="slide" appear>
		<div class="modal" v-if="showModal">
			<h2>Login</h2>
			<form id="login-form" >
				<!-- name -->
				<div class="field">
					<label class="label">Username</label>
					<input type="text" v-model="loginUsername" class="input">
				</div>
				<!-- email -->
				<div class="field">
					<label class="label">Password</label>
					<input type="password" v-model="loginPassword" class="input">
				</div>
				<!-- submit button -->
				<div class="submit-button">
					<button type="submit" class="button is-danger" @click="loginSubmit">Submit</button>
				</div>
			</form>
			<button class="button" @click="closeLoginModal()">Close</button>
			<div class="bottom-linetext">
                <div class="normal-text">
                  <p>Already a redditor?</p>
                </div>
                <div class="link-text">
                    <a href=# @click="showRegisterModal()">Sign Up</a>
                </div>
            </div>
		</div>
	</transition>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'LoginModal',
	props: ['showLoginModal','isAuthenticated'],
	data() {
		return {
			showModal: false,
			
			loginUsername: null,
			loginPassword: null,
		}
	},
	methods:{
		closeLoginModal(){
          this.emitter.emit("LoginModal",false)
		},
		showRegisterModal(){
		   this.emitter.emit("RegisterModal",true)
		},
		async loginSubmit() {
			const requestBody = {
				userName: this.loginUsername,
				password: this.loginPassword
			};
			try {
				const response = await axios.post("http://localhost:8080/user/auth/login",requestBody);
				this.$emit("toggleIsAuthenticated");
				console.log(response.data)
				localStorage.isAuthenticated = true;
				localStorage.userName = response.data.userName;
				localStorage.userId = response.data.id;
				localStorage.iconURL = response.data.iconURL;
				this.closeLoginModal();
				alert("Login Successful");
			}
			catch(e){
				alert("Invalid Credentials"+e);
			}
		}
	},
	mounted() {
		
		this.showModal = this.showLoginModal;
	}
}
</script>

<style scoped>
.field {
	padding: 10px;
}
.label {
	padding-right: 10px;
}
.field-button{
	display:flex;
}
.button {
    width: 120px;
    height: 32px;
    border: 1px solid #0079d3;
	border-radius: 9999px;
    background-color: white;
    color: #0279d2;
    font-weight: 700;
    padding: 0px 16px 0px 16px;
	margin-top: 10px;
}
#login-form {
	text-align: right;
}
.submit-button {
	text-align: center;
}
.bottom-linetext{
	display: flex;
}
.link-text{
	padding-top: 20px;
	padding-left: 3px;
}
.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 98;
	background-color: rgba(0, 0, 0, 0.3);
	height: 100vh;
}
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;

	width: 100%;
	max-width: 400px;
	background-color: #FFF;
	border-radius: 16px;

	padding: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
h2 {
	color: #222;
	font-size: 32px;
	font-weight: 900;
	margin-bottom: 15px;
}
p {
	color: #666;
	font-size: 18px;
	font-weight: 400;
	margin-bottom: 15px;
}
.fade-enter-active,.fade-leave-active {
	transition: opacity .5s;
}
.fade-enter,.fade-leave-to {
	opacity: 0;
}
.slide-enter-active,.slide-leave-active {
	transition: transform .5s;
}
.slide-enter,.slide-leave-to {
	transform: translateY(-50%) translateX(100vw);
}
</style>