<template>
  <el-dropdown size="samll" @command="handleCommand" >
  <span class="el-dropdown-link">
    {{this.$store.state.data.username}}
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="/admin/profile">个人资料</el-dropdown-item>
    <el-dropdown-item command="/admin/update">修改密码</el-dropdown-item>
    <el-dropdown-item command="/">切换账号</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
  name:"ProfileItem",
  methods:{
   handleCommand(command) {
       this.$router.push({
        path:command,
      });
  }
}
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: white;
  }
.el-dropdown-link:hover{
   color: 	#46A3FF;
}
.el-icon-arrow-down {
    font-size: 16px;
  }
 
</style>