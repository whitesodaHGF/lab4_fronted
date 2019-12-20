<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
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
          <router-link to="/PersonalInfo">
            <el-menu-item index="1-1">个人信息</el-menu-item>
          </router-link>
          <router-link to="/LoginInfo">
            <el-menu-item index="1-2">登录信息管理</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/SalesList">
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">销售员工管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/CustomerList">
          <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/ProductList">
          <el-menu-item index="4">
            <i class="el-icon-present"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/ContractList">
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <span slot="title">合同管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/ShippingList">
          <el-menu-item index="6">
            <i class="el-icon-truck"></i>
            <span slot="title">添加发货单</span>
          </el-menu-item>
        </router-link>
        <router-link to="/QuerySalesStatistic">
          <el-menu-item index="7">
            <i class="el-icon-data-line"></i>
            <span slot="title">销售数据管理</span>
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
  
  
  
  
  
3.1 3.	商品查询
3.2 3.	商品添加
3.3 3.	商品修改
