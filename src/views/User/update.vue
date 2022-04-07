<template>
  <div class="updatePwd">
   <nav-item></nav-item>

    <div class="card">
      <el-card class="box-card">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
         <el-form-item label="原密码" prop="password">
            <el-input v-model.number="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button>
           
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import NavItem from '../../components/main/Nav.vue'
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
       else {
            callback();
          }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if(value.toString().length <6){
        return callback(new Error('输入密码要大于6位数'))
      } 
      else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } 
      else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        password: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const pwd = this.$store.state.data.password
        const inputpwd = this.ruleForm.password.toString()
        if (valid) {
          if(inputpwd === pwd){
             this.$http({
               path:'/api/user/update/pwd',
               method:'post',
               params:{
                 tel :this.$store.state.data.tel,
                 password:this.ruleForm.pass
               }
             }).then(res =>{
               if(res.data.errno ===0){
                this.$message({message:'修改密码成功'})
                this.$store.state.data.password = this.ruleForm.pass
                this.ruleForm.password ='',
                this.ruleForm.pass ='',
                this.ruleForm.checkPass =''
                
               }
             }).catch(err =>{
                this.$message({message:'修改密码失败',err})
                console.log(err);
             })
          }else{
                this.$message({message:'原密码输入错误'})
            
          }
  
        } else {
            this.$message({message:'修改密码失败'})

         
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components:{
    NavItem
  }
};
</script>

<style scoped>
.updatePwd {
  height: 100%;
  width: 100%;
}
.card {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.box-card {
  margin-top: -70px;
  width: 60%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-form-item{
margin-left: -40px;
}
.el-input{
  width:100%;
}
.el-button{
  margin-left: 30px;
  margin-top: 20px;
}
</style>