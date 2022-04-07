<template>
  <div class="admin-Item">
    <nav-item> </nav-item>
    <search-item></search-item>
    <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'username', order: 'descending' }"
      >
        <el-table-column label="姓名" prop="username" sortable>
        </el-table-column>
        <el-table-column label="性别" prop="sex" sortable> </el-table-column>
        <el-table-column label="电话" prop="tel" sortable> </el-table-column>
        <el-table-column label="权限" prop="level"> </el-table-column>
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
              >编辑</el-button
            >
            <el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.username"
                    autocomplete="off"
                    :placeholder="data.username"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.tel"
                    autocomplete="off"
                    :placeholder="data.tel"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.password"
                    autocomplete="off"
                    show-password
                    :placeholder="data.password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.sex" class="sex-item">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.level">
                    <el-radio label="管理员">管理员</el-radio>
                    <el-radio label="超级管理员">超级管理员</el-radio>
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
              >删除</el-button
            >
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>是否删除该管理员</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onDelete"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!-- 分页 -->
    <div class="block">
    <el-pagination
      center
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="parseInt(tableData_length)">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import NavItem from "../../components/main/Nav.vue";
import SearchItem from "./components/admin/Search.vue";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      data: {},
      form: {
        username: "",
        tel: "",
        password: "",
        sex: "",
        level: "",
      },
      currentPage: 1,
      pagesize:7,
      tableData_length:'',
      formLabelWidth: "120px",
    };
  },
  created() {
    this.$http({
      path: "api/user/check/allpersonal",
      method: "post",
    })
      .then((rel) => {
        this.tableData = rel.data.data;
        this.tableData_length = rel.data.data.length
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/user/update/personal",
        method: "post",
        params: {
          _id: this.data._id,
          tel: this.form.tel,
          username: this.form.username,
          password: this.form.password,
          sex: this.form.sex,
          level: this.form.level,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "修改管理员信息成功" });
          } else {
            this.$message({ message: "修改管理员信息失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "修改管理员信息失败", err });
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.data = row;
      this.form = row;
    },
    handleDelete(index, row) {
      this.dialogVisible = true
      this.data = row;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    formatter(row, column) {
      return row.address;
    },
    onDelete(){
      this.dialogVisible = false
      this.$http({
        path:'api/user/delete/personal',
        method:'post',
        params:{
          tel:this.data.tel
        }
      }).then(rel =>{
        if(rel.data.errno ===0){
           location.reload();
           this.$message({ message: "管理员删除成功" });
        }else{
          this.$message({ message: "管理员删除失败" });
        }
      }).catch(err =>{
          this.$message({ message: "管理员删除失败",err });
      })
    },
    //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
     
  },
  computed:{
     table_data() {
    let search = this.search;
    // 搜索功能
    if (search){
      let list =this.tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())|| data.sex.toLowerCase().includes(search.toLowerCase())|| data.tel.toString().toLowerCase().includes(search.toLowerCase()));
      let fenye = list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
      // 获取查询的结果，把数组长度赋值给 分页组件中的total
      this.tableData_length = fenye.length;
      return list,fenye
    }
    // 分页功能
   else {
     //所有数据的长度  赋值给分页组件中的total
      this.tableData_length = this.tableData.length;
      let fenye = this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      return fenye
    }
  }

 },
  components: {
    NavItem,
    SearchItem,
  },
};
</script>

<style scoped>
.admin-Item {
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

.el-table .el-table__cell.is-right {
  text-align: left;
}
.block{
  position: fixed;
  bottom: 40px;
  left: 48%;
}
</style>