<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>合同查询</span>
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
        <span>合同管理</span>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left:83%"
          @click="addContract"
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
          <el-table-column label="合同编号" prop="id" width="120" align="center"></el-table-column>
          <el-table-column label="客户编号" prop="customerId" width="120" align="center"></el-table-column>
          <el-table-column label="销售人员工号" prop="salespeopleId" align="center"></el-table-column>
          <el-table-column label="合同履行状态" prop="isFulfill" width="120" align="center"></el-table-column>
          <el-table-column label="签订日期" prop="signingDate" width="120" align="center"></el-table-column>
          <el-table-column label="生效日期" prop="effectiveDate" width="120" align="center"></el-table-column>
          <el-table-column label="失效日期" prop="expirationDate" width="120" align="center"></el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleCheck(scope.$index, scope.row)"
                >查看详情</el-button>
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
        .getContracts()
        .then(function(res) {
          that.list = res.data;
          that.list.forEach(item => {
            if (item.signingDate != null)
              item.signingDate = item.signingDate.split("T")[0];
            if (item.effectiveDate != null)
              item.effectiveDate = item.effectiveDate.split("T")[0];
            if (item.expirationDate != null)
              item.expirationDate = item.expirationDate.split("T")[0];
          });
        })
        .catch(function(error) {
          that.$alert("获取合同列表失败! " + error.data.msg, "提示", {
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
      if (row.isFulfill === "未履行") {
        this.$session.set("currentEditId", row.id);
        this.$router.replace("/EditContract");
      } else {
        this.$alert("合同已经处于不可更改状态", "提示", {
          confirmButtonText: "OK"
        });
      }
    },
    handleCheck(index, row) {
      let that = this;
      this.$session.set("currentEditId", row.id);
      this.$router.replace("/CheckContract");
    },
    addContract() {
      this.$router.replace("/AddContract");
    },
    onSubmit() {
      if (this.form.id === "") {
        this.init();
      } else {
        let that = this;
        that.$axios
          .getContract(that.form)
          .then(function(res) {
            console.log(res.data);
            let list2 = [];
            if (res.data.signingDate != null)
              res.data.signingDate = res.data.signingDate.split("T")[0];
            if (res.data.effectiveDate != null)
              res.data.effectiveDate = res.data.effectiveDate.split("T")[0];
            if (res.data.expirationDate != null)
              res.data.expirationDate = res.data.expirationDate.split("T")[0];
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

    
    
    
    
    