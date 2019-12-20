<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>修改销售人员信息</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:60%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:55%;margin:0 auto;">
      <el-form-item label="姓名：" prop="actualName">
        <el-input v-model="form.actualName" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="form.sex" :readonly="isreadonly" label="男">男</el-radio>
        <el-radio v-model="form.sex" :readonly="isreadonly" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone" >
        <el-input v-model="form.phone" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="生日：">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期" prop="birth" 
            v-model="form.birth"
            :readonly="isreadonly"
            @change="changeDate"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证：" prop="card" >
        <el-input v-model="form.card" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="出生地：" prop="birthplace" >
        <el-input v-model="form.birthplace" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="住址：" prop="address" >
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
      isreadonly: true,
      form: {
        actualName: "",
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
          { min: 18, max: 18, message: '长度不合法', trigger: 'blur' }
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
      let params = { id: this.$session.get("currentEditId") };
      let that=this;
      that.$axios
        .getSalesPeople(params)
        .then(function(res) {
          that.form = res.data;
        })
        .catch(function(error) {
          that.$alert("获取用户信息失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    onSubmit(event) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .updateSalesPeople(that.form)
            .then(function(res) {
              that.init();
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
