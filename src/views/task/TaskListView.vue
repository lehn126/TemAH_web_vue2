<template>
    <div class="task-list-container">
        <div style="text-align: left">
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length <= 0"
        click=""
        >Terminate</el-button
      >
    </div>
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
          label="Bean名称"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="method_name"
          label="方法名称"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="method_params"
          label="方法参数"
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
      console.log(respData.data.pageData[0].job_id);
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
      console.log(row);
      // this.$emit('alarm-dblclick', alarm);
    },
    handleSortChange(sortInfo) {
      this.sortBy = sortInfo.prop;
      this.sortOrder = sortInfo.order === 'ascending' ? 'asc' : 'desc';
      this.refreshCurrentPage();
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
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
  text-align: center;
}
</style>
