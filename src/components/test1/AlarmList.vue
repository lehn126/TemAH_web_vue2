<template>
  <div class="alarm-list-container" style="width: 100%">
    <div style="text-align: left">
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length <= 0"
        @click="handleTerminate"
        >Terminate</el-button
      >
    </div>
    <div style="margin-top: 8px">
      <el-table
        :data="alarms"
        :border="true"
        :stripe="true"
        :fit="true"
        size="small"
        :row-key="(alarm) => alarm.id"
        @row-dblclick="handleRowDblclick"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" type="selection" width="40px"> </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          prop="managedObject"
          label="ManagedObject"
          :resizable="true"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="eventTime"
          label="EventTime"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="200px"
        >
        </el-table-column>
        <el-table-column
          prop="alarmType"
          label="AlarmType"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="125px"
        >
        </el-table-column>
        <el-table-column
          prop="perceivedSeverity"
          label="Severity"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="clearFlag"
          label="Clear"
          :formatter="transformClearFlag"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="110px"
        >
        </el-table-column>
        <el-table-column
          prop="terminateState"
          label="Terminate"
          :formatter="transformTerminateStatus"
          :resizable="true"
          sortable="custom"
          :show-overflow-tooltip="true"
          width="135px"
        >
        </el-table-column>
        <el-table-column
          prop="additionalText"
          label="AdditionalText"
          :resizable="true"
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
import http from '@/utils/http';
import constants from '@/utils/constants';

const PAGE_SIZE = 10;

function getAll(pageIndex, sortBy, sortOrder, callback) {
  let reqPageIndex = pageIndex;
  if (pageIndex < 0) {
    reqPageIndex = 0;
  }

  http
    .httpGet(constants.URL_ALARM_GET_ALL, {
      pageIndex: reqPageIndex,
      pageSize: PAGE_SIZE,
      sortBy,
      sortOrder,
    })
    .then((response) => {
      // 处理成功情况
      const code = response.errCode;
      if (code === '0') {
        callback(response);
      }
    })
    .catch((error) => {
      // 处理错误情况
      this.$notify.error({
        title: '操作失败',
        message: `操作失败, 错误: ${error.message}`,
        type: 'warning',
      });
    });
}

function terminateAlarms(ids, vm, callback) {
  http.httpPost(constants.URL_ALARM_TERMINATE, ids, { 'Content-Type': 'text/plain' })
    .then((response) => {
      // 处理成功情况
      const code = response.errCode;
      if (code === '0') {
        vm.$notify({
          title: '操作成功',
          message: 'Terminate操作执行成功',
          type: 'success',
          duration: 1000,
        });
        callback();
      } else {
        vm.$notify({
          title: '操作失败',
          message: `操作失败, 错误码: ${code}`,
          type: 'warning',
        });
      }
    })
    .catch((error) => {
      // 处理错误情况
      vm.$notify.error({
        title: '操作失败',
        message: `操作失败, 错误: ${error.message}`,
      });
    });
}

export default {
  name: 'AlarmList',
  data() {
    return {
      alarms: [],
      selectedRows: [],
      maxCount: 0,
      maxPage: 0,
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      sortBy: '',
      sortOrder: '',
    };
  },
  computed: {
    isFirstPage() {
      return this.pageIndex <= 1;
    },
    isLatestPage() {
      return this.pageIndex >= this.maxPage;
    },
  },
  methods: {
    refreshPageData(respData) {
      this.alarms = respData.data.pageData;
      this.maxCount = respData.data.maxCount;
      this.maxPage = respData.data.maxPage;
      this.pageIndex = respData.data.pageIndex;
      this.pageSize = respData.data.pageSize;
    },
    pageBefore() {
      getAll(this.pageIndex - 1, this.sortBy, this.sortOrder, this.refreshPageData);
    },
    pageAfter() {
      getAll(this.pageIndex + 1, this.sortBy, this.sortOrder, this.refreshPageData);
    },
    refreshCurrentPage() {
      getAll(this.pageIndex, this.sortBy, this.sortOrder, this.refreshPageData);
    },
    handlePageChange(val) {
      getAll(val, this.sortBy, this.sortOrder, this.refreshPageData);
    },
    transformClearFlag(row, column, cellValue) {
      return cellValue === 0 ? 'NOT_CLEARED' : 'CLEARED';
    },
    transformTerminateStatus(row, column, cellValue) {
      return cellValue === 0 ? 'NOT_TERMINATED' : 'TERMINATED';
    },
    handleRowDblclick(alarm) {
      this.$emit('alarm-dblclick', alarm);
    },
    handleSortChange(sortInfo) {
      this.sortBy = sortInfo.prop;
      this.sortOrder = sortInfo.order === 'ascending' ? 'asc' : 'desc';
      this.refreshCurrentPage();
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    handleTerminate() {
      if (this.selectedRows.length > 0) {
        this.$confirm('此操作将Terminate选定的告警, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '开始执行操作!',
            });
            terminateAlarms(this.selectedRows.map((alarm) => alarm.id).join(','), this, this.refreshCurrentPage);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            });
          });
      }
    },
  },
  mounted() {
    getAll(1, this.sortBy, this.sortOrder, this.refreshPageData);
  },
};
</script>
<style>
.alarm-list-container {
  padding: 8px;
  text-align: center;
}
</style>
