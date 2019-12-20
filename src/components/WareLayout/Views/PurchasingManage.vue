<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 5px;">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>进货管理</span>
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
        <span>进货管理</span>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          style="margin-left:85%"
          @click="addorder"
          circle
        ></el-button>
      </div>
      <div>
        <el-table ref="productTable" :data="list" style="width: 100%" border>
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="编号" prop="id" width="120" align="center"></el-table-column>
          <el-table-column label="采购清单编号" prop="purchasingListId" width="120" align="center"></el-table-column>
          <el-table-column label="商品编号" prop="productId" width="120" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="productName" align="center"></el-table-column>
          <el-table-column label="数量" prop="quantity" width="120" align="center"></el-table-column>
          <el-table-column label="进货时间" prop="purchaseDate" align="center"></el-table-column>
          <el-table-column label="负责人编号" prop="wareId" align="center"></el-table-column>
          <el-table-column label="发货单状态" prop="status" width="120" align="center">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button-group v-show="scope.row.status=='待确认'">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleCheck(scope.$index, scope.row)"
                >确认进货</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 输入要进货的商品及数量  -->
    <el-dialog title="输入应进货商品信息" :visible.sync="dialogFormVisible">
      <el-form
        ref="quantityform"
        :model="quantityform"
        :rules="rules"
        label-width="80px"
        style="width:40%;margin:0 auto;"
      >
        <el-form-item label="商品：" prop="productId">
          <el-select v-model="quantityform.productId" placeholder="请选择">
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量：" prop="quantity" style="width:300px">
          <el-input type="number" v-model="quantityform.quantity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addshippingorder">添 加</el-button>
        </el-form-item>
      </el-form>
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
        productId: "",
        quantity: ""
      },
      rules: {
        productId: [{ required: true, message: "请选择商品", trigger: "blur" }],
        quantity: [{ required: true, message: "请输入数量", trigger: "blur" }]
      },
      dialogFormVisible: false,
      list: [],
      products: []
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
        .getPurchaseOrders()
        .then(function(res) {
          that.list = res.data;
          console.log(res.data);
          that.list.forEach(item => {
            item.total = item.price * item.quantity;
            if (item.purchaseDate != null)
              item.purchaseDate = item.purchaseDate.split("T")[0];
          });
          // 获取自动生成的发货单列表
          that.$axios
            .getPurchaseOrdersExtra()
            .then(function(res) {
              console.log(res.data);
              res.data.forEach(item => {
                let temp = that.list.find(i => i.id === item.id);
                if (temp == null) {
                  if (item.purchaseDate != null)
                    item.purchaseDate = item.purchaseDate.split("T")[0];
                  that.list.push(item);
                }
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
      let that = this;
      let params = {
        id: row.id
      };
      // 发送确认发货的请求
      that.$axios
        .confirmPurchase(params)
        .then(function(res) {
          that.init();
        })
        .catch(function(error) {
          that.$alert("确认进货失败! " + error.data.msg, "提示", {
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
          .getPurchaseOrder(that.form)
          .then(function(res) {
            console.log(res.data);
            let list2 = [];
            if (res.data.purchaseDate != null)
              res.data.purchaseDate = res.data.purchaseDate.split("T")[0];
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
    addorder() {
      this.dialogFormVisible = true;
      // 获取商品列表
      this.globalData.token = this.$session.get("token");
      this.globalData.ROLE = this.$session.get("role");
      let that = this;
      that.$axios
        .getProducts()
        .then(function(res) {
          that.products = res.data;
          that.products.forEach(item => {
            item.name = item.name + " [" + item.id + "]";
          });
        })
        .catch(function(error) {
          that.$alert("获取商品列表失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    addshippingorder(){
      let that=this;
      console.log(that.quantityform);
      that.$refs.quantityform.validate(valid=>{
        if(valid){
          that.$axios
            .addPurchaseOrder(this.quantityform)
            .then(function(res) {
              that.$alert("添加进货单信息成功!", "提示", {
                confirmButtonText: "OK"
              });
              that.dialogFormVisible = false;
              that.init();
            })
            .catch(function(error) {
              that.$alert("添加进货单信息失败! " + error.data.msg, "提示", {
                confirmButtonText: "OK"
              });
              if (error.data.msg === "登录信息不存在，请重新登录") {
                that.$router.replace("/");
              }
            });
        }
      })
    }
  }
};
</script>

<style>
</style>

    
    