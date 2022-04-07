<template>
  <div class="profile">
    <nav-item></nav-item>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人资料</span>    
            <update-admin></update-admin>
        </div>
        <div class="text item">
          <p>姓名:<span>{{this.$store.state.data.username}}</span></p>
          <p>电话:<span>{{this.$store.state.data.tel}}</span></p>
          <p>性别:<span>{{this.$store.state.data.sex}}</span></p>
          <p>权限:<span>{{this.$store.state.data.level}}</span></p>
        

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import NavItem from '../../components/main/Nav.vue'
import UpdateAdmin from '../../components/main/UpdateAdmin.vue'
export default {
  data() {
    return {};
  },
  components:{
    UpdateAdmin,
    NavItem
  }

};
</script>

<style scoped>

.profile{
  height: 100%;
  width: 100%;
}
.path {
  width: 100%;
}
.card {
  margin-top: -50px;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.text p{
  margin: 50px;
}
.text span{
  margin-left: 40px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 60%;
  height: 70%;
}
</style>