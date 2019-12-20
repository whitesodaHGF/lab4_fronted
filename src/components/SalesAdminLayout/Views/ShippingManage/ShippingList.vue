<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>采购单查询</span>
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
        <span>采购单管理</span>
      </div>
      <div>
        <el-table ref="productTable" :data="list" style="width: 100%" border>
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="编号" prop="id" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="contractId" align="center"></el-table-column>
          <el-table-column label="客户姓名" prop="customerName" align="center"></el-table-column>
          <el-table-column label="销售员姓名" prop="salesName" align="center"></el-table-column>
          <el-table-column label="商品编号" prop="productId" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="productName" width="130px" align="center"></el-table-column>
          <el-table-column label="总采购数量" prop="quantity" align="center"></el-table-column>
          <el-table-column label="已发货数量" prop="quantityShipped" align="center"></el-table-column>
          <el-table-column label="单价" prop="price" width="120" align="center"></el-table-column>
          <el-table-column label="总金额" prop="total" width="120" align="center"></el-table-column>
          <el-table-column label="发货状态" prop="status" width="120" align="center">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button-group v-show="scope.row.status=='待处理'">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleCheck(scope.$index, scope.row)"
                >生成发货单</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="输入应发货数量" :visible.sync="dialogFormVisible">
      <el-form ref="quantityform" :model="quantityform" :rules="rules">
        <el-form-item label="应发货数量:" prop="quantity" style="margin-left:35%;">
          <el-input
            type="number"
            v-model="quantityform.quantity"
            autocomplete="off"
            style="width:20%;"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left:35%;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addshippingorder">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: ""
      },
      quantityform: {
        quantity: ""
      },
      params: {
        id: "",
        quantity: ""
      },
      list: [],
      dialogFormVisible: false,
      rules: {
        quantity: [
          { required: true, message: "应发货数量不能为空", trigger: "blur" }
        ]
      }
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
        .getPurchasingListDTOs()
        .then(function(res) {
          that.list = res.data;
          console.log(that.list)
          that.list.forEach(item => {
            item.total = parseFloat(item.price * item.quantity);
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
    onSubmit() {
      if (this.form.id === "") {
        this.init();
      } else {
        let that = this;
        that.$axios
          .getPurchasingList(that.form)
          .then(function(res) {
            console.log(res.data);
            let list2 = [];
            if (res.data.birth != null)
              res.data.birth = res.data.birth.split("T")[0];
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
    },
    handleCheck(index, row) {
      this.params.id = row.id;
      this.dialogFormVisible = true;
    },
    addshippingorder() {
      this.params.quantity = this.quantityform.quantity;
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.params);
          // 限制发货数量
          if (this.params.quantity == 0 || this.params.quantity == "0") {
            this.$alert("发货数量不能等于0! ", "提示", {
              confirmButtonText: "OK"
            });
          } else {
            let that = this;
            // 发送添加发货单的请求
            that.$axios
              .addDelivery(this.params)
              .then(function(res) {
                console.log(res);
                that.init();
                that.$alert(res.data, "提示", {
                  confirmButtonText: "OK"
                });
                 //初始化全局变量
                this.params.id="";
                this.quantityform.quantity=0;
              })
              .catch(function(error) {
                that.$alert("添加发货单失败! " + error.data.msg, "提示", {
                  confirmButtonText: "OK"
                });
                if (error.data.msg === "登录信息不存在，请重新登录") {
                  that.$router.replace("/");
                }
              });
            this.dialogFormVisible = false;
          }
        }
      });
    }
  }
};
</script>
<style>
</style>

    
    
    
    
    