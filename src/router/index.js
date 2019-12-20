import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 导航栏
import Login from '@/components/Login'
import Header from '@/components/Header'

/* 销售管理员用例 */ 
// - 布局
import SalesAdminMainPage from '@/components/SalesAdminLayout/SalesAdminMainPage'
import SalesAdminLayout from '@/components/SalesAdminLayout/SalesAdminLayout'
// - 用户管理
import PersonalInfo from '@/components/SalesAdminLayout/Views/PersonInfo/PersonalInfo'
import LoginInfo from '@/components/SalesAdminLayout/Views/PersonInfo/LoginInfo'
// - 销售员工管理
import AddSales from '@/components/SalesAdminLayout/Views/Sales/AddSales'
import EditSales from '@/components/SalesAdminLayout/Views/Sales/EditSales'
import SalesList from '@/components/SalesAdminLayout/Views/Sales/SalesList'
// - 客户管理
import AddCustomer from '@/components/SalesAdminLayout/Views/Customer/AddCustomer'
import EditCustomer from '@/components/SalesAdminLayout/Views/Customer/EditCustomer'
import CustomerList from '@/components/SalesAdminLayout/Views/Customer/CustomerList'
// - 合同管理
import AddContract from '@/components/SalesAdminLayout/Views/Contract/AddContract'
import EditContract from '@/components/SalesAdminLayout/Views/Contract/EditContract'
import CheckContract from '@/components/SalesAdminLayout/Views/Contract/CheckContract'
import ContractList from '@/components/SalesAdminLayout/Views/Contract/ContractList'
// - 商品管理
import AddProduct from '@/components/SalesAdminLayout/Views/Product/AddProduct'
import EditProduct from '@/components/SalesAdminLayout/Views/Product/EditProduct'
import ProductList from '@/components/SalesAdminLayout/Views/Product/ProductList'
// - 添加发货单
import ShippingList from '@/components/SalesAdminLayout/Views/ShippingManage/ShippingList'
// - 销售数据统计
import QuerySalesStatistic from '@/components/SalesAdminLayout/Views/SalesStatistic/QuerySalesStatistic'

// 销售人员用例
import SalesMainPage from '@/components/SalesLayout/SalesMainPage'
import SalesLayout from '@/components/SalesLayout/SalesLayout'
import QueryContractExecution from '@/components/SalesLayout/Views/QueryContractExecution'
import QuerySalesPerformance from '@/components/SalesLayout/Views/QuerySalesPerformance'
import SalesLoginInfo from '@/components/SalesLayout/Views/PersonInfo/LoginInfo'
import SalesPersonalInfo from '@/components/SalesLayout/Views/PersonInfo/PersonalInfo'

// 仓库管理员用例
import WareMainPage from '@/components/WareLayout/WareMainPage'
import WareLayout from '@/components/WareLayout/WareLayout'
import WareLoginInfo from '@/components/WareLayout/Views/PersonInfo/WareLoginInfo'
import WarePersonalInfo from '@/components/WareLayout/Views/PersonInfo/WarePersonalInfo'
import ShippingManage from '@/components/WareLayout/Views/ShippingManage'
import PurchasingManage from '@/components/WareLayout/Views/PurchasingManage'
import LogisticsInfoList from '@/components/WareLayout/Views/LogisticsInfoList'
import EditLogisticInfo from '@/components/WareLayout/Views/EditLogisticInfo'
import AddPurchasingOrder from '@/components/WareLayout/Views/AddPurchasingOrder'


Vue.use(Router)

export default new Router({
  routes: [
    // 登录 
    {
      path:'/',
      name:'Login',
      component:Login
    },
    // 销售管理员用例
    {
      path: '/SalesAdmin',
      name: 'SalesAdminLayout',
      component:SalesAdminLayout,
      children:[{
        // 主页
        path: '/SalesAdminMainPage',
        name: 'SalesAdminMainPage',
        component:SalesAdminMainPage
      },{
        // 个人信息管理
        path: '/PersonalInfo',
        name: 'PersonalInfo',
        component: PersonalInfo
      },{
        // 登录信息管理
        path: '/LoginInfo',
        name: 'LoginInfo',
        component: LoginInfo
      },{
        // 销售人员管理
        path: '/AddSales',
        name: 'AddSales',
        component: AddSales
      },{
        path: '/EditSales',
        name: 'EditSales',
        component: EditSales
      },{
        path: '/SalesList',
        name: 'SalesList',
        component: SalesList
      },{
        // 客户管理
        path: '/AddCustomer',
        name: 'AddCustomer',
        component: AddCustomer
      },{
        path: '/EditCustomer',
        name: 'EditCustomer',
        component: EditCustomer
      },{
        path: '/CustomerList',
        name: 'CustomerList',
        component: CustomerList
      },{
        // 合同管理
        path: '/AddContract',
        name: 'AddContract',
        component: AddContract
      },{
        path: '/EditContract',
        name: 'EditContract',
        component: EditContract
      },{
        path: '/ContractList',
        name: 'ContractList',
        component: ContractList
      },{
        path: '/CheckContract',
        name: 'CheckContract',
        component: CheckContract
      },{
        // 商品管理
        path: '/AddProduct',
        name: 'AddProduct',
        component: AddProduct
      },{
        path: '/EditProduct',
        name: 'EditProduct',
        component: EditProduct
      },{
        path: '/ProductList',
        name: 'ProductList',
        component: ProductList
      },{
         // 发货单管理
        path: '/ShippingList',
        name: 'ShippingList',
        component: ShippingList
      },{
        // 销售数据统计管理 
        path: '/QuerySalesStatistic',
        name: 'QuerySalesStatistic',
        component: QuerySalesStatistic
      }]
    },
    // 销售人员用例
    {
      path: '/Sales',
      name: 'SalesLayout',
      component:SalesLayout,
      children:[{
        path: '/SalesMainPage',
        name: 'SalesMainPage',
        component: SalesMainPage  
      },{
        // 个人信息管理
        path: '/SalesLoginInfo',
        name: 'SalesLoginInfo',
        component: SalesLoginInfo
      },{
        path: '/SalesPersonalInfo',
        name: 'SalesPersonalInfo',
        component: SalesPersonalInfo
      },{
        path: '/QueryContractExecution',
        name: 'QueryContractExecution',
        component: QueryContractExecution
      },{
        path: '/QuerySalesPerformance',
        name: 'QuerySalesPerformance',
        component: QuerySalesPerformance
      }]
    },
    // 仓库管理员用例
    {
      path: '/Ware',
      name: 'WareLayout',
      component:WareLayout,
      children:[{
        path: '/WareMainPage',
        name: 'WareMainPage',
        component: WareMainPage
      },{
        // 个人信息管理
        path: '/WareLoginInfo',
        name: 'WareLoginInfo',
        component: WareLoginInfo
      },{
        path: '/WarePersonalInfo',
        name: 'WarePersonalInfo',
        component: WarePersonalInfo
      },{
        // 发货管理
        path: '/ShippingManage',
        name: 'ShippingManage',
        component: ShippingManage
      },{
        // 进货管理
        path: '/PurchasingManage',
        name: 'PurchasingManage',
        component: PurchasingManage
      },{
        // 物流信息管理
        path: '/LogisticsInfoList',
        name: 'LogisticsInfoList',
        component: LogisticsInfoList
      },{
        path: '/EditLogisticInfo',
        name: 'EditLogisticInfo',
        component: EditLogisticInfo
      },{
        path: '/AddPurchasingOrder',
        name: 'AddPurchasingOrder',
        component: AddPurchasingOrder
      }]
    }
  ]
})
