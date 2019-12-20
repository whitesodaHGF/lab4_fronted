<template>
  <div class="login-container">
    <el-form
      :model="UserAuth"
      :rules="rules"
      status-icon
      ref="UserAuth"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="UserAuth.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="UserAuth.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <br />
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      UserAuth: {
        username: "defaultAdmin",
        password: "12345678"
      },
      rules: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      let that = this;
      this.$refs.UserAuth.validate(valid => {
        if (valid) {
          // 调用接口获取token和登录信息
          that.$axios
            .login(this.UserAuth)
            .then(function(res) {
              that.globalData.token = res.data;
              that.$session.set("token",res.data);
              that.$session.set("role",that.globalData.ROLE);
              that.logining = true;
              let role = that.globalData.ROLE;
              if (role === "SalesAdmin") {
                that.$router.replace("/SalesAdminMainPage");
              } else if (role === "Sales") {
                that.$router.replace("/SalesMainPage");
              } else {
                that.$router.replace("/WareMainPage");
              }
            })
            .catch(function(error) {
              if (error.data != null) {
                that.$alert("登录失败! " + error.data.msg, "提示", {
                  confirmButtonText: "OK"
                });
              } else {
                that.$alert("登录失败! " + "网络异常", "提示", {
                  confirmButtonText: "OK"
                });
              }
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>