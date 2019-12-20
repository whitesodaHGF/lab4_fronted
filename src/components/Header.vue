<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" style="width: 220px;text-align: center;font-size: small;">销售管理后台系统</el-menu-item>
    <el-menu-item index="2" right="0px">
      <router-link to="/">退出系统</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    }
  }
};
</script>

<style >
.el-header {
  padding: 0 0px;
  border-right: solid 1px;
}
</style>
