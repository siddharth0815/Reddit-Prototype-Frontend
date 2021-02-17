<template>
<div id="navbar">
    <div class="sameline">
        <img src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo.png">
        <div class="buttons" v-if="isAuthenticated===false">
            <button class="login-button" @click="showLoginModalFunc(true)">Log In</button>
            <button class="register-button" @click="showRegisterModalFunc(true)">Sign Up</button>
        </div>
        <div class="logout" v-else>
            <span class="user-info">Hello, {{ getUserName() }}</span>
            <button class="logout-button" @click="handleLogout()">Logout</button>
        </div>
    </div>
    <div id= "login" v-if="showLoginModal===true && isAuthenticated === false" class="modal">
        <LoginModal @showLoginModalFunc="showLoginModalFunc" @toggleIsAuthenticated="toggleIsAuthenticated" :showLoginModal="showLoginModal" :isAuthenticated="isAuthenticated"> </LoginModal>
    </div>
    <div id= "register"  v-if="showRegisterModal===true && isAuthenticated === false" class="modal" >
        <RegisterModal @showRegisterModalFunc="showRegisterModalFunc" :showRegisterModal="showRegisterModal"> </RegisterModal>
    </div>
</div>
</template>

<script>

import LoginModal from '../Modal/LoginModal'
import RegisterModal from '../Modal/RegisterModal'

export default {
    name: 'Navbar',
    components:{
        LoginModal,
        RegisterModal,
    },
	data() {
		return {
			isAuthenticated: false,
			showLoginModal: false,
			showRegisterModal: false,
            userName: null
		}
	},
	mounted() {
		if(localStorage.isAuthenticated != null) {
			this.isAuthenticated = localStorage.isAuthenticated == "true"
		}
	},
	methods: {
		showLoginModalFunc(value) {
            //this.showRegisterModal=!(value);
            this.showLoginModal=value;
            console.log(this.showLoginModal)
		},
		showRegisterModalFunc(value) {
            //this.showLoginModal=!(value);
            console.log("enter")
            //console.log("value",value)
            this.showRegisterModal=value;
            console.log(this.showRegisterModal)
		},
		handleLogout() {
			this.isAuthenticated = false;
			localStorage.isAuthenticated = false;
			localStorage.userName = null;
            localStorage.userId=null;
            alert("Logout Successfull")
		},
        toggleIsAuthenticated() {
            this.isAuthenticated = !(this.isAuthenticated);
        },
        getUserName() {
            return localStorage.userName;
        }
    }
}
</script>

<style scoped>
#navbar {
	border-radius: 10px 10px 10px 10px;
}
button {
    border: 0;
}
.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 256px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    margin-right: 98px;
}
.logout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 256px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    margin-right: 98px;
}
.user-info {
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
}
.login-button {
    width: 120px;
    height: 32px;
    border: 1px solid #0079d3;
	border-radius: 9999px;
    background-color: white;
    color: #0279d2;
    font-weight: 700;
    padding: 0px 16px 0px 16px;
}
.register-button {
    width: 120px;
    height: 32px;
    background-color: #0079d3;
    color: white;
    border-radius: 9999px;
    font-weight: 700;
    padding: 0px 16px 0px 16px;
}
.logout-button {
    width: 120px;
    height: 32px;
    border: 1px solid #0079d3;
	border-radius: 9999px;
    background-color: white;
    color: #0279d2;
    font-weight: 700;
    padding: 0px 16px 0px 16px;
}
img {
    width: 96px;
    height: 48px;
    object-fit: scale-down;
    margin-left: 20px;
}
.sameline {
    display: flex;
    justify-content: space-between;
}
</style>

