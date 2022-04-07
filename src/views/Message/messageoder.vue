<template>
  <div class="payorder-Item">
    <nav-item></nav-item>
   <nav-index>
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
   </nav-index>
   <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'state', order: 'descending' }"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="接收人"> 
         <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>住址: {{ scope.row.site }}</p>
              <p>电话: {{ scope.row.tel }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
          </el-table-column>
        <el-table-column label="消息标题" prop="headline"  :show-overflow-tooltip="true" sortable> </el-table-column>
        <el-table-column label="消息内容" prop="content" :show-overflow-tooltip="true" sortable></el-table-column>
        <el-table-column label="发布时间" prop="createdAt" sortable>
      
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              class="update-btn"
            >
              查看
            </el-button>
            <el-dialog title="查看消息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="信息标题" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.headline"
                    autocomplete="off"
                    :placeholder="data.headline"
                    :disabled= true
                  ></el-input>
                </el-form-item>
                <el-form-item label="信息内容" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.content"
                    autocomplete="off"
                    :placeholder="data.content"
                    :disabled= true
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>

              </div>
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
              <span>是否删除该消息</span>
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
        :total="parseInt(tableData_length)"
      >
      </el-pagination>
    </div>
  </div> 
</template>

<script>
import NavItem from "../../components/main/Nav.vue";
import NavIndex from "../Repairs/components/NavIndent.vue";
export default {
   data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      deleteData: [],
      data: {},
      form: {
        content: "",
        headline:''
      },
      deleteData: [],
      currentPage: 1,
      pagesize: 7,
      tableData_length: "",
      formLabelWidth: "120px",
      value:true
    };
  },
   created() {
    this.$http({
      path: "api/check/allmessage",
      method: "post",
    })
      .then((rel) => {
        this.tableData = rel.data.data;
        this.tableData_length = rel.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
   methods:{
     
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.deleteData = val.map(p => p._id)
      this.deleteData = val;
    },
  //修改按钮事件
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.data = row;
    },

    //删除按钮事件
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.data = row;
    },
    onDelete() {
      this.dialogVisible = false;
      this.$http({
        path: "api/delete/message",
        method: "post",
        params: {
          _id: this.data._id,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "消息删除成功" });
          } else {
            this.$message({ message: "消息删除失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "消息删除失败", err });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
        // 批量删除选中住户
      open() {
      this.$confirm("此操作将删除选中维修消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let item of this.deleteData) {
            this.$http({
              path: "/api/delete/message",
              method: "post",
              params: {
                _id: item._id,
              },
            })
              .then((rel) => {
                this.$message({ type: "success", message: `消息删除成功` });
              })
              .catch((err) => {
                this.$message({ type: "info", message: `消息删除失败` });
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
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
   },
   computed:{
table_data() {
      let search = this.search;
      // 搜索功能
      if (search) {
        let list = this.tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())||
            data.createdAt.toLowerCase().includes(search.toLowerCase())||
            data.content.toLowerCase().includes(search.toLowerCase())||
            data.headline.toLowerCase().includes(search.toLowerCase())

        );
        let fenye = list.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        // 获取查询的结果，把数组长度赋值给 分页组件中的total
        this.tableData_length = fenye.length;
        return list, fenye;
      }
      // 分页功能
      else {
        //所有数据的长度  赋值给分页组件中的total
        this.tableData_length = this.tableData.length;
        let fenye = this.tableData.slice(
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
  }
}
</script>

<style scoped>
.payorder-Item {
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
  width: 80%;
}
.update-btn,
.delete-btn {
  margin-right: 20px;
}
.block {
  position: fixed;
  bottom: 40px;
  left: 48%;
}
.switch{
  width: 81.5%;
  display: flex;
  justify-content: flex-end;
}
</style>