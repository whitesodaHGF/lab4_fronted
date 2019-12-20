<template>
  <el-card class="box-card" style="width:55%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>添加商品</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:70%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width:55%;margin:0 auto;">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="form.name" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="售价：" prop="price">
        <el-input style="width:100px;" v-model="form.price" :readonly="isreadonly"></el-input>
      </el-form-item>
      <el-form-item label="商品描述：" prop="description">
        <el-input
          type="textarea"
          style="width:90%;"
          v-model="form.description"
          :readonly="isreadonly"
        ></el-input>
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
        price: "",
        description: ""
      },
      rules: {
        name: [
          { required: true,message: "请输入商品名称",trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    onSubmit(event) {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .addProduct(that.form)
            .then(function(res) {
              that.$alert("添加成功！", { confirmButtonText: "OK" });
              that.$router.replace("/ProductList");
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
      this.$router.replace("/ProductList");
    }
  }
};
</script>


  
  
  
  