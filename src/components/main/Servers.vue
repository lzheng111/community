<template>
   <el-card class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>待维修列表</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="goServers">查看更多</el-button>
  </div>
  <div v-for="(item,index) in serversList" :key="index" class="text item">
    <span>地址:{{item.site}} 住户:{{item.name}} 维修内容:{{item.type}}</span>
  </div>
</el-card>
</template>

<script>
export default {
  name:"ServersItem",
  data(){
    return{
      serversList:[]
    }
  },
   created() {
    this.$http({
      path: "api/check/norepairs",
      method: "post",
    })
      .then((rel) => {
        this.serversList = rel.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
     goServers() {
      this.$router.push({
        path: "/admin/repairs",
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