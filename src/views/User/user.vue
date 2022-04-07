<template>
  <div class="user-Item">
    <nav-item></nav-item>
      <nav-user>
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
    </nav-user>
    <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'name', order: 'descending' }"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="姓名" prop="name" sortable> </el-table-column>
        <el-table-column label="电话" prop="tel" sortable> </el-table-column>
        <el-table-column label="住址" prop="site" sortable> </el-table-column>
        <el-table-column label="更多">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>电话: {{ scope.row.tel }}</p>
              <p>性别: {{ scope.row.sex }}</p>
              <p>地址: {{ scope.row.site }}</p>
              <p>面积: {{ scope.row.area }} ㎡</p>
              <p>是否有停车位: {{ scope.row.park }}</p>
              <p>车牌号: {{ scope.row.carnumber }}</p>
              <p>停车位位置: {{ scope.row.carsite }}</p>
              <p>注册时间: {{ scope.row.createdAt }}</p>
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
            <el-dialog title="修改住户信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                    :placeholder="data.name"
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
                <el-form-item label="地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.site"
                    autocomplete="off"
                    :placeholder="data.site"
                  ></el-input>
                </el-form-item>
                <el-form-item label="面积" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.area"
                    autocomplete="off"
                    :placeholder="data.area"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="是否有停车位" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.park">
                    <el-radio label='true'>是</el-radio>
                    <el-radio label='false'>否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="车牌号" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.carnumber"
                    autocomplete="off"
                    :placeholder="data.carnumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="停车位地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.carsite"
                    autocomplete="off"
                    :placeholder="data.carsite"
                  ></el-input>
                </el-form-item> -->
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
              <span>是否删除该住户</span>
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
      :total="parseInt(tableData_length)">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import NavItem from "../../components/main/Nav.vue";
import NavUser from "./components/user/NavUser.vue";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      dialogVisible: false,
      data: {},
      form: {
        name: '',
        tel: '',
        passwrd:'',
        sex: '',
        site: '',
        area:'',
        park:'',
        carnumber:'',
        carsite:''
      },
      deleteData:[],
      currentPage: 1,
      pagesize:7,
      tableData_length:"",
      formLabelWidth: '120px'
    };
  },
  created() {
    this.$http({
      path: "api/user/check/alluser",
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
      this.deleteData = val 
    },
    //修改按钮事件
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.data = row;
      this.form.park = row.park.toString()
    },
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/user/update/user",
        method: "post",
        params: {
          _id: this.data._id,
          tel: this.form.tel,
          name: this.form.name,
          password: this.form.password,
          sex: this.form.sex,
          site: this.form.site,
          area: this.form.area,
          // park: this.form.park,
          // carnumber: this.form.carnumber,
          // carsite: this.form.carsite,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "住户信息修改成功" });
          } else {
            this.$message({ message: "住户信息修改成功失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "住户信息修改成功失败", err });
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
        path: "api/user/delete/user",
        method: "post",
        params: {
          tel: this.data.tel,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "住户删除成功" });
          } else {
            this.$message({ message: "住户删除失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "住户删除失败", err });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
     
    // 删除选中住户
    open() {
        this.$confirm('此操作将删除选中用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let item of this.deleteData){
          this.$http({
          path:'/api/user/delete/user',
          method:'post',
          params:{
            tel:item.tel
          }
        }).then(rel =>{
          this.$message({type:'success', message: `住户删除成功` });
        }).catch(err =>{
          this.$message({type: 'info', message: `住户删除失败` });
        })
      }
      location.reload();
    }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
    if (search){
      let list =this.tableData.filter(data => !search ||
       data.name.toLowerCase().includes(search.toLowerCase())||
       data.site.toLowerCase().includes(search.toLowerCase())||
       data.tel.toString().toLowerCase().includes(search.toLowerCase())
      );
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
  },
  },
  components: {
    NavItem,
    NavUser,
  },
};
</script>

<style scoped>
.user-Item {
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
.block{
  position: fixed;
  bottom: 40px;
  left: 48%;
}
</style>