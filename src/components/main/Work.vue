<template>
   <el-card class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>反馈列表</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="goComplaint">查看更多</el-button>
  </div>
  <div v-for="(item,index) in workList" :key="index" class="text item">
    <span>反馈内容:{{item.content}} 类型:{{item.type}}</span>
  </div>
</el-card>
</template>

<script>
export default {
  name:"WorkItem",
  data(){
    return{
      workList:[]
    }
  },
  created() {
    this.$http({
      path: "api/check/allretroaction",
      method: "post",
    })
      .then((rel) => {
        this.workList = rel.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
    goComplaint(){
        this.$router.push({
        path:"/admin/complaints",
      });
    }
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