<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      size="small"
    >
      <el-form-item v-if="!isCreateModel" label="任务ID" prop="jobId">
        <el-input disabled v-model="ruleForm.jobId"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="beanName" style="text-align: left">
        <el-select v-model="ruleForm.beanName" placeholder="请选择设备类型">
          <el-option label="本地设备" value="localPlatformStateTask"></el-option>
          <el-option label="远程设备" value="remotePlatformStateTask"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型" prop="methodName" style="text-align: left">
        <el-select v-model="ruleForm.methodName" placeholder="请选择任务类型">
          <el-option label="CPU负载监控" value="getUsedCpu"></el-option>
          <el-option label="内存占用监控" value="getUsedMemory"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务参数" prop="methodParams">
        <el-input type="textarea" v-model="ruleForm.methodParams"></el-input>
      </el-form-item>
      <el-form-item label="Cron表达式" prop="cronExpression">
        <el-input v-model="ruleForm.cronExpression"></el-input>
      </el-form-item>
      <el-form-item label="任务状态" prop="jobStatus" style="text-align: left">
        <el-switch :v-model="ruleForm.jobStatus"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="isDisabled" type="primary" @click="submitForm('ruleForm')"
          >{{ submitButtonValue }}</el-button
        >
        <el-button :disabled="isDisabled" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import getFieldValue from '@/utils/object-utils';

// 根据props传入的数据初始化form内的数据
function computeInitData(newData) {
  return {
    jobId: getFieldValue(newData, 'job_id', ''),
    beanName: getFieldValue(newData, 'bean_name', ''),
    methodName: getFieldValue(newData, 'method_name', ''),
    methodParams: getFieldValue(newData, 'method_params', ''),
    cronExpression: getFieldValue(newData, 'cron_expression', ''),
    remark: getFieldValue(newData, 'remark', ''),
    jobStatus: getFieldValue(newData, 'job_status', 0) === 1,
  };
}

// 转换form data为API dto使用的格式
function transformFormData(formData) {
  const apiData = {
    jobId: formData.jobId === '' ? null : formData.jobId,
    beanName: formData.beanName,
    methodName: formData.methodName,
    methodParams: formData.methodParams,
    cronExpression: formData.cronExpression,
    remark: formData.remark,
    jobStatus: formData.jobStatus ? 1 : 0,
  };
  return apiData;
}

function submit(vm, formData) {
  const apiData = transformFormData(formData);
  vm.$emit('submit-edit', apiData);
}

export default {
  name: 'TaskEdit',
  props: {
    isCreate: {
      required: true,
      type: Boolean,
      default: false,
    },
    initData: {
      required: false,
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      isCreateModel: this.isCreate,
      isDisabled: true,
      submitButtonValue: this.isCreate ? '立即创建' : '提交修改',
      ruleForm: {
        jobId: getFieldValue(this.initData, 'job_id', ''),
        beanName: getFieldValue(this.initData, 'bean_name', ''),
        methodName: getFieldValue(this.initData, 'method_name', ''),
        methodParams: getFieldValue(this.initData, 'method_params', ''),
        cronExpression: getFieldValue(this.initData, 'cron_expression', ''),
        remark: getFieldValue(this.initData, 'remark', ''),
        jobStatus: getFieldValue(this.initData, 'job_status', 0) === 1,
      },
      rules: {
        jobId: [{ required: !this.isCreateModel, message: 'ID不能为空', trigger: 'change' }],
        beanName: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        methodName: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        methodParams: [
          { required: true, message: '请输入任务参数', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur',
          },
        ],
        cronExpression: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交任务信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.disable();
            submit(this, this.ruleForm);

            // this.$message({
            //   type: 'success',
            //   message: '提交成功!',
            // });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交',
            });
          });

          return true;
        }
        return false;
      });
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.ruleForm = computeInitData(this.initData);
    },
    enable() {
      this.isDisabled = false;
    },
    disable() {
      this.isDisabled = true;
    },
  },
  watch: {
    initData() {
      this.ruleForm = computeInitData(this.initData);
    },
  },
};
</script>
<style></style>
