
let  validatorusername = (rule, value, callback) => {
  //用户名规则
  if (!value) {
    return callback(new Error("请输入账号"));
  }
  else{
      callback()
    }
}

