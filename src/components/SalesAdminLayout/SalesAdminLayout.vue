<template>
  <el-container>
      <el-aside width="220px">
       <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import NavMenu from './SalesAdminNavmenu';
import Header from './../Header';
export default {
    components:{
        NavMenu,
        Header
    }
}
</script>

<style>

</style>