<template>
  <div class="search">
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
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别"  :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
    </el-form-item>
    <el-form-item label="权限"  :label-width="formLabelWidth">
          <el-radio-group v-model="form.level">
            <el-radio label="管理员">管理员</el-radio>
            <el-radio label="超级管理员">超级管理员</el-radio>
          </el-radio-group>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="onSubmit(form)">确 定</el-button>
  </div>
</el-dialog>
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
  name: "SearchItem",
  data() {
    return {
      input: "",
      dialogFormVisible: false,
      form: {
          username: '',
          tel: '',
          sex: '',
          level: '',
        },
        formLabelWidth: '120px'
    };
  },
  methods:{
    onSubmit(){
      this.dialogFormVisible = false
      this.$http({
        path:'api/user/register',
        method:'post',
        params:{
          tel:this.form.tel,
          username :this.form.username,
          sex :this.form.sex,
          level:this.form.level
        }
      }).then(rel =>{
        if(rel.data.errno === 0){
          location.reload();
          this.$message({message:'添加管理员成功'})
        }
        else{
          this.$message({message:'添加管理员失败'})
        }
      }).catch(err =>{
          this.$message({message:'添加管理员失败'},err)
      })
    },
    onrefresh(){
     this.$message({message:'刷新成功'})
      setTimeout(() => {  
         location.reload();   
      }, 200);
    }
  }
};
</script>

<style scoped>
.search {
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