import axios from "axios";

let instance = axios.create({
  baseURL:'http://localhost:3000',
  timeout:5000
})


// 请求拦截
instance.interceptors.request.use(config =>{
  //请求拦截相关配置
  return config
},err =>{
  console.error('请求失败',err);
})

// 响应拦截
instance.interceptors.response.use(res =>{
  //响应拦截要处理的内容
  return res
},err =>{
  console.error('响应失败',err);
})

//http请求的方法
/**
 * 
 * @param {*} option 配置对象
 * method 请求方法
 * path 请求接口地址
 * params 请求参数
 */
async function http(option = {}){
  let result =null
  if(option.method ==='get'||option.method ==='delete'){
    await instance[option.method](
      option.path,
      {
        params:option.params
      }
    ).then(res =>{
      result = res
    }).catch(err =>{
      result = err
    })
  }else if(option.method ==='post'||option.method ==='put'){
    await instance[option.method](
      option.path,
      option.params
    ).then(res =>{
      result = res
    }).catch(err =>{
      result = err
    })
  }
  return result
}

export default http