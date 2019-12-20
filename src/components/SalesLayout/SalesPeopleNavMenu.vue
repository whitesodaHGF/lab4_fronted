<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      > 
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <router-link to="/SalesPersonalInfo">
            <el-menu-item index="1-1">个人信息</el-menu-item>
          </router-link>
          <router-link to="/SalesLoginInfo">
            <el-menu-item index="1-2">登录信息管理</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/QueryContractExecution">
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">查询合同执行情况</span>
          </el-menu-item>
        </router-link>
        <router-link to="/QuerySalesPerformance">
          <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">查询销售业绩</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<style>
.el-menu {
  border-right: solid 0px;
}
.el-container {
  height: -webkit-fill-available;
}
.el-aside {
  background: rgb(84, 92, 100);
  height: auto;
}
</style>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
