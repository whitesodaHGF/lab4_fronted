<template>
  <div>
    <el-card class="box-card" style="width:100%;margin:0 auto;">
      <div slot="header" class="clearfix">
        <span>销售额统计</span>
      </div>
      <el-row :gutter="2">
        <el-col :span="8">
          <el-card class="box-card" style="height:160px" shadow="hover">
            <br />
            <p style="margin-left:20%">总金额：￥{{total}}</p>
            <br />
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="box-card" style="height:160px" shadow="hover">
            <el-form ref="form" :model="form" label-width="100px" style="margin-left:10%">
              <el-row :gutter="1">
                <el-col :span="6">
                  <el-form-item label="时间区间：">
                    <el-date-picker
                      v-model="form.date"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00', '23:59:59']"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="10">
                  <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="1">
                <el-col :span="6">
                  <el-form-item label="客户姓名：" prop="customerName">
                    <el-input v-model="form.customerName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                  <el-form-item label="商品姓名：" prop="productName">
                    <el-input v-model="form.productName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <el-card class="box-card" style="width:100%;margin:0 auto;">
      <el-table ref="productTable" :data="list" style="width: 100%" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" prop="id" width="120" align="center"></el-table-column>
        <el-table-column label="合同编号" prop="contractId" width="120" align="center"></el-table-column>
        <el-table-column label="客户姓名" prop="customerName" width="120" align="center"></el-table-column>
        <el-table-column label="销售员姓名" prop="salesName" width="120" align="center"></el-table-column>
        <el-table-column label="商品编号" prop="productId" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="productName" width="120" align="center"></el-table-column>
        <el-table-column label="数量" prop="quantity" width="120" align="center"></el-table-column>
        <el-table-column label="单价" prop="price" width="120" align="center"></el-table-column>
        <el-table-column label="总金额" prop="total" width="120" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
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
      form: {
        customerName: "",
        productName: "",
        date: []
      },
      list: [],
      total: 0
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
      let total = 0;
      that.$axios
        .getSalesStatistic()
        .then(function(res) {
          that.list = res.data;
          that.list.forEach(item => {
            item.total = item.price * item.quantity;
            total += item.total;
          });
          that.total = total;
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
    onSubmit() {
      this.form.StartDate = "";
      this.form.EndDate = "";
      if (this.form.date != null) {
        this.form.StartDate = this.form.date[0];
        this.form.EndDate = this.form.date[1];
      }

      delete this.form.date;
      console.log(this.form);
      let that = this;
      let total=0;
      that.$axios
        .getSalesStatistic(that.form)
        .then(function(res) {
          console.log(res);
          that.list = res.data;
          that.list.forEach(item => {
            console.log(item)
            item.total = item.price * item.quantity;
            total += item.total;
          }); 
          that.total = total;
          console.log(that.list)
        })
        .catch(function(error) {
          that.$alert("获取采购单列表失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    }
  }
};
</script>
