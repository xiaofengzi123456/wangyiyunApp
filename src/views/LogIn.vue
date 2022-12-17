<template>
  <div class="login">
    <h1>欢迎登录</h1>
    <input type="text" placeholder="请输入手机号码" v-model="phone" />
    <input type="password" placeholder="请输入密码" v-model="password" />
    <button @click="getLogin">登录</button>
  </div>
</template>

<script>
import { requestLogin } from "../api/homeRequest";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "LogIn",
  setup() {

    const router = useRouter();
    const phone = ref("");
    const password = ref("");

    async function getLogin() {
      try {
        let result = await requestLogin({
          phone: phone.value,
          password: password.value,
        });
        console.log(result);
        if (result.data.code == 200) {
          router.push("/userinfo");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    return {
      phone,
      password,
      getLogin,
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: orangered;
  color: white;
  width: 100%;
  height: 13.34rem;
  padding: 0 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 0.8rem;
    padding: 1.4rem 0 1.8rem;
  }
  input {
    padding: 0.2rem 0;
    margin-bottom: 1rem;
    outline: 0;
    border: none;
    color: black;
    width: 5rem;
  }
  button {
    padding: 0.1rem 0.6rem;
    color: black;
    border: none;
  }
}
</style>
