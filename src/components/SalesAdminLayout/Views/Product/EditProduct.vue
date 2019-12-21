<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>修改商品信息</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:70%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:55%;margin:0 auto;">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="form.name" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="商品描述：" prop="description">
        <el-input
          type="textarea"
          style="width:83%;"
          v-model="form.description"
          :readonly="isreadonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="数量：" prop="quantity">
        <el-input style="width:100px;" v-model="form.quantity" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="售价：" prop="price">
        <el-input style="width:100px;" v-model="form.price" :readonly="isreadonly"></el-input>
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
        name: "",
        description: "",
        quantity: "",
        price: "",
      },
      rules: {
        name: [
          { required: true,message: "请输入商品名称",trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
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
      let params = { id: this.$session.get("currentEditId")};
      let that = this;
      that.$axios
        .getProduct(params)
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
      that.form.id =  that.$session.get("currentEditId");
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .updateProduct(that.form)
            .then(function(res) {
              that.init();
              that.$alert("修改成功！", { confirmButtonText: "OK" });
              that.$router.replace("/ProductList");
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
      this.$router.replace("/ProductList");
    }
  }
};
</script>
