<template>
<div >
<transition name="fade" appear>
  <div class="modal-overlay" v-if="showModal"></div>
 </transition>
 <transition name="slide" appear>
  <div class="modal" v-if="showModal">
   <h2>SignUp</h2>
   <form id="signup-form">
      <!-- name -->
      <div class="field">
        <label class="label">Username</label>
        <input type="text" v-model="registerUsername" class="input">
      </div>

      <!-- email -->
      <div class="field">
        <label class="label">Password</label>
        <input type="password" v-model="registerPassword" class="input">
      </div>

      <div class="field">
        <label class="label">Email</label>
        <input type="email" v-model="registerEmail" class="input">
      </div>

      <!-- submit button -->
      <div class="submit-button">
        <button type="submit" class="button is-danger" @click="registerSubmit" >Submit</button>
      </div>
      </form> 
         <button class="button" @click="showRegisterModalFunc()">
        Close
      </button>
    
  </div>
 </transition>
 </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'RegsiterModal',
    props: ['showRegisterModal'],
data()
{
return{
  showModal: false,
  registerUsername: null,
  registerPassword: null,
  registerEmail: null,
}},
methods:{
   showRegisterModalFunc(){
       this.showModal = false
       console.log("child")
       this.$emit("showRegisterModalFunc",false)
   },
   async registerSubmit() {
			const requestBody = {
				userName: this.registerUsername,
				password: this.registerPassword,
				email: this.registerEmail,
				active: true,
            }
            try{
			const response = await axios.post("http://localhost:8080/user/auth/register",requestBody);
            console.log(response);
            this.showRegisterModalFunc();
            alert("Registration Successfull")
            }
            catch(e){
                alert("User Already exists!")
            }
            
		},

},

mounted(){
   this.showModal = this.showRegisterModal
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