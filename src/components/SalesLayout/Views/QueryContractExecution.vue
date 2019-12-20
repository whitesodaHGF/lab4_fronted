<template>
  <div>
    <el-card class="box-card" style="width:100%;margin:0 auto;">
      <div slot="header" class="clearfix">
        <span>合同执行情况</span>
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
                <el-col :span="6" :offset="4"></el-col>
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
        <el-table-column label="合同编号" prop="id" align="center"></el-table-column>
        <el-table-column label="客户姓名" prop="customerName" align="center"></el-table-column>
        <el-table-column label="销售员姓名" prop="salesName" align="center"></el-table-column>
        <el-table-column label="状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="总金额" prop="price" width="120" align="center"></el-table-column>
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
      let total = 0.0;
      that.$axios
        .getFulfillContract()
        .then(function(res) {
          that.list = res.data;
          console.log(that.list);
          that.list.forEach(item => {
            total += parseFloat(item.price);
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
      let that = this;
      let total2 = 0;
      that.$axios
        .getFulfillContract(that.form)
        .then(function(res) {
          that.list = res.data;
          that.list.forEach(item => {
            total2 += parseFloat(item.price);
            that.total = total2;
          });
          that.total = total2;
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
