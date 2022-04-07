<template>
  <div class="repairs-Item">
    <nav-item></nav-item>
    <nav-repairs>
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
    </nav-repairs>
    <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'createdAt', order: 'descending' }"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="地址"
          prop="site"
          :show-overflow-tooltip="true"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="维修内容"
          prop="type"
          :show-overflow-tooltip="true"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
          :show-overflow-tooltip="true"
          :formatter="formatBoolean"
          sortable
        >
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>订单编号: {{ scope.row._id }}</p>
              <p>订单时间: {{ scope.row.createdAt }}</p>
              <p>姓名: {{ scope.row.name }}</p>
              <p>电话: {{ scope.row.tel }}</p>
              <p>地址: {{ scope.row.site }}</p>
              <p>维修内容: {{ scope.row.type }} </p>
              <p>维修状态: {{ scope.row.state }} </p>
              <p>住户评价: {{ scope.row.comment }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">详情</el-tag>
              </div>
            </el-popover>
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
              class="update-btn"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-dialog title="处理维修订单" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="住户" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                    :placeholder="data.name"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.tel"
                    autocomplete="off"
                    :placeholder="data.tel"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                 <el-form-item label="地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.site"
                    autocomplete="off"
                    :placeholder="data.site"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                 <el-form-item label="维修类型" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.type"
                    autocomplete="off"
                    :placeholder="data.type"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="订单时间" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.createdAt"
                    autocomplete="off"
                    :placeholder="data.createdAt"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.state">
                    <el-radio label='false'>未处理</el-radio>
                    <el-radio label='true'>已完成</el-radio>
                  </el-radio-group>
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
              <span>是否删除该订单</span>
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
import NavRepairs from "./components/NavRepairs.vue"

export default {
    data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      data: {},
      form: {
        state: "",
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
      path: "api/check/norepairs",
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
      this.form.state = row.state.toString();
    },
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/update/repairs",
        method: "post",
        params: {
          _id: this.data._id,
          state: this.data.state,
          
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "处理成功" });
          } else {
            this.$message({ message: "处理失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "处理失败", err });
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
        path: "api/delete/repairs",
        method: "post",
        params: {
          _id: this.data._id,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "订单删除成功" });
          } else {
            this.$message({ message: "订单删除失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "订单删除失败", err });
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
      this.$confirm("此操作将删除选中维修订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let item of this.deleteData) {
            this.$http({
              path: "/api/delete/repairs",
              method: "post",
              params: {
                _id: item._id,
              },
            })
              .then((rel) => {
                this.$message({ type: "success", message: `维修订单删除成功` });
              })
              .catch((err) => {
                this.$message({ type: "info", message: `维修订单删除失败` });
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
     formatBoolean(row, column, cellValue) {
      let ret = "";
      if (cellValue.toString() == "true") {
        ret = "已维修";
      } else {
        ret = "待维修";
      }
      return ret;
    },
  },
  computed:{
table_data() {
      let search = this.search;
      // 搜索功能
      if (search) {
        let list = this.tableData.filter(
          (data) =>
            !search ||
            data.site.toLowerCase().includes(search.toLowerCase()) ||
            data.type.toLowerCase().includes(search.toLowerCase()) ||
            data.createdAt
              .toString()
              .toLowerCase()
              .includes(
                search.toLowerCase() ||
                  data.tel.toLowerCase().includes(search.toLowerCase())
              )
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
  components:{
    NavItem,
    NavRepairs
  }
}
</script>

<style scoped>
.repairs-Item {
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