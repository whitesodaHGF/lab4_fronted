<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>商品管理</span>
      </div>
      <div>
        <el-row :gutter="2">
          <el-col :span="16">
            <el-form ref="form" :model="form" label-width="100px" style="margin-left:10%">
              <el-row :gutter="1">
                <el-col :span="6">
                  <el-form-item label="编号：" prop="id">
                    <el-input v-model="form.id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>商品管理</span>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left:83%"
          @click="addProduct"
          circle
        ></el-button>
      </div>
      <div>
        <el-table
          ref="productTable"
          :data="list"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
          <el-table-column label="编号" prop="id" width="120" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="name" width="120" align="center"></el-table-column>
          <el-table-column label="商品描述" prop="description" align="center"></el-table-column>
          <el-table-column label="数量" prop="quantity" width="120" align="center"></el-table-column>
          <el-table-column label="售价" prop="price" width="120" align="center"></el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        id:''
      },
      list: []
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
        .getProducts()
        .then(function(res) {
          that.list = res.data;
        })
        .catch(function(error) {
          that.$alert("获取商品列表失败! " + error.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      let that = this;
      this.$session.set("currentEditId", row.id);
      this.$router.replace("/EditProduct");
    },
    addProduct() {
      this.$router.replace("/AddProduct");
    },
    onSubmit() {
      if (this.form.id === "") {
        this.init();
      } else {
        let that = this;
        that.$axios
          .getProduct(that.form)
          .then(function(res) {
            console.log(res.data)
            let list2=[];
            if (res.data.birth != null) res.data.birth = res.data.birth.split("T")[0];
            list2.push(res.data);
            that.list=list2;
          })
          .catch(function(error) {
            that.$alert("获取用户列表失败! " + error.data.msg, "提示", {
              confirmButtonText: "OK"
            });
            if (error.data.msg === "登录信息不存在，请重新登录") {
              that.$router.replace("/");
            }
          });
      }
    }
  }
};
</script>

<style>
</style>

    
    
    
    
    