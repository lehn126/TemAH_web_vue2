<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      size="small"
    >
      <el-form-item v-if="!isCreateModel" label="AlarmID" prop="id">
        <el-input disabled v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="ManagedObject" prop="managedObject">
        <el-input v-model="ruleForm.managedObject"></el-input>
      </el-form-item>
      <el-form-item label="EventTime" required>
        <el-col :span="11">
          <el-form-item prop="eventDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.eventDate"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="eventTime">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.eventTime"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="AlarmType" prop="alarmType" style="text-align: left">
        <el-select v-model="ruleForm.alarmType" placeholder="请选择AlarmType">
          <el-option label="CommunicationsAlarm" value="CommunicationsAlarm"></el-option>
          <el-option label="ProcessingErrorAlarm" value="ProcessingErrorAlarm"></el-option>
          <el-option label="EnvironmentalAlarm" value="EnvironmentalAlarm"></el-option>
          <el-option label="QualityOfServiceAlarm" value="QualityOfServiceAlarm"></el-option>
          <el-option label="EquipmentAlarm" value="EquipmentAlarm"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Severity" prop="perceivedSeverity" style="text-align: left">
        <el-select v-model="ruleForm.perceivedSeverity" placeholder="请选择Severity">
          <el-option label="Cleared" value="Cleared"></el-option>
          <el-option label="Indeterminate" value="Indeterminate"></el-option>
          <el-option label="Critical" value="Critical"></el-option>
          <el-option label="Major" value="Major"></el-option>
          <el-option label="Minor" value="Minor"></el-option>
          <el-option label="Warning" value="Warning"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ProbableCause" prop="probableCause">
        <el-input v-model="ruleForm.probableCause"></el-input>
      </el-form-item>
      <el-form-item label="SpecificProblem" prop="specificProblem">
        <el-input v-model="ruleForm.specificProblem"></el-input>
      </el-form-item>
      <el-form-item label="Cleared" prop="clearFlag" style="text-align: left">
        <el-switch v-model="ruleForm.clearFlag"></el-switch>
      </el-form-item>
      <el-form-item label="Terminated" prop="terminateState" style="text-align: left">
        <el-switch v-model="ruleForm.terminateState"></el-switch>
      </el-form-item>
      <el-form-item label="AdditionalText" prop="additionalText">
        <el-input type="textarea" v-model="ruleForm.additionalText"></el-input>
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
import { formatRFC3339 } from 'date-fns';
import getFieldValue from '@/utils/object-utils';

// 根据props传入的数据初始化form内的数据
function computeInitData(newData) {
  return {
    id: getFieldValue(newData, 'id', ''),
    managedObject: getFieldValue(newData, 'managedObject', ''),
    eventDate: getFieldValue(newData, 'eventDate', new Date()),
    eventTime: getFieldValue(newData, 'eventTime', new Date()),
    alarmType: getFieldValue(newData, 'alarmType', ''),
    perceivedSeverity: getFieldValue(newData, 'perceivedSeverity', ''),
    probableCause: getFieldValue(newData, 'probableCause', ''),
    specificProblem: getFieldValue(newData, 'specificProblem', ''),
    clearFlag: getFieldValue(newData, 'clearFlag', false),
    terminateState: getFieldValue(newData, 'terminateState', false),
    additionalText: getFieldValue(newData, 'additionalText', ''),
  };
}

// 转换form data为alarm dto使用的格式
function transformAlarmData(formData) {
  const et = new Date();
  et.setTime(formData.eventDate.getTime());
  et.setHours(formData.eventTime.getHours());
  et.setSeconds(formData.eventTime.getSeconds());
  et.setMinutes(formData.eventTime.getMinutes());
  et.setMilliseconds(formData.eventTime.getMilliseconds());

  const alarmData = {
    id: formData.id === '' ? null : parseInt(formData.id, 10),
    managedObject: formData.managedObject,
    eventTime: formatRFC3339(et, { fractionDigits: 3 }),
    alarmType: formData.alarmType,
    perceivedSeverity: formData.perceivedSeverity,
    probableCause: formData.probableCause,
    specificProblem: formData.specificProblem,
    clearFlag: formData.clearFlag ? 1 : 0,
    terminateState: formData.terminateState ? 1 : 0,
    additionalText: formData.additionalText,
  };
  return alarmData;
}

function submit(vm, formData) {
  const alarmData = transformAlarmData(formData);
  vm.$emit('submit-edit', alarmData);
}

export default {
  name: 'AlarmCreate',
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
        id: getFieldValue(this.initData, 'id', ''),
        managedObject: getFieldValue(this.initData, 'managedObject', ''),
        eventDate: getFieldValue(this.initData, 'eventDate', new Date()),
        eventTime: getFieldValue(this.initData, 'eventTime', new Date()),
        alarmType: getFieldValue(this.initData, 'alarmType', ''),
        perceivedSeverity: getFieldValue(this.initData, 'perceivedSeverity', ''),
        probableCause: getFieldValue(this.initData, 'probableCause', ''),
        specificProblem: getFieldValue(this.initData, 'specificProblem', ''),
        clearFlag: getFieldValue(this.initData, 'clearFlag', false),
        terminateState: getFieldValue(this.initData, 'terminateState', false),
        additionalText: getFieldValue(this.initData, 'additionalText', ''),
      },
      rules: {
        id: [{ required: !this.isCreateModel, message: 'ID不能为空', trigger: 'change' }],
        name: [
          { required: true, message: '请输入ManagedObject', trigger: 'blur' },
          {
            min: 3,
            max: 255,
            message: '长度在 3 到 255 个字符',
            trigger: 'blur',
          },
        ],
        eventDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        eventTime: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
          },
        ],
        alarmType: [{ required: true, message: '请选择AlarmType', trigger: 'change' }],
        perceivedSeverity: [{ required: true, message: '请选择Severity', trigger: 'change' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交告警信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.disable();
            submit(this, this.ruleForm);

            this.$message({
              type: 'success',
              message: '提交成功!',
            });
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
