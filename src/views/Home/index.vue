<template>
  <el-container>
    <el-header>
      <div class="sys-title" @click="goWeb">
        社区物业后台管理系统
        <el-button v-model="isCollapse" @click="openOrclose" class="btn-item">
         <i v-show="!isCollapse" class="el-icon-s-fold"></i>
         <i v-show="isCollapse"  class="el-icon-s-unfold"></i>
      </el-button>
      </div>
      <div class="header-right">
        <el-link :underline="false" style="margin-right: 20px" @click="goWeb">
          网站首页
        </el-link>
        <el-link :underline="false">
          <profile-item></profile-item>
        </el-link>
        <exit></exit>
      </div>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px"> -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="	#46A3FF"
          style="border: 0"
          router
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="/admin/user">
            <template #title>
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/user">住户管理</el-menu-item>
            <el-menu-item index="/admin/admin" v-if="this.$store.state.data.level == '超级管理员' ?true : false" >管理员管理</el-menu-item>
            <el-menu-item index="/admin/park">停车管理</el-menu-item>
          </el-submenu>
           <el-submenu index="/admin/pay">
            <template #title>
               <i class="el-icon-bank-card"></i>
              <span>缴费管理</span>
            </template>
             <el-menu-item index="/admin/pay/release">发布缴费信息</el-menu-item>
            <el-menu-item index="/admin/pay">待缴费列表</el-menu-item>
            <el-menu-item index="/admin/pay/payorder">缴费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/repairs">
            <template #title>
               <i class="el-icon-s-opportunity"></i>
              <span>维修管理</span>
            </template>
            <el-menu-item index="/admin/repairs">待维修列表</el-menu-item>
            <el-menu-item index="/admin/repairs/indent">维修订单</el-menu-item>
          </el-submenu>
           <el-submenu index="/admin/message">
            <template #title>
               <i class="el-icon-bell"></i>
              <span>通知管理</span>
            </template>
            <el-menu-item index="/admin/message">发布通知</el-menu-item>
            <el-menu-item index="/admin/message/oder">通知列表</el-menu-item>
          </el-submenu>
            <el-menu-item index="/admin/complaints">     
               <i class="el-icon-edit-outline"></i>
              <span>反馈管理</span>
          </el-menu-item>
           <el-menu-item index="/admin/notice">
               <i class="el-icon-message"></i>
              <span>公告管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/advertising">
               <i class="el-icon-mobile-phone"></i>
              <span>广告管理</span>
          </el-menu-item>
            <!-- <el-menu-item index="/admin/test">
               <i class="el-icon-mobile-phone"></i>
              <span>测试</span>
          </el-menu-item> -->
        </el-menu>
      <!-- </el-aside> -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import ProfileItem from '../../components/navbar/ProfileItem.vue';
import Exit from '../../components/navbar/exit.vue'
export default {
  data() {
    return {
      dialogVisible: false,
      isCollapse: false,
      show:false
    };
  },

  components:{
    ProfileItem,
    Exit
  },
  methods: {
    openOrclose(){
      this.isCollapse = !this.isCollapse
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    goWeb() {
      this.$router.push({
        path: "/admin/home",
      });
    },
  },
};
</script>

<style scoped>
* {
margin:0;
padding:0;
}
 .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 240px;
    min-height: 400px;
  }
  .btn-item{
    margin-left: 20px;
    background-color: #545c64;
    border: none;
  }
  .el-icon-s-fold{
    color: #fff;
    font-size: 20px;
  }
  .el-icon-s-unfold{
    color: #fff;
    font-size: 20px;
  }

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sys-title {
  font-size: 18px;
  font-weight: bold;
  padding-left: 5px;
  cursor:pointer
}
.el-header .el-link {
  color: #fff;
  margin: 0px 10px;
}
.el-header .el-link:hover{
  color:	#46A3FF
}
.el-aside {
  background-color: #545c64;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* 修改滚动条样式 */
.el-aside::-webkit-scrollbar {
  width: 3px;
}
/* 滚动条样式 */
.el-aside::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 5px rgba(255, 208, 75, 0.2);
  border-radius: 10px;
  background: 	#46A3FF
}
/* 滚动条背景 */
.el-aside::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(84, 92, 100, 0.2);
  border-radius: 0;
  background: rgba(84, 92, 100, 0.1);
}

.el-main {
  height: 100%;
  width: 100%;
}

.el-container {
  height: 100%;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>