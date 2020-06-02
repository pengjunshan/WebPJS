<template>
  <div class="login_container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="login_img">
        <img src="../assets/logo.png" />
      </div>

      <!-- 账号密码框 -->
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="请输入账号"
            clearable
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            clearable
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录入参
      loginForm: {
        username: "",
        password: ""
      },
      //表单校验规则
      loginFormRules: {
        //账号校验规则
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //密码校验规则
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success("登录成功");
        /**
         * 1.将登录成功的token保存到客户端的sessionStorage中
         *   项目中除了登录API接口之外，所有接口都要登录之后才能访问
         *   token只在当前浏览器打开期间有效，所有把token存在sessionStorage中
         */
        window.sessionStorage.setItem("vuetoken", res.data.token);

        /**
         * 通过编程式导航跳到主页
         */
        this.$router.push("/home");
      });
      // this.$refs.loginFormRef.validate(valid => {
      //   if (!valid) return;
      //   this.$http.post("login", this.loginForm)
      //   .then(res=>{
      //     if(res.meta.status === 200){
      //     }
      //   }).catch(error=>{
      //     console.log(error)
      //   }).finally(aa=>{
      //     console.log("111111")
      //   });
      // });
    },
    //重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.login_img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #eee;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}

.login_form {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;

  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
