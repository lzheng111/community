<template>
   <el-link :underline="false">
          <el-button class="button" type="text"  @click="dialogVisible = true">退出</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"  
          >
            <span >是否退出系统</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="exit"
                >确 定</el-button>
            </span>
          </el-dialog>
        </el-link>
</template>

<script>
export default {
  name:"Exit",
  data(){
    return{
       dialogVisible: false
    }
  },
  methods:{
      handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    exit() {
      //退出系统
      localStorage.clear();
      this.$router.push({
        path: "/",
      });
    },
  }
};
</script>

<style scoped>
.button{
  color: #fff;
  margin: 0px 10px;
}
.button:hover{
   color: 	#46A3FF;
}
</style>