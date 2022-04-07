<template>

<div class="home-item">
  <notice-item></notice-item>
   <work-item></work-item>
  <pay-item></pay-item>
  <servers-item></servers-item>
 
</div>

</template>

<script>
import NoticeItem from '../../components/main/Notice.vue'
import PayItem from '../../components/main/Pay.vue'
import ServersItem from '../../components/main/Servers.vue'
import WorkItem from'../../components/main/Work.vue'

export default {
  name:"home",
  components:{
    NoticeItem,
    WorkItem,
    PayItem,
    ServersItem,
   
  }
}
</script>

<style scoped>

.home-item{
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
}
</style>