<template>
 <div class="park-Item">
   <nav-item></nav-item>
   <nav-park></nav-park>
   <div class="table-item">
      <el-table
        :data="table_data"
        style="width: 100%"
        :default-sort="{ prop: 'carsite', order: 'descending' }"
        tooltip-effect="dark"
      >
        <el-table-column label="姓名" prop="name" sortable>
        </el-table-column>
        <el-table-column label="电话" prop="tel" :show-overflow-tooltip="true" sortable>
        </el-table-column>
        <el-table-column label="是否有停车位" prop="park" :formatter="formatBoolean" sortable>
        </el-table-column>
        <el-table-column label="停车位地址" prop="carsite"  sortable>
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
            <el-dialog title="修改停车位信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                 <el-form-item label="名称" :label-width="formLabelWidth">
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
                 <el-form-item label="住址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.site"
                    autocomplete="off"
                    :placeholder="data.tel"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="是否有停车位" :label-width="formLabelWidth">
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
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEdit(form)"
                  >确 定</el-button
                >
              </div>
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
import NavPark from "./components/NavPark.vue"
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
        park:'',
        carnumber:'',
        carsite:''
      },
      deleteData: [],
      currentPage: 1,
      pagesize: 7,
      tableData_length: "",
      formLabelWidth: "120px",  
    }
  },
   created() {
    this.$http({
      path: "api/user/check/alluser",
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
      this.form.park = row.park.toString()
      
    },
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/user/update/user",
        method: "post",
        params: {
          _id: this.data._id,
          park: this.form.park,
          carnumber: this.form.carnumber,
          carsite: this.form.carsite,
        },
      })
        .then((rel) => {
          if (rel.data.errno === 0) {
            location.reload();
            this.$message({ message: "停车位信息修改成功" });
          } else {
            this.$message({ message: "停车位信息修改失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "停车位信息修改失败", err });
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
                var ret = '' 
                if (cellValue) {
                    ret = "是"  
                } else {
                    ret = "否"
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
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.tel.toString().toLowerCase().includes(search.toLowerCase()));
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
    NavPark
  }
}
</script>

<style scoped>
.park-Item {
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