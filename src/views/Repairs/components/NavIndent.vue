<template>
  <div class="nav-user">
    <slot name="deleteManyUser"></slot>
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
  </div>
</template>

<script>
export default {
  data(){
    return{
    dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods:{
    // 删除
    // 刷新
    onrefresh(){
     this.$message({message:'刷新成功'})
      setTimeout(() => {  
         location.reload();   
      }, 200);
    }
  },
  name:"NvaIndent"
}
</script>

<style scoped>
.nav-user {
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