<template>
  <el-card class="box-card" style="width:90%;margin:0 auto;">
    <div slot="header" class="clearfix">
      <span>修改合同信息</span>
      <el-button type="primary" icon="el-icon-back" style="margin-left:80%" @click="backto" circle></el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width:80%;margin:0 auto;">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="客户编号：" prop="customerId">
            <el-select v-model="form.customerId" placeholder="请选择">
              <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="销售人员工号：" prop="salespeopleId">
            <el-select v-model="form.salespeopleId" placeholder="请选择">
              <el-option v-for="item in sales" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="生效日期：" prop="effectiveDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.effectiveDate"
              :readonly="isreadonly"
              @change="startTimeStatus"
              :picker-options="pickerOptionsStart"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="5">
          <el-form-item label="失效日期：" prop="expirationDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.expirationDate"
              :readonly="isreadonly"
              @change="endTimeStatus"
              :picker-options="pickerOptionsEnd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="签订日期：" prop="signingDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.signingDate"
              :readonly="isreadonly"
              :picker-options="pickersigningDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="5">
          <el-form-item label="发货地址：" prop="address">
            <el-input v-model="form.address" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="合同描述：" style="width:85%;" prop="description">
        <el-input type="textarea" v-model="form.description" :readonly="isreadonly"></el-input>
      </el-form-item>
    </el-form>

    <el-card class="box-card" style="width:90%;margin:0 auto;">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          style="margin-left:83%"
          @click="addproduct"
          circle
        ></el-button>
      </div>

      <!-- !!!!!!!!!!!! -->
      <el-table :data="purchasingLists" style="width: 100%" border highlight-current-row>
        <el-table-column prop="id" label="商品编号">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.id"
              placeholder="请选择"
              v-show="scope.row.showEdit"
              :disabled="scope.row.idEdit"
            >
              <el-option
                v-for="item in products"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!--通过v-show和对行数据中的编辑状态变量取反来动态切换编辑状态-->
            <!--v-show相比v-if有更高的初始渲染消耗，适合频繁切换的场合-->
            <span v-show="!scope.row.showEdit">{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="商品名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入内容"
              v-show="scope.row.showEdit"
              disabled
            ></el-input>
            <span v-show="!scope.row.showEdit">{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.showEdit"
              v-model="scope.row.price"
              placeholder="请输入内容"
              disabled
            ></el-input>
            <span v-show="!scope.row.showEdit">{{scope.row.price}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="quantity" label="数量">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.showEdit"
              v-model="scope.row.quantity"
              placeholder="请输入内容"
              required
            ></el-input>
            <span v-show="!scope.row.showEdit">{{scope.row.quantity}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="total" label="总金额">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.showEdit"
              v-model="scope.row.total"
              placeholder="请输入内容"
              disabled
            ></el-input>
            <span v-show="!scope.row.showEdit">{{scope.row.total}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--scope可以取到行索引(scope.$index)和行数据(scope.row)-->
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >{{scope.row.showEdit?'保存':"修改"}}</el-button>
            <!--这里用到v-if，主要是跟后边的v-else配合使用，也可以用v-show，不过实现方式不一样哦，具体自己再去摸索吧-->
            <el-button
              size="small"
              v-if="!scope.row.showEdit"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              size="small"
              v-else
              type="danger"
              @click="changenumber(scope.$index, scope.row)"
            >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br />
    <el-button style="margin-left:43%" type="primary" @click="onSubmit">修改</el-button>

    <!-- 删除提示框 -->

    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
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
import axios from "axios";
export default {
  data() {
    return {
      isvalid: false,
      isreadonly: false,
      form: {
        customerId: "",
        salespeopleId: "",
        effectiveDate: "",
        expirationDate: "",
        signingDate: "",
        description: "",
        address: ""
      },
      rules: {
        customerId: [
          { required: true,message: "请选择客户",trigger: "blur" }
        ],
        salespeopleId: [
          { required: true, message: "请选择销售人员", trigger: "blur" }
        ],
        effectiveDate: [
          { required: true, message: '请选择生效日期', trigger: 'blur' }
        ],
        expirationDate: [
          { required: true, message: "请选择失效日期", trigger: "blur" }
        ],
        signingDate: [
          { required: true, message: '请选择签订日期', trigger: 'blur' }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ]
      },
      contractid: "",
      customers: [],
      sales: [],
      products: [],
      purchasingLists: [],
      delVisible: false, //删除提示弹框的状态
      prenumber: "", //修改前数量
      pickersigningDate: {
        //设置选择今天以及今天以前的日期
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      //设置结束日期大于开始日期
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.expirationDate;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.effectiveDate;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        }
      }
    };
  },
  created() {
    this.selectitem_init();
    // this.init();
  },
  methods: {
    selectitem_init() {
      this.globalData.token = this.$session.get("token");
      this.globalData.ROLE = this.$session.get("role");
      // 待选择的客户，销售人员，商品的下拉列表初始化
      this.isvalid = true;
      let that = this;
      //  客户
      if (that.isvalid) {
        that.$axios
          .getCustomers()
          .then(function(res) {
            that.customers = res.data;
            that.customers.forEach(item => {
              item.name = item.name + " [" + item.id + "]";
            });

            // 销售人员
            if (that.isvalid) {
              that.$axios
                .getSalesPeoples()
                .then(function(res) {
                  that.sales = res.data;
                  that.sales.forEach(item => {
                    item.username = item.actualName + " [" + item.id + "]";
                  });

                  // 商品
                  if (that.isvalid) {
                    that.$axios
                      .getProducts()
                      .then(function(res) {
                        that.products = res.data;
                        that.products.forEach(item => {
                          item.name = item.name + " [" + item.id + "]";
                        });

                        that.init();
                      })
                      .catch(function(error) {
                        that.$alert(
                          "获取商品列表失败! " + error.data.msg,
                          "提示",
                          {
                            confirmButtonText: "OK"
                          }
                        );
                        that.isvalid = false;
                        if (error.data.msg === "登录信息不存在，请重新登录") {
                          that.$router.replace("/");
                        }
                      });
                  }
                })
                .catch(function(error) {
                  that.$alert("获取用户列表失败! " + error.data.msg, "提示", {
                    confirmButtonText: "OK"
                  });
                  that.isvalid = false;
                  if (error.data.msg === "登录信息不存在，请重新登录") {
                    that.$router.replace("/");
                  }
                });
            }
          })
          .catch(function(error) {
            that.$alert("获取客户列表失败! " + error.data.msg, "提示", {
              confirmButtonText: "OK"
            });
            if (error.data.msg === "登录信息不存在，请重新登录") {
              that.$router.replace("/");
            }
          });
      }
      return true;
    },
    init() {
      // 合同信息初始化
      let params = { id: this.$session.get("currentEditId") };
      let that = this;
      that.$axios
        .getContract(params)
        .then(function(res) {
          that.form = res.data;
          that.contractid = res.data.id;
          console.log(that.contractid);
        })
        .catch(function(error) {
          that.$alert("获取合同信息失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });

      // 采购订单信息初始化
      that.$axios
        .getPurchasingListByContractId(params)
        .then(function(res) {
          // 按照采购清单上的信息得到商品信息显示
          let temp = res.data;
          temp.forEach(item => {
            //
            let Productparams = { id: item.productId };
            that.$axios
              .getProduct(Productparams)
              .then(function(res) {
                let content = {
                  purchasingListId: "", // 采购清单编号
                  id: item.productId, // 商品编号
                  name: "",
                  price: "",
                  quantity: item.quantity, // 商品个数
                  total: "",
                  idEdit: true,
                  showEdit: false
                };
                content.name = res.data.name;
                content.price = res.data.price;
                content.total = content.price * content.quantity;
                content.purchasingListId = item.id;
                // 重新填写商品编号
                that.purchasingLists.push(content);

                // 删除商品下拉列表中的商品
                that.products.splice(
                  that.products.findIndex(i => i.id === content.id),
                  1
                );
              })
              .catch(function(error) {
                that.$alert("获取商品信息失败! " + error.data.msg, "提示", {
                  confirmButtonText: "OK"
                });
                if (error.data.msg === "登录信息不存在，请重新登录") {
                  that.$router.replace("/");
                }
              });
          });
        })
        .catch(function(error) {
          that.$alert("获取采购订单信息失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    onSubmit(event) {
      let that = this;
      console.log(that.purchasingLists);
      that.form.id = that.$session.get("currentEditId");
      that.purchasingLists.forEach(item => {
        delete item.showEdit;
        delete item.total;
      });

      that.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .updateContract(this.form)
            .then(function(res) {
              // 删除原有属性，加入合同编号
              that.purchasingLists.forEach(item => {
                delete item.showEdit;
                delete item.total;
                delete item.name;
                delete item.price;
                delete item.idEdit;
                let temp = item.id;
                item.id = item.purchasingListId;
                item.productId = temp;
                delete item.purchasingListId;
                console.log(that.contractid);
                item.contractId = that.contractid;
                console.log(item);

                // 分条插入采购清单
                that.$axios
                  .updatePurchasingList(item)
                  .then(function(res) {
                    console.log(res);
                  })
                  .catch(function(error) {
                    that.isvalid = false;
                    console.log(error);
                    that.$alert("修改失败！ " + error.data.msg, "提示", {
                      confirmButtonText: "OK"
                    });
                    if (error.data.msg === "登录信息不存在，请重新登录") {
                      that.$router.replace("/");
                    }
                  });
              });

              that.$alert("修改成功！", { confirmButtonText: "OK" });
              that.$router.replace("/ContractList");
            })
            .catch(function(error) {
              console.log(error);
              that.$alert("修改失败！ " + error.data.msg, "提示", {
                confirmButtonText: "OK"
              });
              if (error.data.msg === "登录信息不存在，请重新登录") {
                that.$router.replace("/");
              }
            });
        }
      });
    },
    backto() {
      this.$session.set("currentEditId", "");
      this.$router.replace("/ContractList");
    },
    // 获取操作的一行的数据row，将其中的编辑状态变量showEdit取反，切换状态
    // 也可以去掉，在@click中直接取反
    handleEdit(index, row) {
      row.showEdit = !row.showEdit;

      // 修改情况下，全局变量存储原有数量
      this.prenumber = row.quantity;

      // 保存情况下，获取商品其他信息
      if (row.showEdit === false) {
        this.prenumber = 0;
        let that = this;
        let params = { id: row.id };

        // 删除商品下拉列表中的商品
        that.products.splice(
          that.products.findIndex(item => item.id === row.id),
          1
        );

        // 只输入商品编号和数量
        this.$axios
          .getProduct(params)
          .then(function(res) {
            row.name = res.data.name;
            row.price = res.data.price;
            row.total = row.price * row.quantity;
            row = res.data;
          })
          .catch(function(error) {
            that.$alert("获取商品信息失败! " + error.data.msg, "提示", {
              confirmButtonText: "OK"
            });
            if (error.data.msg === "登录信息不存在，请重新登录") {
              that.$router.replace("/");
            }
            // 重新填写商品编号
            row.showEdit = !row.showEdit;
          });
      }
    },
    // 删除
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    // 确认删除
    deleteRow() {
      console.log("删除了！");
      let that = this;
      this.delVisible = false;

      let paramid = this.purchasingLists[this.idx];

      // 发送请求删除该采购清单
      if (paramid.purchasingListId != null) {
        let params = {
          data: {
            id: paramid.purchasingListId
          }
        };
        console.log(params);

        // 发送请求
        that.$axios
          .deletePurchasingList(params)
          .then(function(res) {
            that.$alert("删除成功！ " + error.data.msg, "提示", {
              confirmButtonText: "OK"
            });
          })
          .catch(function(error) {
            console.log(error);
            that.$alert("删除失败！ " + error.data.msg, "提示", {
              confirmButtonText: "OK"
            });
            if (error.data.msg === "登录信息不存在，请重新登录") {
              that.$router.replace("/");
            }
          });
      }

      this.purchasingLists.splice(this.idx, 1);

      // 重新加载商品下拉列表
      that.$axios
        .getProducts()
        .then(function(res) {
          that.products = res.data;
          that.products.forEach(item => {
            item.name = item.name + " [" + item.id + "]";
          });

          console.log(that.products);
          // 下拉列表删除已有商品
          that.purchasingLists.forEach(i => {
            that.products.splice(
              that.products.findIndex(j => j.id === i.id),
              1
            );
          });
        })
        .catch(function(error) {
          console.log(error);
          that.$alert("获取商品列表失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          that.isvalid = false;
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    addproduct() {
      this.purchasingLists.push({
        id: "",
        name: "",
        price: "",
        quantity: "",
        total: "",
        showEdit: true
      });
    },
    selectProduct() {},
    changenumber(index, row) {
      row.showEdit = !row.showEdit;
      row.quantity = this.prenumber;
    },
    // 时间开始选择器
    startTimeStatus: function(value) {
      this.effectiveDate = value;
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.expirationDate = value;
    }
  }
};
</script>
