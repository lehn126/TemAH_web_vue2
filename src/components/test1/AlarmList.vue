<template>
  <div class="tab-container" style="width: 100%">
    <el-table
      :data="alarms"
      :border="true"
      :stripe="true"
      :fit="true"
      size="small"
      :row-key="(alarm) => alarm.id"
      @row-dblclick="handleRowDblclick"
    >
      <el-table-column prop="id" type="selection" width="40px"> </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        :resizable="true"
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
        :show-overflow-tooltip="true"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        prop="alarmType"
        label="AlarmType"
        :resizable="true"
        :show-overflow-tooltip="true"
        width="125px"
      >
      </el-table-column>
      <el-table-column
        prop="perceivedSeverity"
        label="Severity"
        :resizable="true"
        :show-overflow-tooltip="true"
        width="80px"
      >
      </el-table-column>
      <el-table-column
        prop="clearFlag"
        label="Clear"
        :formatter="transformClearFlag"
        :resizable="true"
        :show-overflow-tooltip="true"
        width="110px"
      >
      </el-table-column>
      <el-table-column
        prop="terminateState"
        label="Terminate"
        :formatter="transformTerminateStatus"
        :resizable="true"
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
import requests from '../../http';

const PAGE_SIZE = 10;

function getAll(pageIndex, recall) {
  let reqPageIndex = pageIndex;
  if (pageIndex < 0) {
    reqPageIndex = 0;
  }

  requests({
    url: '/alarm/getAll',
    method: 'get',
    params: {
      pageIndex: reqPageIndex,
      pageSize: PAGE_SIZE,
    },
  })
    .then((response) => {
      // 处理成功情况
      const code = response.errCode;
      if (code === '0') {
        recall(response);
      }
    })
    .catch((error) => {
      // 处理错误情况
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      console.log(error.config);
    })
    .then(() => {
      // 总是会执行
    });
}

export default {
  name: 'AlarmList',
  data() {
    return {
      alarms: [],
      maxCount: 0,
      maxPage: 0,
      pageIndex: 0,
      pageSize: PAGE_SIZE,
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
      getAll(this.pageIndex - 1, this.refreshPageData);
    },
    pageAfter() {
      getAll(this.pageIndex + 1, this.refreshPageData);
    },
    handlePageChange(val) {
      getAll(val, this.refreshPageData);
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
  },
  mounted() {
    getAll(1, this.refreshPageData);
  },
};
</script>
<style>
.tab-container {
  padding: 8px;
}
</style>
