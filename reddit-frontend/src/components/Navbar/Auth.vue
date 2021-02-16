<template>
<div class="navbar">
	<div class="auth-buttons" v-if="isAuthenticated===false">
		<div class="login-register-button">
			<button class="login-button" @click="showLoginModalFunc()">Login</button>
			<button class="register-button" @click="showRegisterModalFunc()">Register</button>
		</div>
	</div>
	<div class="logout-button" v-else>
		<button class="logout-button" @click="handleLogout()">Logout</button>
	</div>
	<div id= "login" v-if="showLoginModal===true && isAuthenticated === false" class="modal">
		<div class="modalContent">
			<div id ="modalHeader">
				<h2>Login</h2>
				<span class="close" @click="closeLoginModalFunc()">&times;</span>
			</div>
			<hr>
			<form id="loginForm" @submit.prevent="loginSubmit">
				<input type="text" id="loginUsername" v-model="loginUsername" placeholder="Username">
				<br>
				<input type="password"  id="loginPassword" v-model="loginPassword" placeholder="Password">
				<br>
				<input type="submit" value="Login">
			</form>
			<hr>
		</div>
	</div>
	<div id= "register" v-if="showRegisterModal===true && isAuthenticated === false" class="modal">
		<div class="modalContent">
			<div id ="modalHeader">
				<h2>Register</h2>
				<span class="close" @click="closeRegisterModalFunc()">&times;</span>
			</div>
			<hr>
			<form id="registerForm" @submit.prevent="registerSubmit">
				<input type="text" id="Username" v-model="registerUsername" placeholder="Username">
				<br>
				<input type="password"  id="registerPassword" v-model="registerPassword" placeholder="Password">
				<br>
				<input type="email"  id="registerEmail" v-model="registerEmail" placeholder="Email">
				<br>
				<input type="submit" value="Signup">
			</form>
			<hr>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Navbar',
	data() {
		return {
			isAuthenticated: false,
			userId:null,
			userName:null,
			showLoginModal: false,
			showRegisterModal: false,
			loginUsername: null,
			loginPassword: null,
			registerUsername: null,
			registerPassword: null,
			registerEmail: null,
		}
	},
	mounted() {
		if(localStorage.isAuthenticated != null) {
			this.isAuthenticated = localStorage.isAuthenticated == "true"
		}
	},
	methods: {
		showLoginModalFunc() {
			this.showRegisterModal=false;
			this.showLoginModal=true;
		},
		closeLoginModalFunc() {
			this.showLoginModal=false;
		},
		showRegisterModalFunc() {
			this.showLoginModal=false;
			this.showRegisterModal=true;
		},
		closeRegisterModalFunc() {
			this.showRegisterModal=false;
		},
		handleLogout() {
			this.isAuthenticated = false;
			localStorage.isAuthenticated = false;
			localStorage.userName = null;
			localStorage.userId=null;
		},
		async registerSubmit() {
			const requestBody = {
				userName: this.registerUsername,
				password: this.registerPassword,
				email: this.registerEmail,
				active: true,
			}
			const response = await axios.post("http://localhost:8080/user/auth/register",requestBody)
			console.log(response);
		},
		async loginSubmit() {
			const requestBody = {
				userName: this.loginUsername,
				password: this.loginPassword
			};
			try{
				const response = await axios.post("http://localhost:8080/user/auth/login",requestBody);
				this.isAuthenticated = true;
				localStorage.isAuthenticated = true;
				localStorage.userName = response.data.userName;
				localStorage.userId = response.data.id;
			}
			catch(e){
				alert("Invalid Credentials")
			}
		}
	}
}
</script>

<style scoped>
.navbar {
		float:right;
}
.login-button {
		margin-right: 20px;
}
</style>

