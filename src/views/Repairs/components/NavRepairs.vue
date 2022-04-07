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
     <el-dialog title="添加维修订单" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="住址" :label-width="formLabelWidth">
      <el-input v-model="form.site" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="维修内容" :label-width="formLabelWidth">
      <el-input v-model="form.type" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="onSubmit(form)">创 建</el-button>
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
   data(){
    return{
    dialogFormVisible: false,
    form: {
      name: '',
      tel: '',
      site:'',
      type: '',
      },
    formLabelWidth: '120px'
    }
  },
  methods:{
     //增加
    onSubmit(){
    this.dialogFormVisible = false
    this.$http({
      path:'api/add/repairs',
      method:'post',
      params:{
        tel:this.form.tel,
        site:this.form.site,
        name :this.form.name,
        type :this.form.type,
      }
    }).then(rel =>{
        if(rel.data.errno === 0){
          this.$message({message:'添加维修订单成功'})
          location.reload();
        }
        else{
          this.$message({message:'添加维修订单失败'})
        }
      }).catch(err =>{
          this.$message({message:'添加维修订单失败'},err)
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
  },
  name:"NavRepairs"
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