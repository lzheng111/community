<template>
  <div class="nav-pay">
     <slot name="okorder"></slot>
     <slot name="notice"></slot>
     <el-button
      type="primary"
      icon="el-icon-refresh-left"
      size="small"
      round
      class="btn-add"
      @click="onrefresh"
      >
      刷新
    </el-button>
    <slot name="switch"></slot>
  </div>
</template>

<script>
export default {
  name:"NavPay",
  data(){
    return{
   
    }
  },
  methods:{
    // 刷新
    onrefresh(){
     this.$message({message:'刷新成功'})
      setTimeout(() => {  
         location.reload();   
      }, 200);
    }
  }
}
</script>

<style scoped>
.nav-pay {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  box-shadow: 4px 4px 5px#F0F0F0;
  margin-top: 5px;
}
.btn-add {
  margin-left: 30px;
}
</style>