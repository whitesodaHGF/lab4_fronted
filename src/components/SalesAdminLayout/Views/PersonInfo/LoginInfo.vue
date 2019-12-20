<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>登录信息管理</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="width:55%;margin:0 auto;"
    >
      <el-form-item label="用户名：">
        <el-input v-model="form.username" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="用户权限：">
        <el-input v-model="form.role" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="原密码：" prop="originPwd">
        <el-input v-model="form.originPwd" type="password" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onEdit">编辑</el-button>
        <el-button type="primary" @click="onSubmit">修改登录密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.el-input {
  width: 220px;
}
.el-from {
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      isreadonly: true,
      form: {
        username: "",
        role: "",
        originPwd: "",
        newPwd: ""
      },
      rules: {
        originPwd: [
           { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ]
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.globalData.token = this.$session.get("token");
      this.globalData.ROLE = this.$session.get("role");
      let that = this;
      that.$axios
        .getLoginInfo()
        .then(function(res) { that.form = res.data; })
        .catch(function(error) {
          that.$alert("获取登录信息失败! " + error.data.msg, "提示", { confirmButtonText: "OK" });
          if (error.data.msg === "登录信息不存在，请重新登录") { that.$router.replace("/"); }
        });
    },
    onSubmit(event) {
      let that = this;
      let params = {
        originPwd: that.form.originPwd,
        newPwd: that.form.newPwd
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .updateLoginInfo(params)
            .then(function(res) {
              init();
              that.$alert("修改成功！", { confirmButtonText: "OK" });
            })
            .catch(function(error) {
              console.log(error);
              that.$alert("修改失败！ " + error.data.msg, "提示", {
                confirmButtonText: "OK"
              });
              if (error.data.msg === "登录信息不存在，请重新登录") {
                that.$router.replace("/");
              }
            });
        }
      });
    },
    onEdit() {
      this.isreadonly = !this.isreadonly;
    }
  }
};
</script>



