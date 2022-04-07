<template>
  <div class="nav-user">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      round
      class="btn-add"
      @click="dialogFormVisible = true"
      >
      添加
    </el-button>
    <el-dialog title="发布公告" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.headline" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="form.content" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="onSubmit(form)">发 布</el-button>
  </div>
</el-dialog>
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
  name:"NavNotice",
  data(){
    return{
    dialogFormVisible: false,
    form: {
      headline: '',
      content: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    //增加
    onSubmit(){
    this.dialogFormVisible = false
    this.$http({
      path:'api/add/notice',
      method:'post',
      params:{
        headline:this.form.headline,
        content:this.form.content,
      }
    }).then(rel =>{
        if(rel.data.errno === 0){
          location.reload();
          this.$message({message:'发布公告成功'})
        }
        else{
          this.$message({message:'发布公告失败'})
        }
      }).catch(err =>{
          this.$message({message:'发布公告失败'},err)
      })
    },


    // 删除
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