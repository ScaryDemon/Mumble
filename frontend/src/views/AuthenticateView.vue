<template>
  <div class="container">
    <particles-bg color="#19E602" num="50" type="cobweb" :canvas="{ backgroundColor: '#363030' }" :bg="true" />
    <form class="loginform">
      <h1 class="title">MUMBLE</h1>
      <p class="logintitle"> Email</p>
      <input v-model="email" type="text" class="inputfield" required="required"/>
      <p class="logintitle">Password</p>
      <input v-model="password" type="password" class="inputfield" required="required"/>
      <button v-on:click="login()" class="loginbutton"> Login </button>
      <button v-on:click="register()" class="loginbutton"> Register </button>
    </form>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import axios from 'axios';
import { ref } from 'vue';
import router from "@/router";



export default {
  components: {
    ParticlesBg
  },
  setup() {
    const password = ref('');
    const email = ref('');

    async function login() {
      try {
        const response = await axios.post("http://20.6.0.6:3000/auth", {
          email: email.value,
          password: password.value,
        });
        const status = JSON.parse(response.status);
        if (status == "200") {
          const jose = require('jose')
          let jwtSecretKey = process.env.VUE_APP_JWT_SECRET;

          const ecPublicKey = await jose.importSPKI(jwtSecretKey, 'ES256')
          const test = await jose.jwtVerify(response.data, ecPublicKey);

          if (!test){
            console.log("fick")
          }else{
            localStorage.setItem('token', JSON.stringify(response.data));
            router.push('/Dashboard')
          }
        }
      } catch (error) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    }

    function register(){
        router.push('/Register')
      }
    return {
      password,
      email,
      login,
      register
    }
  }
}







</script>
  
<style scoped>
*{
  background: none;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  }

.title {
  color: #00ff8e;
  font-size: 60px;
}

.loginform {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 500px;
  background-color: rgb(26, 25, 25);
  border-radius: 3px;
  transform: translate(0, 30%);
}

.logintitle {
  font-size: 30px;
  font-weight: lighter;
  font-family: Arial, Helvetica, sans-serif;
  margin: 5px;
  color: white;
}

.loginbutton {
  width: 20em;
  height: 3em;
  border: none;
  background-color: black;
  color: rgb(133, 133, 133);
  border-radius: 5px;
  margin: 20px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 5rem;
}

.loginbutton:hover {
  color: black;
  background-color: #00ff8e;
}

.inputfield {
  background-color: rgb(20, 20, 20);
  border: none;
  height: 50px;
  width: 20rem;
  color: grey;
  font-size: 15px;
  border-radius: 5px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  margin-bottom: 2rem;

}
</style>
  