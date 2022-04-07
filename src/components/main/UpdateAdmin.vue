<template>
  <div class="updateAdmin">
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      style="float: right; padding: 3px 0"
      >修改</el-button
    >

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"  :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(form)"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateAdmin",
  
  data() {
  
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        sex: "",
      },
      formLabelWidth: "120px",
    
    };
  },
  methods:{
    onSubmit(){
      this.dialogFormVisible = false
      
      const _id = this.$store.state.data._id
      this.$http({
        path:'api/user/update/personal',
        method:'post',
        params:{
          _id,
          username :this.form.username,
          sex :this.form.sex
        }
      }).then(res =>{
        if(res.data.errno ===0){
          this.$store.state.data.username = this.form.username
          this.$store.state.data.sex = this.form.sex
          this.$message({message:'修改成功'})

          this.form.username='',
          this.form.sex = ''

        }
        else{
          this.$message({message:'修改失败'})
        }
      }).catch(err =>{
          this.$message({message:'修改失败'})
      })
    }
  }
};
</script>

<style scoped>
.updateAdmin{
 margin-top: -16px;
}
</style>