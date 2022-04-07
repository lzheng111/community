<template>
  <div class="notice-Item">
    <nav-item></nav-item>
    <nav-notice>
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
    </nav-notice>
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
        <el-table-column label="标题" prop="headline" sortable>
        </el-table-column>
        <el-table-column label="内容" prop="content" :show-overflow-tooltip="true" sortable>
        </el-table-column>
        <el-table-column label="发布时间" prop="createdAt" sortable>
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
              class="update-btn"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-dialog title="修改公告信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.headline"
                    autocomplete="off"
                    :placeholder="data.headline"
                  ></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.content"
                    autocomplete="off"
                    :placeholder="data.content"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEdit(form)"
                  >确 定</el-button
                >
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
              <span>是否删除该公告</span>
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
import NavNotice from "./components/NavNotice.vue";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      data: {},
      form: {
        headline: "",
        content: "",
      },
      deleteData: [],
      currentPage: 1,
      pagesize: 7,
      tableData_length: "",
      formLabelWidth: "120px",
    };
  },
  created() {
    this.$http({
      path: "api/check/allnotice",
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

    //修改按钮事件
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.data = row;
    },
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/update/notice",
        method: "post",
        params: {
          _id: this.data._id,
          headline: this.form.headline,
          content: this.form.content,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "公告修改成功" });
          } else {
            this.$message({ message: "公告修改失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "公告修改失败", err });
        });
    },

    //删除按钮事件
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.data = row;
    },
    onDelete() {
      this.dialogVisible = false;
      this.$http({
        path: "api/delete/notice",
        method: "post",
        params: {
          _id: this.data._id,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "公告删除成功" });
          } else {
            this.$message({ message: "公告删除失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "公告删除失败", err });
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
      this.$confirm("此操作将删除选中公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let item of this.deleteData) {
            this.$http({
              path: "/api/delete/notice",
              method: "post",
              params: {
                _id: item._id,
              },
            })
              .then((rel) => {
                this.$message({ type: "success", message: `住户删除成功` });
              })
              .catch((err) => {
                this.$message({ type: "info", message: `住户删除失败` });
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
  computed: {
    table_data() {
      let search = this.search;
      // 搜索功能
      if (search) {
        let list = this.tableData.filter(
          (data) =>
            !search ||
            data.headline.toLowerCase().includes(search.toLowerCase()) ||
            data.content.toLowerCase().includes(search.toLowerCase()) ||
            data.createdAt.toString().toLowerCase().includes(search.toLowerCase())
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
    NavNotice,
  },
};
</script>

<style scoped>
.nocite-Item {
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
</style>