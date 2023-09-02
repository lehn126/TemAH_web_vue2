<template>
  <div class="task-list-container">
    <div style="margin-top: 8px">
      <el-table
        :data="tasks"
        :border="true"
        :stripe="true"
        :fit="true"
        size="small"
        :row-key="(task) => task.job_id"
        @row-dblclick="handleRowDblclick"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="job_id" type="selection" width="40px"> </el-table-column>
        <el-table-column
          prop="job_id"
          label="ID"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          prop="bean_name"
          label="设备类型"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="method_name"
          label="任务类型"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="method_params"
          label="任务参数"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="cron_expression"
          label="Cron表达式"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="job_status"
          label="状态"
          :formatter="transformStatusFlag"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="110px"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="修改时间"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" width="144px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.job_status === 1"
              size="mini"
              type="warning"
              @click="handleStateDisable(scope.$index, scope.row)"
              >停止</el-button
            >
            <el-button
              v-else
              size="mini"
              type="success"
              @click="handleStateEnable(scope.$index, scope.row)"
              >启动</el-button
            >
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 8px">
      <el-pagination
        background
        @current-change="handlePageChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="maxCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import taskApi from '@/api/task-api';

const PAGE_SIZE = 10;

function updateTaskStatus(vm, index, row, newStatus) {
  const action = newStatus === 0 ? '停止' : '启动';
  const taskId = row.job_id;
  vm.$confirm(`此操作将${action}该任务, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    taskApi.updateTaskStatus(vm, taskId, newStatus, () => {
      const rowData = vm.tasks[index];
      if (rowData && rowData.job_id === taskId) {
        rowData.job_status = newStatus;
      } else {
        vm.refreshCurrentPage();
      }
    });
  }).catch(() => {
    vm.$message({
      type: 'info',
      message: '已取消操作',
    });
  });
}

function deleteTask(vm, row) {
  const taskId = row.job_id;
  vm.$confirm('此操作将删除该任务, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    taskApi.deleteTask(vm, taskId, () => {
      vm.refreshCurrentPage();
    });
  }).catch(() => {
    vm.$message({
      type: 'info',
      message: '已取消操作',
    });
  });
}

export default {
  data() {
    return {
      tasks: [],
      selectedRows: [],
      maxCount: 0,
      maxPage: 0,
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      sortBy: '',
      sortOrder: '',
    };
  },
  methods: {
    refreshPageData(respData) {
      this.tasks = respData.data.pageData;
      this.maxCount = respData.data.maxCount;
      this.maxPage = respData.data.maxPage;
      this.pageIndex = respData.data.pageIndex;
      this.pageSize = respData.data.pageSize;
    },
    refreshCurrentPage() {
      taskApi.getAll(
        this,
        this.pageIndex,
        PAGE_SIZE,
        this.sortBy,
        this.sortOrder,
        this.refreshPageData,
      );
    },
    handlePageChange(val) {
      taskApi.getAll(this, val, PAGE_SIZE, this.sortBy, this.sortOrder, this.refreshPageData);
    },
    transformStatusFlag(row, column, cellValue) {
      return cellValue === 1 ? '正常' : '暂停';
    },
    handleRowDblclick(row) {
      this.$store.dispatch('setOperationTask', row);
      this.$router.push({ name: 'task-edit', params: { id: row.job_id } });
    },
    handleSortChange(sortInfo) {
      this.sortBy = sortInfo.prop;
      this.sortOrder = sortInfo.order === 'ascending' ? 'asc' : 'desc';
      this.refreshCurrentPage();
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    handleStateDisable(index, row) {
      updateTaskStatus(this, index, row, 0);
    },
    handleStateEnable(index, row) {
      updateTaskStatus(this, index, row, 1);
    },
    handleDelete(index, row) {
      deleteTask(this, row);
    },
  },
  mounted() {
    taskApi.getAll(this, 1, PAGE_SIZE, this.sortBy, this.sortOrder, this.refreshPageData);
  },
};
</script>
<style>
.task-list-container {
  min-height: 540px;
}
</style>
