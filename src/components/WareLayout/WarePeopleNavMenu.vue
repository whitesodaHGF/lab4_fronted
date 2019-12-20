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
          <router-link to="/WarePersonalInfo">
            <el-menu-item index="1-1">个人信息</el-menu-item>
          </router-link>
          <router-link to="/WareLoginInfo">
            <el-menu-item index="1-2">登录信息管理</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/ShippingManage">
          <el-menu-item index="2">
            <i class="el-icon-sell"></i>
            <span slot="title">发货管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/PurchasingManage">
          <el-menu-item index="3">
            <i class="el-icon-sold-out"></i>
            <span slot="title">进货管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/LogisticsInfoList">
          <el-menu-item index="4">
            <i class="el-icon-truck"></i>
            <span slot="title">物流信息管理</span>
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
