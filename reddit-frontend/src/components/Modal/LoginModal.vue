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
         <button class="button" @click="showLoginModalFunc()">
        Close
      </button>
      
  
  </div>
 </transition>
 </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginModal',
    props: ['showLoginModal','isAuthenticated'],
data()
{
return{
  showModal: false,
  loginUsername: null,
  loginPassword: null,

}},
methods:{
   showLoginModalFunc(){
       this.showModal = false
       this.$emit("showLoginModalFunc",false)
   },
    async loginSubmit() {
			const requestBody = {
				userName: this.loginUsername,
				password: this.loginPassword
			};
			try{
				const response = await axios.post("http://localhost:8080/user/auth/login",requestBody);
                this.$emit("toggleIsAuthenticated")
				localStorage.isAuthenticated = true;
				localStorage.userName = response.data.userName;
                localStorage.userId = response.data.id;
               alert("Login Successfull") 
               
			}
			catch(e){
				alert("Invalid Credentials")
			}
		}

},

mounted(){
   this.showModal = this.showLoginModal
}

}
</script>

<style scoped>
.field{
    padding: 10px;
}
.label{
    padding-right: 10px;
}
.field-button{
 display:flex;
}
.button {
 appearance: none;
 outline: none;
 border: none;
 background: none;
 cursor: pointer;
 display: inline-block;
 padding: 15px 25px;
 background-image: linear-gradient(to right, #CC2E5D, #FF5858);
 border-radius: 8px;
 
 color: #FFF;
 font-size: 18px;
 font-weight: 700;
 
 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;
}

.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
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

.fade-enter-active,
.fade-leave-active {
 transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
</style>