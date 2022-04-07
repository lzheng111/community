<template>
  <div class="login">
    <el-card>
      <div class="login-title">社区物业后台管理系统</div>
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item prop="tel">
          <el-input
            type="text"
            v-model.number="form.tel"
            placeholder="请输入管理员账号"
            autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            type="password"
            placeholder="请输入密码"
            v-model.trim="form.password" 
            autocomplete="off">
            </el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="submit('form')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
     
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
     //设置表单校验规则
    let validatorTel = (rule, value, callback) => {
      //用户名规则
      if (!value) {
        return callback(new Error("请输入账号"));
      }
      setTimeout(() =>{
        if (!Number.isInteger(value)) {
          return callback(new Error('请输入数字值'));
        }else if(value.toString().length !== 11){
          return callback(new Error('请输入11位数字'));
        }else{
          callback()
        }
      },1000)
      
    };

    let validatorPwd = (rule, value, callback) => {
      //密码规则
      if (value === "") {
        return callback(new Error("请输入密码"));
      }else if(value.toString().length <6){
        return callback(new Error('输入密码要大于6位数'))
      } else {
        callback();
      }
    };

    return {
      form: {
        //登录的表单项
        tel:'',
        password: '',
      },
      rules: {
        //表单校验规则
        tel: [{ validator: validatorTel, trigger: "blur" }],
        password: [{ validator: validatorPwd, trigger: "blur" }],
      },
    };
  },
  methods:{
   
    submit(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              path:"api/user/login",
              method:'post',
              params:{
                tel:this.form.tel,
                password:this.form.password
              }
            }).then(res =>{
              if(res.data.errno ===0){
                localStorage.token = res.data.tel;
                this.$router.push({
                path: "/admin/home",
              });
                this.$message({message:'登录成功'})
                 
              }else{
               this.$message({message:'账号或密码错误'})
              }
            })
          }
        });
    }
  }
}

</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg-01.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* el-card卡片组件样式 */
.el-card {
  width: 420px;
  height: 300px;
}
/* 登录标题样式 */
.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
}
/* 登录按钮 */
.login-btn {
  text-align: right;
}
</style>


