<template>
  <div>
    <h1>{{this.content}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
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
        .getPersonInfo()
        .then(function(res) { 
          console.log(res);
          that.content="销售员："+res.data.actualName+" 你好";
        })
        .catch(function(error) {
          that.$alert("获取登录信息失败! " + error.data.msg, "提示", { confirmButtonText: "OK" });
          if (error.data.msg === "登录信息不存在，请重新登录") { that.$router.replace("/"); }
        });
      
    },
  }
};
</script>

<style>
</style>