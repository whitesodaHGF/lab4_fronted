<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>添加客户信息</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:60%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:55%;margin:0 auto;">
      <el-form-item label="姓名：" prop="actualName">
        <el-input v-model="form.actualName" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio v-model="form.sex" :readonly="isreadonly" label="男">男</el-radio>
        <el-radio v-model="form.sex" :readonly="isreadonly" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="form.phone" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="生日：">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            :readonly="isreadonly"
            @change="changeDate"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证：">
        <el-input v-model="form.card" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="出生地：">
        <el-input v-model="form.birthplace" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="住址：">
        <el-input v-model="form.address" :readonly="isreadonly"></el-input>
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
        actualName: "",
        username: "",
        sex: "",
        phone: "",
        birth: "",
        card: "",
        birthplace: "",
        address: ""
      },
      rules: {
        actualName: [
          { required: true,message: "请输入用户名",trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" }
        ],
        phone: [
           { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        card: [
          { max: 18, message: '长度不合法', trigger: 'blur' }
        ]
      },
    };
  },
  created() {},
  methods: {
    onSubmit(event) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .addSalesPeople(that.form)
            .then(function(res) {
              that.$alert("添加成功！", { confirmButtonText: "OK" });
              that.$router.replace("/SalesList");
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
      this.$router.replace("/SalesList");
    }
  }
};
</script>
