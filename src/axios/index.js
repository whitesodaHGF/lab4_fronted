/*引入Vue框架*/
import Vue from 'vue';
/*引入资源请求插件*/
import axios from 'axios';
import qs from 'qs';
import { Message } from "element-ui";
import global_ from '../components/Global' //应用文件
import VueSession from 'vue-session';
Vue.use(VueSession)
/*使用axios插件*/
Vue.prototype.$axios = axios;
//Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
const Axios = axios.create({
    baseURL: "/apis",
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        // "Content-Type": "application/json;charset=utf-8",
    }
});


//传参序列化
Axios.interceptors.request.use(
    (config) => {
        config.data = qs.stringify(config.data);
        if (global_.token) {
            config.headers['token'] = global_.token
        }
        return config;
    },
    (error) => {
        Message({
            //  饿了么的消息弹窗组件,类似toast
            showClose: true,
            message: error,
            type: "error.data.error.message"
        });
        return Promise.reject(error);
    });

//返回状态判断
Axios.interceptors.response.use((res) => {
    if (res.data && res.data.code != '200') {
        console.log(res)
        return Promise.reject(res);
    }
    var ROLE = res.headers['role'];
    if (ROLE) {
        console.log(ROLE);
        global_.ROLE = ROLE;
    }
    return res;
},
    (error) => {
        return Promise.reject(error);
    });

//进行封装处理
const request = (url, method, params) => {
    return new Promise((resolve, reject) => {
        if (method == 'post') {
            Axios.post(url, params)
                .then((res) => {

                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("出错啦")
                    reject(err)
                })
        } else if (method == 'get') {
            Axios.get(url, { params: params })
                .then((res) => {

                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("出错啦")
                    console.log("----------------")
                    reject(err)
                })
        } else if (method == 'put') {
            Axios.put(url, params)
                .then((res) => {

                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("出错啦")
                    reject(err)
                })
        } else if (method == 'delete') {
            Axios.delete(url, params)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log("出错啦")
                    reject(err)
                })
        }
    })
}
export default ({
    // 登录
    login: (data) => {
        return request('/user/login', 'post', data)
    },
    // 销售管理员用例 
    // - 用户信息管理
    getPersonInfo: (data) => {
        return request('/user/personInfo', 'get', '')
    },
    updatePersonInfo: (data) => {
        return request('/user/personInfo', 'put', data)
    },
    // - 登录信息管理
    getLoginInfo: (data) => {
        return request('/user/loginInfo', 'get', '')
    },
    updateLoginInfo: (data) => {
        return request('/user/loginInfo', 'put', data)
    },
    // - 销售人员管理
    getSalesPeoples: (data) => {
        return request('/admin/sales/All', 'get', data)
    },
    getSalesPeople: (data) => {
        return request('/admin/sales', 'get', data)
    },
    addSalesPeople: (data) => {
        return request('/admin/sales', 'post', data)
    },
    updateSalesPeople: (data) => {
        return request('/admin/sales', 'put', data)
    },
    // - 客户管理
    getCustomers: (data) => {
        return request('/admin/customer/All', 'get', '')
    },
    getCustomer: (data) => {
        return request('/admin/customer', 'get', data)
    },
    addCustomer: (data) => {
        return request('/admin/customer', 'post', data)
    },
    updateCustomer: (data) => {
        return request('/admin/customer', 'put', data)
    },
    // - 销售数据统计
    getSalesStatistic: (data) => {
        return request('/admin/statistic', 'get', data)
    },
    // - 商品管理
    getProducts: (data) => {
        return request('/admin/product/All', 'get', '')
    },
    getProduct: (data) => {
        return request('/admin/product', 'get', data)
    },
    addProduct: (data) => {
        return request('/admin/product', 'post', data)
    },
    updateProduct: (data) => {
        return request('/admin/product', 'put', data)
    },
    // - 合同管理
    getContracts: (data) => {
        return request('/admin/contract/All', 'get', '')
    },
    getContract: (data) => {
        return request('/admin/contract', 'get', data)
    },
    addContract: (data) => {
        return request('/admin/contract', 'post', data)
    },
    updateContract: (data) => {
        return request('/admin/contract', 'put', data)
    },
    // - 采购清单管理
    getPurchasingLists: (data) => {
        return request('/admin/purchasingList/All', 'get', '')
    },
    getPurchasingList: (data) => {
        return request('/admin/purchasingList', 'get', data)
    },
    getPurchasingListByContractId: (data) => {
        return request('/admin/purchasingList/byContractId', 'get', data)
    },
    addPurchasingList: (data) => {
        return request('/admin/purchasingList', 'post', data)
    },
    updatePurchasingList: (data) => {
        return request('/admin/purchasingList', 'put', data)
    },
    deletePurchasingList: (data) => {
        return request('/admin/purchasingList', 'delete', data)
    },
    getPurchasingListDTOs: (data) => {
        return request('/admin/purchasingList/Full', 'get', data)
    },
    addDelivery: (data) => {
        return request('/admin/purchasingList/addDelivery', 'post', data)
    },
    // 仓库管理员用例
    // - 发货管理
    getShippingOrders: (data) => {
        return request('/ware/shipping/All', 'get', data)
    },
    getShippingOrder: (data) => {
        return request('/ware/shipping', 'get', data)
    },
    confirmShipment: (data) => {
        return request('/ware/shipping', 'put', data)
    },
    // - 进货管理
    getPurchaseOrders: (data) => {
        return request('/ware/purchasing/All', 'get', data)
    },
    getPurchaseOrder: (data) => {
        return request('/ware/purchasing', 'get', data)
    },
    getPurchaseOrdersExtra: (data) => {
        return request('/ware/purchasing/extra', 'get', data)
    },
    confirmPurchase: (data) => {
        return request('/ware/purchasing', 'put', data)
    },
    addPurchaseOrder: (data) => {
        return request('/ware/purchasing', 'post', data)
    },
    // - 物流信息管理
    getLogisticInfos: (data) => {
        return request('/ware/purchasing/logisticInfo/All', 'get', data)
    },
    getLogisticInfo: (data) => {
        return request('/ware/purchasing/logisticInfo', 'get', data)
    },
    addLogisticsInfo: (data) => {
        return request('/ware/purchasing/logisticInfo', 'post', data)
    },
    // 销售人员用例
    // - 销售额统计
    getSalesStatisticBySalesId: (data) => {
        return request('/sales/sales_performance', 'get', data)
    },
    // 查询合同执行情况 
    getFulfillContract: (data) => {
        return request('/sales/contract_execution', 'get', data)
    },

    

});
