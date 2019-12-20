<template>
  <el-card class="box-card" style="width:100%;margin-top: 5px;">
    <div slot="header" class="clearfix">
      <i class="el-icon-tickets"></i>
      <span>物流信息管理</span>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        style="margin-left:80%"
        @click="dialogFormVisible = true"
      ></el-button>
      <el-button
        size="small"
        type="danger"
        icon="el-icon-back"
        @click="backto"
      ></el-button>
    </div>
    <div class="block" style="margin-left:10%;margin-top:5%;">
      <el-timeline reverse>
        <el-timeline-item
          v-for="(activity, index) in list"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </div>

    <el-dialog title="物流信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="物流信息内容:" prop="content" style="margin-left:10%;">
          <el-input type="textarea" v-model="form.content" autocomplete="off" style="width:70%;"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left:35%;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">添 加</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          content: "支持图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-check"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ],
      form: {
        content: "",
        orderId: this.$session.get("currentEditId")
      },
      rules: {
        content: [
          { required: true, message: "物流信息不能为空", trigger: "blur" }
        ]
      },
      list: [],
      dialogFormVisible: false
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
      let orderId = this.$session.get("currentEditId");
      let params = {
        orderId: orderId
      };
      that.$axios
        .getLogisticInfos(params)
        .then(function(res) {
          that.list = res.data;
          that.list[that.list.length - 1].icon = "el-icon-check";
          that.list[that.list.length - 1].type = "primary";
          that.list.forEach(item => {
            item.timestamp = item.date.split("T")[0];
            item.size = "large";
            delete item.orderId;
          });
        })
        .catch(function(error) {
          that.$alert("获取物流信息列表失败! " + error.data.msg, "提示", {
            confirmButtonText: "OK"
          });
          if (error.data.msg === "登录信息不存在，请重新登录") {
            that.$router.replace("/");
          }
        });
    },
    addInfo() {
      let that = this;
      that.$refs.form.validate(valid => {
        if (valid) {
          that.$axios
            .addLogisticsInfo(this.form)
            .then(function(res) {
              that.list = res.data;
              that.$alert("添加物流信息成功!", "提示", {
                confirmButtonText: "OK"
              });
              that.dialogFormVisible = false;
              that.init();
            })
            .catch(function(error) {
              that.$alert("添加物流信息失败! " + error.data.msg, "提示", {
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
      this.$router.replace("/LogisticsInfoList");
    }
  }
};
</script>