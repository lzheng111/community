<template>
   <el-card class="box-card" shadow="hover" >
  <div slot="header" class="clearfix">
    <span>社区公告</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="goNotice">查看更多</el-button>
  </div>

  <div v-for="(item,index) in noticeList" :key="index" class="text item">
    {{item.headline }}
  </div>

</el-card>


</template>

<script>
export default {
  name:"CalendarItem",
  data(){
    return{
      noticeList:''
    }
  },
  created(){
     this.$http({
      path: "api/check/allnotice",
      method: "post",
    })
      .then((rel) => {
        this.noticeList = rel.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
     goNotice() {
      this.$router.push({
        path: "/admin/notice",
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