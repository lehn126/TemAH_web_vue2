<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      size="small"
      class="demo-ruleForm"
    >
      <el-form-item v-if="!createModel" label="AlarmID" prop="id">
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
      <el-form-item label="AlarmType" prop="alarmType" style="text-align: left;">
        <el-select v-model="ruleForm.alarmType" placeholder="请选择AlarmType">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Severity" prop="perceivedSeverity" style="text-align: left;">
        <el-select v-model="ruleForm.perceivedSeverity" placeholder="请选择Severity">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ProbableCause" prop="probableCause">
        <el-input v-model="ruleForm.probableCause"></el-input>
      </el-form-item>
      <el-form-item label="SpecificProblem" prop="specificProblem">
        <el-input v-model="ruleForm.specificProblem"></el-input>
      </el-form-item>
      <el-form-item label="Cleared" prop="clearFlag" style="text-align: left;">
        <el-switch v-model="ruleForm.clearFlag"></el-switch>
      </el-form-item>
      <el-form-item label="Terminated" prop="terminateState" style="text-align: left;">
        <el-switch v-model="ruleForm.terminateState"></el-switch>
      </el-form-item>
      <el-form-item label="AdditionalText" prop="additionalText">
        <el-input type="textarea" v-model="ruleForm.additionalText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { formatRFC3339 } from 'date-fns';

function getFieldValue(data, fieldName, defaultValue) {
  const defValue = defaultValue === undefined ? null : defaultValue;
  if (data === undefined || data == null) {
    return defValue;
  }
  if (Object.hasOwn(data, fieldName)) {
    return data[fieldName];
  }
  return defValue;
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
      createModel: this.isCreate,
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
        id: [{ required: !this.createModel, message: 'ID不能为空', trigger: 'change' }],
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
          alert('submit!');

          const et = new Date();
          et.setTime(this.ruleForm.eventDate.getTime());
          et.setHours(this.ruleForm.eventTime.getHours());
          et.setSeconds(this.ruleForm.eventTime.getSeconds());
          et.setMinutes(this.ruleForm.eventTime.getMinutes());
          et.setMilliseconds(this.ruleForm.eventTime.getMilliseconds());

          const alarmData = {
            id: this.ruleForm.id === '' ? null : parseInt(this.ruleForm.id, 10),
            managedObject: this.ruleForm.managedObject,
            eventTime: formatRFC3339(et, { fractionDigits: 3 }),
            alarmType: this.ruleForm.alarmType,
            perceivedSeverity: this.ruleForm.perceivedSeverity,
            probableCause: this.ruleForm.probableCause,
            specificProblem: this.ruleForm.specificProblem,
            clearFlag: this.ruleForm.clearFlag ? 1 : 0,
            terminateState: this.ruleForm.terminateState ? 1 : 0,
            additionalText: this.ruleForm.additionalText,
          };

          console.log(alarmData);

          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style></style>
