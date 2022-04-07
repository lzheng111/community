<template>
  <div class="advertising-Item">
    <nav-item></nav-item>
    <nav-index>
      <div slot="uploadPic" class="upload">
      <el-upload
        action="http://localhost:3000/upload/img"
        name="myfile"
        :on-success="onSuccess"
        :show-file-list="false"
      >
      <el-button
      type="primary"
      icon="el-icon-upload"
      size="small"
      round >
        上传
       </el-button>
      </el-upload>
    </div>
     <el-button
        slot="deleteManyUser"
        type="primary"
        icon="el-icon-delete"
        size="small"
        round
        class="btn-add"
        @click="open"
      >
        删除
      </el-button>
      <div slot="reading" class="reading-item">
      <el-button
        @click="drawer = true"
        type="primary"
        icon="el-icon-video-play"
        size="small"
        round
        style="margin-left: 16px"
      >
        预览
      </el-button>
      <el-drawer
        title="我是标题"
        direction="ttb"
        :visible.sync="drawer"
        :with-header="false"
        size:big
      >
        <div class="slide">
          <el-carousel :interval="4000" type="card" height="180px">
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <img :src="item.url" alt="" class="slide-img" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-drawer>
    </div>
    </nav-index>
   
    <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'headline', order: 'descending' }"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片地址" prop="url"  :show-overflow-tooltip="true" sortable>
        </el-table-column>
        <el-table-column label="图片"  :show-overflow-tooltip="true" sortable>
           <template slot-scope="scope">
             <img :src="scope.row.url" alt="" width="80" height="50" />
            
           </template>
        </el-table-column>
    
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
             <el-button
              class="delete-btn"
              size="mini"
              @click="handleLook(scope.$index, scope.row)"   
            >
              查看
            </el-button>
<el-dialog
  title="查看"
  :visible.sync="centerDialogVisible"
  width="50%"
  center>
  <span class="span-img">
  <img :src="imgpath" alt="" width="50%"  />
</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">关 闭</el-button>
  </span>
</el-dialog>


            <el-button
              class="delete-btn"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>是否删除该图片</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onDelete"> 确 定 </el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
 <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="parseInt(imgList_length)"
      >
      </el-pagination>
    </div>


  </div>
</template>

<script>
import NavItem from "../../components/main/Nav.vue";
import NavIndex from "./compinents/NavIndex.vue"
export default {
  data() {
    return {
      imgList: [],
      drawer: false,
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      centerDialogVisible: false,
      data: {},
      deleteData: [],
      imgpath:'',
      currentPage: 1,
      pagesize: 5,
      imgList_length: "",
      formLabelWidth: "120px",
    };
  },
  created() {
    this.$http({
      path: "api/check/allpic",
      method: "post",
    })
      .then((rel) => {
        this.imgList = rel.data.data;
        this.imgList_length = rel.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
     formatter(row, column) {
      return row.address;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          console.log("rows:", rows);
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.deleteData = val.map(p => p._id)
      this.deleteData = val;
    },
//查看按钮事件
    handleLook(index,row){
    this.centerDialogVisible = true
    this.imgpath = row.url.toString()
    },
  //删除按钮事件
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.data = row
    },
    onDelete() {
      this.dialogVisible = false;
      this.$http({
        path: "api/delete/pic",
        method: "post",
        params: {
          _id: this.data._id,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "图片删除成功" });
          } else {
            this.$message({ message: "图片删除失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "图片删除失败", err });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
      //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    onSuccess(res) {
      this.$http({
        path: "api/add/pic",
        method: "post",
        params: {
          url: res.data,
        },
      })
        .then((rel) => {
          this.$message({ message: "上传图片成功" });
          location.reload();
        })
        .catch((err) => {
          this.$message({ message: "上传图片失败" });
        });
    },
     // 批量删除选中住户
    open() {
      this.$confirm("此操作将删除选中图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let item of this.deleteData) {
            this.$http({
              path: "/api/delete/pic",
              method: "post",
              params: {
                _id: item._id,
              },
            })
              .then((rel) => {
                this.$message({ type: "success", message: `图片删除成功` });
              })
              .catch((err) => {
                this.$message({ type: "info", message: `图片删除失败` });
              });
          }
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed:{
 table_data() {
      let search = this.search;
      // 搜索功能
      if (search) {
        let list = this.imgList.filter(
          (data) =>
            !search ||
            data.url.toLowerCase().includes(search.toLowerCase())
        );
        let fenye = list.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        // 获取查询的结果，把数组长度赋值给 分页组件中的total
        this.imgList_length = fenye.length;
        return list, fenye;
      }
      // 分页功能
      else {
        //所有数据的长度  赋值给分页组件中的total
        this.imgList_length = this.imgList.length;
        let fenye = this.imgList.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        return fenye;
      }
    },
  },
  components: {
    NavItem,
    NavIndex
  },
};
</script>

<style scoped>
.advertising-Item {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-item {
  margin-top: 10px;
}
.el-table {
  padding-left: 20px;
}
.el-input {
  padding-right: 50px;
  width: 70%;
}
.update-btn,
.delete-btn {
  margin-right: 50px;
}
.block {
  position: fixed;
  bottom: 40px;
  left: 48%;
}
.slide-img {
  width: 100%;
  height: 100%;
}
.reading-item{
  padding-left: 18px;
}
.upload{
  margin-left:30px;
}
.slide {
  width: 70%;
  margin: 10px auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.span-img{
  padding-left: 190px;
}

</style>