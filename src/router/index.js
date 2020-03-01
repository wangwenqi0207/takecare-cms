import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    hidden: true
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/menu',
  //   component: Layout,
  //   redirect: '/menu/menu_mng',
  //   name: '菜单权限管理',
  //   meta: { title: '菜单权限管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'menu_mng',
  //       name: '菜单管理',
  //       component: () => import('@/views/system/menu_mng'),
  //       meta: { title: '菜单管理', icon: 'table' },
  //       children: []
  //     },
  //     {
  //       path: 'corp_mng',
  //       name: '公司管理',
  //       component: () => import('@/views/system/corp_mng'),
  //       meta: { title: '公司管理', icon: 'table' },
  //       children: []
  //     },
  //     {
  //       path: 'role_mng',
  //       name: '角色管理',
  //       component: () => import('@/views/system/role_mng'),
  //       meta: { title: '角色管理', icon: 'table' },
  //       children: []
  //     }, {
  //       path: 'roledis_mng',
  //       name: '用户管理角色分配',
  //       component: () => import('@/views/system/roledis_mng'),
  //       meta: { title: '用户管理角色分配', icon: 'table' },
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/account/staff_mng',
  //   name: '账号管理',
  //   meta: { title: '账号管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'staff_mng',
  //       name: '员工管理',
  //       component: () => import('@/views/account/staff_mng'),
  //       meta: { title: '员工管理', icon: 'table' },
  //       children: [
  //         {
  //           path: 'add',
  //           name: '新增账号',
  //           component: () => import('@/views/account/employee_add.vue'),
  //           meta: { title: '新增账号', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'update',
  //           name: '修改账号',
  //           component: () => import('@/views/account/employee_update.vue'),
  //           meta: { title: '修改账号', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'detail',
  //           name: '账号详情',
  //           component: () => import('@/views/account/employee_detail.vue'),
  //           meta: { title: '账号详情', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'role_permission',
  //           name: '角色权限设置',
  //           component: () => import('@/views/account/role_permission_add.vue'),
  //           meta: { title: '角色权限设置', icon: 'table' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: 'user_mng',
  //       name: '用户管理',
  //       component: () => import('@/views/account/user_mng'),
  //       meta: { title: '用户管理', icon: 'tree' },
  //       children: [
  //         {
  //           path: 'create',
  //           name: '用户注册',
  //           component: () => import('@/views/account/user_create.vue'),
  //           meta: { title: '用户注册', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'update',
  //           name: '用户修改',
  //           component: () => import('@/views/account/user_update.vue'),
  //           meta: { title: '用户修改', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'detail',
  //           name: '用户详情',
  //           component: () => import('@/views/account/user_detail.vue'),
  //           meta: { title: '用户详情', icon: 'table' },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },

  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/user_info',
  //   name: '账号信息',
  //   meta: { title: '账号信息', icon: 'example' },
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'user_info',
  //       name: '账号信息',
  //       component: () => import('@/views/user/user_info'),
  //       meta: { title: '账号信息', icon: 'table' }
  //     },
  //     {
  //       path: 'update',
  //       name: '修改密码',
  //       component: () => import('@/views/user/update'),
  //       meta: { title: '修改密码', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/operation_mng',
  //   component: Layout,
  //   redirect: '/operation_mng/list',
  //   name: '运营管理',
  //   meta: { title: '运营管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'goods_info',
  //       name: '商品信息',
  //       component: () => import('@/views/operation_mng/goods_information'),
  //       meta: { title: '商品信息', icon: 'table' }
  //     },
  //     {
  //       path: 'policy_subsidies',
  //       name: '政策补贴',
  //       component: () => import('@/views/operation_mng/policy_subsidies'),
  //       meta: { title: '政策补贴', icon: 'table' },
  //       children: [
  //         {
  //           path: 'add',
  //           name: '新增',
  //           component: () => import('@/views/operation_mng/policy_add'),
  //           meta: { title: '新增', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'update',
  //           name: '修改',
  //           component: () => import('@/views/operation_mng/policy_update'),
  //           meta: { title: '修改', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'detail',
  //           name: '详情',
  //           component: () => import('@/views/operation_mng/policy_detail'),
  //           meta: { title: '详情', icon: 'table' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: 'price_mng',
  //       name: '价格管理',
  //       component: () => import('@/views/operation_mng/price_mng'),
  //       meta: { title: '价格管理', icon: 'table' }
  //     },
  //     {
  //       path: 'advertising_mng',
  //       name: '广告管理',
  //       component: () => import('@/views/operation_mng/advertising_mng'),
  //       meta: { title: '广告管理', icon: 'table' }
  //     },
  //     {
  //       path: 'activity_mng',
  //       name: '活动管理',
  //       component: () => import('@/views/operation_mng/activity_mng'),
  //       meta: { title: '活动管理', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/order_mng',
  //   component: Layout,
  //   redirect: '/order_mng/all_order',
  //   name: '订单管理',
  //   meta: { title: '订单管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     // 全部订单
  //     {
  //       path: 'all_order',
  //       name: '全部订单',
  //       redirect: '/order_mng/all_order/order_list',
  //       component: () => import('@/views/order_mng/all_order'),
  //       meta: { title: '全部订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '全部订单列表',
  //           component: () => import('@/views/order_mng/all_order/order_tab'),
  //           meta: { title: '全部订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/all_order/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 生活照料订单
  //     {
  //       path: 'daily_care',
  //       name: '生活照料订单',
  //       redirect: '/order_mng/daily_care/order_list',
  //       component: () => import('@/views/order_mng/daily_care'),
  //       meta: { title: '生活照料订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '生活照料订单列表',
  //           component: () => import('@/views/order_mng/daily_care/order_tab'),
  //           meta: { title: '生活照料订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/daily_care/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 医疗护理订单
  //     {
  //       path: 'medical_care',
  //       name: '医疗护理订单',
  //       redirect: '/order_mng/medical_care/order_list',
  //       component: () => import('@/views/order_mng/medical_care'),
  //       meta: { title: '医疗护理订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '医疗护理订单列表',
  //           component: () => import('@/views/order_mng/medical_care/order_tab'),
  //           meta: { title: '医疗护理订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/medical_care/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 机构护理订单
  //     {
  //       path: 'organization_care',
  //       name: '机构护理订单',
  //       redirect: '/order_mng/organization_care/order_list',
  //       component: () => import('@/views/order_mng/organization_care'),
  //       meta: { title: '机构护理订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '机构护理订单列表',
  //           component: () => import('@/views/order_mng/organization_care/order_tab'),
  //           meta: { title: '机构护理订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/organization_care/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 护理器材订单
  //     {
  //       path: 'care_equipment',
  //       name: '护理器材订单',
  //       redirect: '/order_mng/care_equipment/order_list',
  //       component: () => import('@/views/order_mng/care_equipment'),
  //       meta: { title: '护理器材订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '护理器材订单列表',
  //           component: () => import('@/views/order_mng/care_equipment/order_tab'),
  //           meta: { title: '护理器材订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/care_equipment/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 社区订单
  //     {
  //       path: 'community_order',
  //       name: '社区订单',
  //       redirect: '/order_mng/community_order/order_list',
  //       component: () => import('@/views/order_mng/community_order'),
  //       meta: { title: '社区订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '社区订单列表',
  //           component: () => import('@/views/order_mng/community_order/order_tab'),
  //           meta: { title: '社区订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '订单详情',
  //           component: () => import('@/views/order_mng/community_order/order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'custom_order_detail',
  //           name: '社区订制化订单详情',
  //           component: () => import('@/views/order_mng/community_order/custom_order_detail'),
  //           meta: { title: '订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     // 长护险订单
  //     {
  //       path: 'long_care',
  //       name: '长护险订单',
  //       redirect: '/order_mng/long_care/order_list',
  //       component: () => import('@/views/order_mng/long_care'),
  //       meta: { title: '长护险订单', icon: 'table' },
  //       children: [
  //         {
  //           path: 'order_list',
  //           name: '长护险列表',
  //           component: () => import('@/views/order_mng/long_care/order_tab'),
  //           meta: { title: '长护险订单列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'order_detail',
  //           name: '长护险订单详情',
  //           component: () => import('@/views/order_mng/long_care/order_detail'),
  //           meta: { title: '长护险订单详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/comment',
  //   component: Layout,
  //   redirect: '/comment/com_count',
  //   name: '评价管理',
  //   meta: { title: '评价管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'com_count',
  //       name: '评价统计',
  //       component: () => import('@/views/comment/com_count'),
  //       meta: { title: '评价统计', icon: 'table' }
  //     },
  //     {
  //       path: 'com_list',
  //       name: '评价列表',
  //       component: () => import('@/views/comment/com_list'),
  //       meta: { title: '评价列表', icon: 'table' }
  //     }
  //   ]
  // },

  // // 商品服务管理
  // {
  //   path: '/goods_service',
  //   component: Layout,
  //   redirect: '/goods_service/goods_mng',
  //   name: '服务商品管理',
  //   meta: { title: '服务商品管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'goods_mng',
  //       name: '商品管理',
  //       redirect: '/goods_service/goods_mng/goods_list',
  //       component: () => import('@/views/goods_service/goods_mng/index'),
  //       meta: { title: '商品管理', icon: 'table' },
  //       children: [
  //         {
  //           path: 'goods_list',
  //           name: '商品列表',
  //           component: () => import('@/views/goods_service/goods_mng/goods_list'),
  //           meta: { title: '商品列表', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'create_goods',
  //           name: '新增商品',
  //           component: () => import('@/views/goods_service/goods_mng/create_goods'),
  //           meta: { title: '新增商品', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'update_goods',
  //           name: '修改商品',
  //           component: () => import('@/views/goods_service/goods_mng/create_goods'),
  //           meta: { title: '修改商品', icon: 'example' },
  //           hidden: true
  //         },
  //         {
  //           path: 'detail_goods',
  //           name: '商品详情',
  //           component: () => import('@/views/goods_service/goods_mng/create_goods'),
  //           meta: { title: '商品详情', icon: 'example' },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },

  // {
  //   path: '/org_mng',
  //   component: Layout,
  //   redirect: '/org_mng/care_org',
  //   name: '机构管理',
  //   meta: { title: '机构管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'care_org',
  //       redirect: '/org_mng/care_org/care_org_list',
  //       name: '护理机构',
  //       component: () => import('@/views/org_mng/org_file/index'),
  //       meta: { title: '护理机构', icon: 'table' },
  //       children: [
  //         {
  //           path: 'care_org_list',
  //           name: 'care_org_list',
  //           component: () => import('@/views/org_mng/org_file/care_org'),
  //           meta: { title: '机构列表', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'add_org',
  //           name: 'add_org',
  //           component: () => import('@/views/org_mng/org_file/add_org'),
  //           meta: { title: '新增机构', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'look_org',
  //           name: 'look_org',
  //           component: () => import('@/views/org_mng/org_file/look_org'),
  //           meta: { title: '机构详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'write_org',
  //           name: 'write_org',
  //           component: () => import('@/views/org_mng/org_file/write_org'),
  //           meta: { title: '机构详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/employee_mng',
  //   component: Layout,
  //   redirect: '/employee_mng/care_employee',
  //   name: '人员管理',
  //   meta: { title: '人员管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'care_employee',
  //       redirect: '/employee_mng/care_employee/all_employee',
  //       name: '护理人员',
  //       component: () => import('@/views/employee_mng/employee_list/index'),
  //       meta: { title: '护理人员', icon: 'table' },
  //       children: [
  //         {
  //           path: 'all_employee',
  //           name: 'all_employee',
  //           component: () => import('@/views/employee_mng/employee_list/care_employee'),
  //           meta: { title: '全部', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'add_employee',
  //           name: 'add_employee',
  //           component: () => import('@/views/employee_mng/add_employee'),
  //           meta: { title: '新增人员', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'look_employee',
  //           name: 'look_employee',
  //           component: () => import('@/views/employee_mng/look_employee'),
  //           meta: { title: '人员详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'write_employee',
  //           name: 'write_employee',
  //           component: () => import('@/views/employee_mng/write_employee'),
  //           meta: { title: '修改详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'out_employee',
  //           name: 'out_employee',
  //           component: () => import('@/views/employee_mng/out_employee'),
  //           meta: { title: '未通过详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/community',
  //   component: Layout,
  //   redirect: '/community/community_list',
  //   name: '群社区管理',
  //   meta: { title: '群社区管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'community_list',
  //       redirect: '/community/community_list/list',
  //       name: '社区',
  //       component: () => import('@/views/community/index'),
  //       meta: { title: '社区', icon: 'table' },
  //       children: [
  //         {
  //           path: 'list',
  //           name: '群社区列表',
  //           component: () => import('@/views/community/list'),
  //           meta: { title: '社区', icon: 'table' },
  //           hidden: true
  //         },
  //         {
  //           path: 'add_community',
  //           name: 'add_community',
  //           component: () => import('@/views/community/add_community'),
  //           meta: { title: '新增社区', icon: 'el-icon-document-add' },
  //           hidden: true
  //         },
  //         {
  //           path: 'look_community',
  //           name: 'look_community',
  //           component: () => import('@/views/community/look_community'),
  //           meta: { title: '社区详情', icon: 'el-icon-document-add' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: 'black_list',
  //       name: '群社区黑名单',
  //       component: () => import('@/views/community/black_list'),
  //       meta: { title: '社区黑名单', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/account_mng',
  //   component: Layout,
  //   redirect: '/account_mng/list',
  //   name: '账房管理',
  //   meta: { title: '账房管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '账房管理列表',
  //       component: () => import('@/views/account_mng/list'),
  //       meta: { title: '账房管理列表', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/application_mng',
  //   component: Layout,
  //   redirect: '/application_mng/list',
  //   name: '申请管理',
  //   meta: { title: '申请管理', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '申请管理列表',
  //       component: () => import('@/views/application_mng/list'),
  //       meta: { title: '申请管理列表', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nursing_training',
  //   component: Layout,
  //   redirect: '/nursing_training/list',
  //   name: '护理培训',
  //   meta: { title: '护理培训', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '护理培训列表',
  //       component: () => import('@/views/nursing_training/list'),
  //       meta: { title: '护理培训列表', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/data_statistics',
  //   component: Layout,
  //   redirect: '/data_statistics/list',
  //   name: '数据统计',
  //   meta: { title: '数据统计', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '数据统计列表',
  //       component: () => import('@/views/data_statistics/list'),
  //       meta: { title: '数据统计列表', icon: 'table' }
  //     }
  //   ]
  // },

  // // {
  // //   path: 'external-link',
  // //   component: Layout,
  // //   children: [
  // //     {
  // //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  // //       meta: { title: '外链接', icon: 'link' }
  // //     }
  // //   ]
  // // },

  // // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
