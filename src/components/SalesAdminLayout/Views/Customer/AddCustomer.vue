<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>添加客户信息</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:60%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:55%;margin:0 auto;">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="住址：" prop="address" >
        <el-input v-model="form.address" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone" >
        <el-input v-model="form.phone" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description" >
        <el-input type="textarea" v-model="form.description" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onEdit">编辑</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
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
      isreadonly: false,
      form: {
        name: "",
        address: "",
        phone: "",
        description: ""
      },
      rules: {
        name: [
          { required: true,message: "请输入姓名",trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入住址", trigger: "blur" }
        ],
        phone: [
           { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit(event) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .addCustomer(that.form)
            .then(function(res) {
              console.log(res);
              that.$alert("添加成功！", { confirmButtonText: "OK" });
              that.$router.replace("/CustomerList");
            })
            .catch(function(error) {
              console.log(error);
              that.$alert("添加失败！ " + error.data.msg, "提示", {
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
    },
    changeDate(val) {
      this.form.birth = val;
      console.log(val);
    },
    backto() {
      this.$session.set("currentEditId","");
      this.$router.replace("/CustomerList");
    }
  }
};
</script>


