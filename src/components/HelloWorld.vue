<template>
  <div class="App">
    <el-container>
      <el-aside width="220px">
        <router-view name="left" />
      </el-aside>
      <el-container>
        <el-header>
          <router-view name="head" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

