// 对于axios进行二次封装
import axios from 'axios';

// 底下的代码也是创建axios实例
const requests = axios.create({
  // 基础路径
  baseURL: 'http://192.168.2.105:8001',
  // 请求不能超过5S
  timeout: 5000,
});

// 请求拦截器（可以在请求发出去之前，做一些事情）
requests.interceptors.request.use(
  // 在发送请求之前做些什么
  (config) => config,
  // 对请求错误做些什么
  (err) => err,
);

// 响应拦截器（在数据返回之后，做一些事情）
requests.interceptors.response.use(
  // 对响应数据做点什么
  (res) => res.data,
  // 对响应错误做点什么
  (err) => err,
);
export default requests;
