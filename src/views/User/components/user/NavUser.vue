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
    <el-dialog title="添加住户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
    </el-form-item>
    <el-form-item label="住址" :label-width="formLabelWidth">
      <el-input v-model="form.site" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="面积" :label-width="formLabelWidth">
      <el-input v-model="form.area" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="是否有停车位" :label-width="formLabelWidth">
          <el-radio-group v-model="form.park">
            <el-radio label='true'>有</el-radio>
            <el-radio label='false'>否</el-radio>
          </el-radio-group>
    </el-form-item>
    <el-form-item label="车牌号" :label-width="formLabelWidth">
      <el-input v-model="form.carnumber" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="停车位地址" :label-width="formLabelWidth">
      <el-input v-model="form.carsite" autocomplete="off"></el-input>
    </el-form-item> -->

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="onSubmit(form)">注 册</el-button>
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
  name:"NavUser",
  data(){
    return{
    dialogFormVisible: false,
    form: {
      name: '',
      tel: '',
      passwrd:'',
      sex: '',
      site: '',
      area:'',
      park:'',
      carnumber:'',
      carsite:''
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    //增加
    onSubmit(){
    this.dialogFormVisible = false
    this.$http({
      path:'api/user/add/user',
      method:'post',
      params:{
        tel:this.form.tel,
        passwrd:this.form.passwrd,
        name :this.form.name,
        sex :this.form.sex,
        site:this.form.site,
        area:this.form.area,
        // park:this.form.park,
        // carnumber:this.form.carnumber,
        // carsite:this.form.carsite
      }
    }).then(rel =>{
        if(rel.data.errno === 0){
          location.reload();
          this.$message({message:'添加住户成功'})
        }
        else{
          this.$message({message:'添加住户失败'})
        }
      }).catch(err =>{
          this.$message({message:'添加住户失败'},err)
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