<template>
<div class="path">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="nav-item" >
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
      <slot name ="navOne"></slot>
      <slot name ="navTwo"></slot>
      <slot name ="navThree"></slot>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
  name:"NavItem"
}
</script>

<style scoped>
.path{
  width: 100%;
   height: 50px; 
  display: flex;
  align-items: center;
  box-shadow:  4px 4px 5px#F0F0F0;
}
.nav-item{
  padding-left: 30px;
}
</style>