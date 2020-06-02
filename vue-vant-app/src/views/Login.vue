<template>
  <div class="login">
    <div class="top-div">
      <div class="content-div">
        <img src="../assets/login_img.png" />
        <span>高抗表计监测</span>
      </div>
    </div>

    <div class="login-div">

      <div class="line-div">
        <span class="login-line"></span>
        <span class="title">登录</span>
        <span class="login-line"></span>
      </div>
      <div class="username-div">
        <input
          :class="{userName:true,activi:nameHig}"
          v-model="username"
          type="text"
          @blur="nameEdit('blur')"
          @focus="nameEdit('focus')"
          placeholder="请输入用户名"
        />
      </div>
      <div class="userpwd-div">
        <input
          :class="{userPwd:true,activi:pwdHig}"
          v-model="password"
          type="password"
          @blur="pwdEdit('blur')"
          @focus="pwdEdit('focus')"
          placeholder="请输入密码"
        />
      </div>
      <van-button class="onSubmit" @click="onSubmit" block>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: "Hello.001",
      nameHig: false,
      pwdHig: false
    };
  },
  created() {},
  methods: {
    onSubmit() {
      if (this.username.length === 0) {
        this.$toast("请输入用户名!");
      } else if (this.password.length === 0) {
        this.$toast("请输入密码!");
      } else if (this.username != "admin" || this.password != "Hello.001") {
        this.$toast("账号或密码错误!");
      } else {
        this.$router.push("/home");
      }
    },
    nameEdit(type) {
      type === "focus" ? (this.nameHig = true) : (this.nameHig = false);
    },
    pwdEdit(type) {
      type === "focus" ? (this.pwdHig = true) : (this.pwdHig = false);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #f7f7f7;
}
.top-div {
  width: 100%;
  height: 30%;
  background-color: #016763;
  display: flex;
  justify-content: center;

  .content-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 7rem;
      height: 5rem;
    }
    span {
      font-size: 1.3rem;
      color: white;
    }
  }
}

.login-div {
  height: 70%;
  margin: 0 1.2rem;
  box-sizing: border-box;
  background-color: white;
  transform: translateY(-1.4rem);
  border-radius: 0.2rem;

  .username-div,
  .userpwd-div {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    .userName,
    .userPwd {
      height: 2.4rem;
      width: 90%;
      box-sizing: border-box;
      background-color: white;
      border: 1px solid #d2d2d2;
      border-radius: 0.4rem;
      padding-left: 1rem;
    }

    .activi {
      border: 1px solid #016763;
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      outline: none;
    }
  }

  .onSubmit {
    width: 90%;
    margin-left: 5%;
    margin-top: 3rem;
    background-color: #016763;
    border-radius: 0.4rem;
    color: white;
    font-size: 0.8rem;
  }

  .line-div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    .login-line{
      height: 0.1rem;
      width: 1.5rem;
      background-color: #016763;
    }
    .title{
      color: #016763;
      font-size: 1rem;
      padding: 0 0.3rem;
      font-weight: bold;
    }

  }
}
</style>