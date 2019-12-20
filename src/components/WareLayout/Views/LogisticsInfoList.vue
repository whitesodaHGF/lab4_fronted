<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>物流信息管理</span>
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
        <span>物流信息管理</span>
      </div>
      <div>
        <el-table ref="productTable" :data="list" style="width: 100%" border>
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="编号" prop="id" width="120" align="center"></el-table-column>
          <el-table-column label="采购清单编号" prop="purchasingListId" width="120" align="center"></el-table-column>
          <el-table-column label="商品编号" prop="productId" width="120" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="productName" align="center"></el-table-column>
          <el-table-column label="数量" prop="quantity" width="120" align="center"></el-table-column>
          <el-table-column label="收货地址" prop="receiptAddress" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleCheck(scope.$index, scope.row)"
                >修改物流信息</el-button>
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
      form: {
        id: ""
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
        .getShippingOrders()
        .then(function(res) {
          that.list = res.data;
          that.list.forEach(item => {
            item.total = item.price * item.quantity;
            if (item.shippingDate != null)
              item.shippingDate = item.shippingDate.split("T")[0];
          });
        })
        .catch(function(error) {
          that.$alert("获取采购单列表失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    handleCheck(index, row) {
      this.$session.set("currentEditId", row.id);
      this.$router.replace("/EditLogisticInfo");
    },
    onSubmit() {
      if (this.form.id === "") {
        this.init();
      } else {
        let that = this;
        that.$axios
          .getShippingOrder(that.form)
          .then(function(res) {
            console.log(res.data);
            let list2 = [];
            if (res.data.shippingDate != null)
              res.data.shippingDate = res.data.shippingDate.split("T")[0];
            list2.push(res.data);
            that.list = list2;
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

    
    
    
    
    