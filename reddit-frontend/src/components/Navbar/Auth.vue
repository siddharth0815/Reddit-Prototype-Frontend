<template>
<div>
<div class="navbar" @click="showRegisterModalFunc(false)"></div>
	<div class="auth-buttons" v-if="isAuthenticated===false">
		<div class="login-register-button">
            <div>
            <img src="https://pbs.twimg.com/profile_images/1333471260483801089/OtTAJXEZ_400x400.jpg">
           </div>
            <div>    
            <button class="login-button" @click="showLoginModalFunc(true)">Login</button>
			<button class="register-button" @click="showRegisterModalFunc(true)">Register</button>
		    </div>
        </div>
	</div>
	<div class="logout-button" v-else>
        <div>
       <img src="https://pbs.twimg.com/profile_images/1333471260483801089/OtTAJXEZ_400x400.jpg">
        </div>
        <div>
        <!-- <p>Hello {{localStorage.userName}}!</p>         -->
        <button class="logout" @click="handleLogout()">Logout</button>
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
        toggleIsAuthenticated(){
            this.isAuthenticated = !(this.isAuthenticated);
        }
			
    }
		
	}

</script>

<style scoped>
.navbar {
		float:right;
}
.login-button {
background-image: linear-gradient(to right, #0079D3,  #0079D3);
 padding: 15px;   	
}
.register-button {
background-image: linear-gradient(to right, #0079D3,  #0079D3);
padding:15x;    	
}
.login-register-button{
  
   background-color: #DAE0E6;
   display: flex;
   justify-content: space-between;
}
.logout-button{
   padding:15px;
   background-image: linear-gradient(to right, #0079D3,  #0079D3);
   justify-content: space-between;
   display: flex;
}
img{
    height: 50px;
    width: 50px;
}
</style>

