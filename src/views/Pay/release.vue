<template>
  <div class="release-Item">
    <nav-item></nav-item>
    <release-item>
      <div slot="add">
  <el-button
      type="primary"
      icon="el-icon-edit"
      size="small"
      round
      class="btn-add"
      @click="dialogFormVisibles = true"
      >
      发布
    </el-button>
    <el-dialog title="发布多个缴费信息" :visible.sync="dialogFormVisibles">
  <el-form :model="form">
    <el-form-item label="缴费内容" :label-width="formLabelWidth">
      <el-input v-model="form.contents" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibles = false">取 消</el-button>
    <el-button type="primary" @click="onupdateMany">确 定</el-button>
  </div>
</el-dialog>
      </div>
    

    </release-item>

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
        <el-table-column label="业主" prop="name" sortable> </el-table-column>
        <el-table-column label="电话" prop="tel" sortable> </el-table-column>
        <el-table-column label="地址" prop="site" sortable> </el-table-column>
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
              type="primary"
            >
              发布
            </el-button>
            <el-dialog title="发布缴费订单" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="缴费内容" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.content"
                    autocomplete="off"
                    :placeholder="data.content"
                  ></el-input>
                </el-form-item>
                <el-form-item label="业主" :label-width="formLabelWidth">
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
                <el-form-item label="房屋面积" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.area"
                    autocomplete="off"
                    :placeholder="data.area"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="缴纳费用" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.money"
                    autocomplete="off"
                    :placeholder="data.money"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.state">
                    <el-radio label="待缴费">待缴费</el-radio>
                    <el-radio label="已缴费">已缴费</el-radio>
                  </el-radio-group>
                </el-form-item> -->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEdit(form)"
                  >发 布</el-button
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
import ReleaseItem from "./components/ReleaseItem.vue"
export default {
   data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisibles:false,
      dialogFormVisible: false,
      dialogVisible: false,
      deleteData: [],
      data: {},
      form: {
        contents:"",
        content: "",
        tel: "",
        name: "",
        site: "",
        area: "",
        money: "",
        state: "",
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
   
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.deleteData = val.map(p => p._id)
      this.deleteData = val;
      
    },
    //发布按钮事件
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.data = row;
      this.data.money =  parseInt(row.area) * 2.5
      this.form.money =  parseInt(row.area) * 2.5
    },
    onEdit() {
      this.dialogFormVisible = false;
      this.$http({
        path: "api/add/pay",
        method: "post",
        params: {
          content:this.data.content,
          name:this.data.name,
          tel: this.data.tel,
          site:this.data.site,
          area:this.data.area,
          money: this.data.money,
          state: this.data.state,
        },
      })
        .then((rel) => {
          console.log(rel);
          if (rel.data.errno === 0) {
            this.$message({ message: "缴费订单发布成功" });
            location.reload();
          } else {
            this.$message({ message: "缴费订单发布失败" });
          }
        })
        .catch((err) => {
          this.$message({ message: "缴费订单发布失败", err });
        });
    },
  
    // 批量发布选中住户
    onupdateMany() {
      this.dialogVisibles = false     
          for (let item of this.deleteData) {
            this.$http({
              path: "/api/add/pay",
              method: "post",
              params: {
               content:this.form.contents,
               name:item.name,
               tel: item.tel,
               site:item.site,
               area:item.area,
               money: parseInt(item.area) * 2.5,
               state: item.state,
              },
            })
              .catch((err) => {
                this.$message({ type: "info", message: `缴费订单发布失败` });
              });
          }
           this.$message({ type: "success", message: `缴费订单发布成功` });
          location.reload();
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
            !search || data.name.toLowerCase().includes(search.toLowerCase())||
            data.tel.toString().toLowerCase().includes(search.toLowerCase())||
            data.site.toLowerCase().includes(search.toLowerCase())
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
    ReleaseItem
  }
}
</script>

<style scoped>
.release-Item {
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