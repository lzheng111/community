<template>
   <el-card class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>待缴费列表</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="goPay">查看更多</el-button>
  </div>
  <div v-for="(item,index) in payList" :key="index" class="text item">
   <span>住户:{{item.name}} 地址:{{item.site}} 待缴:{{item.content}} </span>
  </div>
</el-card>

</template>

<script>
export default {
  name:"PayItem",
  data(){
    return{
      payList:[]
    }
  },
   created() {
    this.$http({
      path: "api/check/nopay",
      method: "post",
    })
      .then((rel) => {
        this.payList = rel.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
     goPay() {
      this.$router.push({
        path: "/admin/pay",
      });
    },
  }
}
</script>
<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 35%;
    height: 260px;
    margin-bottom: 50px;
    overflow: hidden;
  }
</style>