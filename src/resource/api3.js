export default {
  treeTest: [
    {
      'menuId': 2,
      'name': '菜单权限管理',
      'path': '/menu',
      'parentId': 1,
      'position': 0,
      'status': 1,
      'createTime': '2019-07-29T10:07:26.000+0000',
      'systemMenu': 0,
      'menuCode': '/menu',
      'component': 'Layout',
      'dataQuery': 1,
      'dataAdd': 1,
      'dataUpdate': 1,
      'dataDelete': 1,
      'dataAudit': 1,
      'dataExtra1': null,
      'dataExtra2': null,
      'dataExtra3': null,
      'dataExtra4': null,
      'dataExtra5': null,
      'dataExtra6': null,
      'redirect': '/menu/menu_mng',
      'hidden': false,
      'meta': {
        'title': '菜单权限管理',
        'icon': 'example'
      },
      'children': [
        {
          'menuId': 3,
          'name': '菜单管理',
          'path': 'menu_mng',
          'parentId': 2,
          'position': 1,
          'status': 1,
          'createTime': '2019-07-29T10:13:13.000+0000',
          'systemMenu': 0,
          'menuCode': 'menu_mng',
          'component': 'system/menu_mng',
          'dataQuery': 1,
          'dataAdd': 1,
          'dataUpdate': 1,
          'dataDelete': 1,
          'dataAudit': 1,
          'dataExtra1': null,
          'dataExtra2': null,
          'dataExtra3': null,
          'dataExtra4': null,
          'dataExtra5': null,
          'dataExtra6': null,
          'redirect': null,
          'hidden': false,
          'meta': {
            'title': '菜单管理',
            'icon': 'table'
          },
          'children': [],
          'roleStr': '11111'
        }
      ],
      'roleStr': '11111'
    },
    {
      'menuId': 10,
      'name': '账号管理',
      'path': '/account',
      'parentId': 1,
      'position': 0,
      'status': 1,
      'createTime': '2019-07-29T10:22:10.000+0000',
      'systemMenu': 0,
      'menuCode': '/account',
      'component': 'Layout',
      'dataQuery': 1,
      'dataAdd': 1,
      'dataUpdate': 1,
      'dataDelete': 1,
      'dataAudit': 1,
      'dataExtra1': null,
      'dataExtra2': null,
      'dataExtra3': null,
      'dataExtra4': null,
      'dataExtra5': null,
      'dataExtra6': null,
      'redirect': '/account/staff_mng',
      'hidden': false,
      'meta': {
        'title': '账号管理',
        'icon': 'example'
      },
      'children': [
        {
          'menuId': 11,
          'name': '员工管理',
          'path': 'staff_mng',
          'parentId': 10,
          'position': 1,
          'status': 1,
          'createTime': '2019-07-29T10:22:06.000+0000',
          'systemMenu': 0,
          'menuCode': 'staff_mng',
          'component': 'account/staff_mng',
          'dataQuery': 1,
          'dataAdd': 1,
          'dataUpdate': 1,
          'dataDelete': 1,
          'dataAudit': 1,
          'dataExtra1': null,
          'dataExtra2': null,
          'dataExtra3': null,
          'dataExtra4': null,
          'dataExtra5': null,
          'dataExtra6': null,
          'redirect': null,
          'hidden': false,
          'meta': {
            'title': '员工管理',
            'icon': 'table'
          },
          'children': [
            {
              'menuId': 12,
              'name': '新增账号',
              'path': 'add',
              'parentId': 11,
              'position': 1,
              'status': 1,
              'createTime': '2019-07-29T10:22:02.000+0000',
              'systemMenu': 0,
              'menuCode': 'add',
              'component': 'account/employee_add',
              'dataQuery': 1,
              'dataAdd': 1,
              'dataUpdate': 1,
              'dataDelete': 1,
              'dataAudit': 1,
              'dataExtra1': null,
              'dataExtra2': null,
              'dataExtra3': null,
              'dataExtra4': null,
              'dataExtra5': null,
              'dataExtra6': null,
              'redirect': null,
              'hidden': true,
              'meta': {
                'title': '新增账号',
                'icon': 'table'
              },
              'children': [],
              'roleStr': '11111'
            }
          ],
          'roleStr': '11111'
        }
      ],
      'roleStr': '11111'
    }
  ],
  treelist: [
    // {
    //   path: '/menu',
    //   component: 'Layout',
    //   redirect: '/menu/menu_mng',
    //   name: '菜单权限管理',
    //   meta: { title: '菜单权限管理', icon: 'example' },
    //   children: [
    //     {
    //       path: 'menu_mng',
    //       name: '菜单管理',
    //       component: 'system/menu_mng',
    //       meta: { title: '菜单管理', icon: 'table' },
    //       children: []
    //     },
    //     {
    //       path: 'corp_mng',
    //       name: '公司管理',
    //       component: 'system/corp_mng',
    //       meta: { title: '公司管理', icon: 'table' },
    //       children: []
    //     },
    //     {
    //       path: 'role_mng',
    //       name: '角色管理',
    //       component: 'system/role_mng',
    //       meta: { title: '角色管理', icon: 'table' },
    //       children: []
    //     }, {
    //       path: 'roledis_mng',
    //       name: '用户管理角色分配',
    //       component: 'system/roledis_mng',
    //       meta: { title: '用户管理角色分配', icon: 'table' },
    //       children: []
    //     }
    //   ]
    // },
    {
      path: '/account',
      component: 'Layout',
      redirect: '/account/staff_mng',
      name: '账号管理',
      meta: { title: '账号管理', icon: 'example' },
      children: [
        {
          path: 'staff_mng',
          name: '员工管理',
          component: 'account/staff_mng',
          meta: { title: '员工管理', icon: 'table' },
          children: [
            {
              path: 'add',
              name: '新增账号',
              component: 'account/employee_add',
              meta: { title: '新增账号', icon: 'table' },
              hidden: true
            },
            {
              path: 'update',
              name: '修改账号',
              component: 'account/employee_update',
              meta: { title: '修改账号', icon: 'table' },
              hidden: true
            },
            {
              path: 'detail',
              name: '账号详情',
              component: 'account/employee_detail',
              meta: { title: '账号详情', icon: 'table' },
              hidden: true
            },
            {
              path: 'role_permission',
              name: '角色权限设置',
              component: 'account/role_permission_add',
              meta: { title: '角色权限设置', icon: 'table' },
              hidden: true
            },
            {
              path: 'role_permission_update',
              name: '角色权限修改',
              component: 'account/role_permission_update',
              meta: { title: '角色权限修改', icon: 'table' },
              hidden: true
            }
          ]
        },
        {
          path: 'user_mng',
          name: '用户管理',
          component: 'account/user_mng',
          meta: { title: '用户管理', icon: 'tree' },
          children: [
            {
              path: 'create',
              name: '用户注册',
              component: 'account/user_create',
              meta: { title: '用户注册', icon: 'table' },
              hidden: true
            },
            {
              path: 'update',
              name: '用户修改',
              component: 'account/user_update',
              meta: { title: '用户修改', icon: 'table' },
              hidden: true
            },
            {
              path: 'detail',
              name: '用户详情',
              component: 'account/user_detail',
              meta: { title: '用户详情', icon: 'table' },
              hidden: true
            }
          ]
        }
      ]
    },

    {
      path: '/user',
      component: 'Layout',
      redirect: '/user/user_info',
      name: '账号信息',
      meta: { title: '账号信息', icon: 'example' },
      hidden: true,
      children: [
        {
          path: 'user_info',
          name: '账号信息',
          component: 'user/user_info',
          meta: { title: '账号信息', icon: 'table' }
        },
        {
          path: 'update',
          name: '修改密码',
          component: 'user/update',
          meta: { title: '修改密码', icon: 'tree' }
        }
      ]
    },

    {
      path: '/operation_mng',
      component: 'Layout',
      redirect: '/operation_mng/list',
      name: '运营管理',
      meta: { title: '运营管理', icon: 'example' },
      children: [
        {
          path: 'goods_info',
          name: '商品信息',
          component: 'operation_mng/goods_information',
          meta: { title: '商品信息', icon: 'table' }
        },
        {
          path: 'policy_subsidies',
          name: '政策补贴',
          component: 'operation_mng/policy_subsidies',
          meta: { title: '政策补贴', icon: 'table' },
          children: [
            {
              path: 'add',
              name: '新增',
              component: 'operation_mng/policy_add',
              meta: { title: '新增', icon: 'table' },
              hidden: true
            },
            {
              path: 'update',
              name: '修改',
              component: 'operation_mng/policy_update',
              meta: { title: '修改', icon: 'table' },
              hidden: true
            },
            {
              path: 'detail',
              name: '详情',
              component: 'operation_mng/policy_detail',
              meta: { title: '详情', icon: 'table' },
              hidden: true
            }
          ]
        },
        {
          path: 'price_mng',
          name: '价格管理',
          component: 'operation_mng/price_mng',
          meta: { title: '价格管理', icon: 'table' },
          children: [
            {
              path: 'setting_prices',
              name: '设置价格',
              component: 'operation_mng/price_mng_setting',
              meta: { title: '设置价格', icon: 'table' },
              hidden: true
            },
            {
              path: 'detail',
              name: '价格详情',
              component: 'operation_mng/price_mng_detail',
              meta: { title: '价格详情', icon: 'table' },
              hidden: true
            }
          ]
        },
        {
          path: 'advertising_mng',
          name: '广告管理',
          component: 'operation_mng/advertising_mng',
          meta: { title: '广告管理', icon: 'table' }
        },
        {
          path: 'activity_mng',
          name: '活动管理',
          component: 'operation_mng/activity_mng',
          meta: { title: '活动管理', icon: 'table' }
        }
      ]
    },

    {
      path: '/order_mng',
      component: 'Layout',
      redirect: '/order_mng/all_order',
      name: '订单管理',
      meta: { title: '订单管理', icon: 'example' },
      children: [
        // 全部订单
        {
          path: 'all_order',
          name: '全部订单',
          redirect: '/order_mng/all_order/order_list',
          component: 'order_mng/all_order/index',
          meta: { title: '全部订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '全部订单列表',
              component: 'order_mng/all_order/order_tab',
              meta: { title: '全部订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/all_order/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 生活照料订单
        {
          path: 'daily_care',
          name: '生活照料订单',
          redirect: '/order_mng/daily_care/order_list',
          component: 'order_mng/daily_care/index',
          meta: { title: '生活照料订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '生活照料订单列表',
              component: 'order_mng/daily_care/order_tab',
              meta: { title: '生活照料订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/daily_care/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 医疗护理订单
        {
          path: 'medical_care',
          name: '医疗护理订单',
          redirect: '/order_mng/medical_care/order_list',
          component: 'order_mng/medical_care/index',
          meta: { title: '医疗护理订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '医疗护理订单列表',
              component: 'order_mng/medical_care/order_tab',
              meta: { title: '医疗护理订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/medical_care/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 机构护理订单
        {
          path: 'organization_care',
          name: '机构护理订单',
          redirect: '/order_mng/organization_care/order_list',
          component: 'order_mng/organization_care/index',
          meta: { title: '机构护理订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '机构护理订单列表',
              component: 'order_mng/organization_care/order_tab',
              meta: { title: '机构护理订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/organization_care/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 护理器材订单
        {
          path: 'care_equipment',
          name: '护理器材订单',
          redirect: '/order_mng/care_equipment/order_list',
          component: 'order_mng/care_equipment/index',
          meta: { title: '护理器材订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '护理器材订单列表',
              component: 'order_mng/care_equipment/order_tab',
              meta: { title: '护理器材订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/care_equipment/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 社区订单
        {
          path: 'community_order',
          name: '社区订单',
          redirect: '/order_mng/community_order/order_list',
          component: 'order_mng/community_order/index',
          meta: { title: '社区订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '社区订单列表',
              component: 'order_mng/community_order/order_tab',
              meta: { title: '社区订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '订单详情',
              component: 'order_mng/community_order/order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            },
            {
              path: 'custom_order_detail',
              name: '社区订制化订单详情',
              component: 'order_mng/community_order/custom_order_detail',
              meta: { title: '订单详情', icon: 'example' },
              hidden: true
            }
          ]
        },
        // 长护险订单
        {
          path: 'long_care',
          name: '长护险订单',
          redirect: '/order_mng/long_care/order_list',
          component: 'order_mng/long_care/index',
          meta: { title: '长护险订单', icon: 'table' },
          children: [
            {
              path: 'order_list',
              name: '长护险列表',
              component: 'order_mng/long_care/order_tab',
              meta: { title: '长护险订单列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'order_detail',
              name: '长护险订单详情',
              component: 'order_mng/long_care/order_detail',
              meta: { title: '长护险订单详情', icon: 'example' },
              hidden: true
            }
          ]
        }
      ]
    },
    {
      path: '/comment',
      component: 'Layout',
      redirect: '/comment/com_count',
      name: '评价管理',
      meta: { title: '评价管理', icon: 'example' },
      children: [
        {
          path: 'com_count',
          name: '评价统计',
          component: 'comment/com_count',
          meta: { title: '评价统计', icon: 'table' }
        },
        {
          path: 'com_list',
          name: '评价列表',
          component: 'comment/com_list',
          meta: { title: '评价列表', icon: 'table' }
        }
      ]
    },

    // 商品服务管理
    {
      path: '/goods_service',
      component: 'Layout',
      redirect: '/goods_service/goods_mng',
      name: '服务商品管理',
      meta: { title: '服务商品管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'goods_mng',
          name: '商品管理',
          redirect: '/goods_service/goods_mng/goods_list',
          component: 'goods_service/goods_mng/index',
          meta: { title: '商品管理', icon: 'table' },
          children: [
            {
              path: 'goods_list',
              name: '商品列表',
              component: 'goods_service/goods_mng/goods_list',
              meta: { title: '商品列表', icon: 'example' },
              hidden: true
            },
            {
              path: 'create_goods',
              name: '新增商品',
              component: 'goods_service/goods_mng/create_goods',
              meta: { title: '新增商品', icon: 'example' },
              hidden: true
            },
            {
              path: 'update_goods',
              name: '修改商品',
              component: 'goods_service/goods_mng/create_goods',
              meta: { title: '修改商品', icon: 'example' },
              hidden: true
            },
            {
              path: 'detail_goods',
              name: '商品详情',
              component: 'goods_service/goods_mng/create_goods',
              meta: { title: '商品详情', icon: 'example' },
              hidden: true
            }
          ]
        }
      ]
    },

    {
      path: '/org_mng',
      component: 'Layout',
      redirect: '/org_mng/care_org',
      name: '机构管理',
      meta: { title: '机构管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'care_org',
          redirect: '/org_mng/care_org/care_org_list',
          name: '护理机构',
          component: 'org_mng/org_file/index',
          meta: { title: '护理机构', icon: 'table' },
          children: [
            {
              path: 'care_org_list',
              name: 'care_org_list',
              component: 'org_mng/org_file/care_org',
              meta: { title: '机构列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_org',
              name: 'add_org',
              component: 'org_mng/org_file/add_org',
              meta: { title: '新增机构', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_org',
              name: 'look_org',
              component: 'org_mng/org_file/look_org',
              meta: { title: '机构详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'write_org',
              name: 'write_org',
              component: 'org_mng/org_file/write_org',
              meta: { title: '修改机构', icon: 'el-icon-document-add' },
              hidden: true
            }
          ]
        }
      ]
    },
    {
      path: '/employee_mng',
      component: 'Layout',
      redirect: '/employee_mng/care_employee',
      name: '人员管理',
      meta: { title: '人员管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'care_employee',
          redirect: '/employee_mng/care_employee/all_employee',
          name: '护理人员',
          component: 'employee_mng/employee_list/index',
          meta: { title: '护理人员', icon: 'table' },
          children: [
            {
              path: 'all_employee',
              name: 'all_employee',
              component: 'employee_mng/employee_list/care_employee',
              meta: { title: '全部', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_employee',
              name: 'add_employee',
              component: 'employee_mng/add_employee',
              meta: { title: '新增人员', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_employee',
              name: 'look_employee',
              component: 'employee_mng/look_employee',
              meta: { title: '人员详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'write_employee',
              name: 'write_employee',
              component: 'employee_mng/write_employee',
              meta: { title: '修改详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'out_employee',
              name: 'out_employee',
              component: 'employee_mng/out_employee',
              meta: { title: '未通过详情', icon: 'el-icon-document-add' },
              hidden: true
            }
          ]
        }
      ]
    },
    {
      path: '/community',
      component: 'Layout',
      redirect: '/community/community_list',
      name: '社区管理',
      meta: { title: '社区管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'community_list',
          redirect: '/community/community_list/list',
          name: '社区',
          component: 'community/index',
          meta: { title: '社区', icon: 'table' },
          children: [
            {
              path: 'list',
              name: '群社区列表',
              component: 'community/list',
              meta: { title: '社区', icon: 'table' },
              hidden: true
            },
            {
              path: 'add_community',
              name: 'add_community',
              component: 'community/add_community',
              meta: { title: '新增社区', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_community',
              name: 'look_community',
              component: 'community/look_community',
              meta: { title: '社区详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'write_community',
              name: 'write_community',
              component: 'community/write_community',
              meta: { title: '修改社区', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_housing',
              name: 'add_housing',
              component: 'community/pages/add_housing',
              meta: { title: '新增小区', icon: 'el-icon-document-add' },
              hidden: true
            }
          ]
        },
        {
          path: 'black_list',
          name: '社区黑名单',
          component: 'community/black_list',
          meta: { title: '社区黑名单', icon: 'table' }
        }
      ]
    },

    {
      path: '/account_mng',
      component: 'Layout',
      redirect: '/account_mng/user_account',
      name: '账单管理',
      meta: { title: '账单管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'user_account',
          name: '用户账单',
          component: 'account_mng/user_account',
          meta: { title: '用户账单', icon: 'table' },
          children: [
            {
              path: 'detail',
              name: '账单详情',
              component: 'account_mng/user_account_detail',
              meta: { title: '账单详情', icon: 'table' },
              hidden: true
            }
          ]
        },
        {
          path: 'org_account',
          name: '商户/机构账单',
          component: 'account_mng/org_account',
          meta: { title: '商户/机构账单', icon: 'table' }
        }
      ]
    },

    {
      path: '/application_mng',
      component: 'Layout',
      redirect: '/application_mng/list',
      name: '申请管理',
      meta: { title: '申请管理', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'list',
          name: '申请管理列表',
          component: 'application_mng/list',
          meta: { title: '申请管理列表', icon: 'table' }
        }
      ]
    },
    // 护理培训
    {
      path: '/nursing_training',
      component: 'Layout',
      redirect: '/nursing_training/training_org',
      name: '护理培训',
      meta: { title: '护理培训', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'training_org',
          name: '培训机构',
          redirect: '/nursing_training/training_org/org_list',
          component: 'nursing_training/training_org/index',
          meta: { title: '培训机构', icon: 'table' },
          children: [
            {
              path: 'org_list',
              name: '机构列表',
              component: 'nursing_training/training_org/org_list',
              meta: { title: '机构列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_org',
              name: 'add_org',
              component: 'nursing_training/training_org/add_org',
              meta: { title: '新增机构', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_org',
              name: 'look_org',
              component: 'nursing_training/training_org/look_org',
              meta: { title: '机构详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'write_org',
              name: 'write_org',
              component: 'nursing_training/training_org/write_org',
              meta: { title: '修改机构', icon: 'el-icon-document-add' },
              hidden: true
            }
          ]
        },
        {
          path: 'training_video',
          name: '培训视频',
          redirect: '/nursing_training/training_video/video_list',
          component: 'nursing_training/training_video/index',
          meta: { title: '培训视频', icon: 'table' },
          children: [
            {
              path: 'video_list',
              name: '视频列表',
              component: 'nursing_training/training_video/video_list',
              meta: { title: '视频列表', icon: 'table' },
              hidden: true
            },
            {
              path: 'add_video',
              name: '上传视频',
              component: 'nursing_training/training_video/add_video',
              meta: { title: '上传视频', icon: 'table' },
              hidden: true
            },
            {
              path: 'setting_video',
              name: '视频设置',
              component: 'nursing_training/training_video/setting',
              meta: { title: '设置', icon: 'table' },
              hidden: true
            }
          ]
        },
        {
          path: 'student_info',
          name: '学员信息',
          redirect: '/nursing_training/student_info/student_list',
          component: 'nursing_training/student_info/index',
          meta: { title: '学员信息', icon: 'table' },
          children: [
            {
              path: 'student_list',
              name: '学员列表',
              component: 'nursing_training/student_info/student_list',
              meta: { title: '学员列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'student_detail',
              name: '信息详情',
              component: 'nursing_training/student_info/student_detail',
              meta: { title: '信息详情', icon: 'el-icon-document-add' },
              hidden: true
            }
          ]
        },
        {
          path: 'course_mng',
          name: '课程管理',
          redirect: '/nursing_training/course_mng/course_list',
          component: 'nursing_training/course_mng/index',
          meta: { title: '课程管理', icon: 'table' },
          children: [
            {
              path: 'course_list',
              name: '课程列表',
              component: 'nursing_training/course_mng/course_list',
              meta: { title: '课程列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_course',
              name: '课程新增',
              component: 'nursing_training/course_mng/add_course',
              meta: { title: '课程新增', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_course',
              name: '课程详情',
              component: 'nursing_training/course_mng/look_course',
              meta: { title: '课程详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'update_course',
              name: '课程修改',
              component: 'nursing_training/course_mng/update_course',
              meta: { title: '课程修改', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'schedule_setting',
              name: '排期设置',
              component: 'nursing_training/course_mng/schedule_setting',
              meta: { title: '排期设置', icon: 'el-icon-document-add' },
              hidden: true,
              children: [
                {
                  path: 'schedule_detail',
                  name: '学期详情',
                  component: 'nursing_training/course_mng/schedule_detail',
                  meta: { title: '学期详情', icon: 'el-icon-document-add' },
                  hidden: true
                }
              ]
            }
          ]
        },
        {
          path: 'theory_course_mng',
          name: '理论课程管理',
          redirect: '/nursing_training/theory_course_mng/theory_course_list',
          component: 'nursing_training/theory_course_mng/index',
          meta: { title: '理论课程管理', icon: 'table' },
          children: [
            {
              path: 'theory_course_list',
              name: '理论课程列表',
              component: 'nursing_training/theory_course_mng/course_list',
              meta: { title: '理论课程列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_theory_course',
              name: '理论课程新增',
              component: 'nursing_training/theory_course_mng/add_course',
              meta: { title: '理论课程新增', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_theory_course',
              name: '理论课程详情',
              component: 'nursing_training/theory_course_mng/look_course',
              meta: { title: '理论课程详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'update_theory_course',
              name: '理论课程修改',
              component: 'nursing_training/theory_course_mng/update_course',
              meta: { title: '理论课程修改', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'schedule_setting',
              name: '排期设置',
              component: 'nursing_training/theory_course_mng/schedule_setting',
              meta: { title: '排期设置', icon: 'el-icon-document-add' },
              hidden: true,
              children: [
                {
                  path: 'schedule_detail',
                  name: '学期详情',
                  component: 'nursing_training/theory_course_mng/schedule_detail',
                  meta: { title: '学期详情', icon: 'el-icon-document-add' },
                  hidden: true
                }
              ]
            }
          ]
        },
        {
          path: 'practical_course_mng',
          name: '实践课程管理',
          redirect: '/nursing_training/practical_course_mng/practical_course_list',
          component: 'nursing_training/practical_course_mng/index',
          meta: { title: '实践课程管理', icon: 'table' },
          children: [
            {
              path: 'practical_course_list',
              name: '实践课程列表',
              component: 'nursing_training/practical_course_mng/course_list',
              meta: { title: '实践课程列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_practical_course',
              name: '实践课程新增',
              component: 'nursing_training/practical_course_mng/add_course',
              meta: { title: '实践课程新增', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_practical_course',
              name: '实践课程详情',
              component: 'nursing_training/practical_course_mng/look_course',
              meta: { title: '实践课程详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'update_practical_course',
              name: '实践课程修改',
              component: 'nursing_training/practical_course_mng/update_course',
              meta: { title: '实践课程修改', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'schedule_setting',
              name: '批次管理',
              component: 'nursing_training/practical_course_mng/schedule_setting',
              meta: { title: '批次管理', icon: 'el-icon-document-add' },
              hidden: true,
              children: [
                {
                  path: 'schedule_add',
                  name: '批次新增',
                  component: 'nursing_training/practical_course_mng/schedule_add',
                  meta: { title: '批次新增', icon: 'el-icon-document-add' },
                  hidden: true
                },
                {
                  path: 'schedule_detail',
                  name: '批次详情',
                  component: 'nursing_training/practical_course_mng/schedule_detail',
                  meta: { title: '批次详情', icon: 'el-icon-document-add' },
                  hidden: true
                }
              ]
            }
          ]
        },
        {
          path: 'assessment_mng',
          name: '考核管理',
          redirect: '/nursing_training/assessment_mng/assessment_list',
          component: 'nursing_training/assessment_mng/index',
          meta: { title: '考核管理', icon: 'table' },
          children: [
            {
              path: 'assessment_list',
              name: '考核列表',
              component: 'nursing_training/assessment_mng/assessment_list',
              meta: { title: '考核列表', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'add_assessment',
              name: '考核新增',
              component: 'nursing_training/assessment_mng/add_assessment',
              meta: { title: '考核新增', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'look_assessment',
              name: '考核详情',
              component: 'nursing_training/assessment_mng/look_assessment',
              meta: { title: '考核详情', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'update_assessment',
              name: '考核修改',
              component: 'nursing_training/assessment_mng/update_assessment',
              meta: { title: '考核修改', icon: 'el-icon-document-add' },
              hidden: true
            },
            {
              path: 'schedule_setting',
              name: '批次管理',
              component: 'nursing_training/assessment_mng/schedule_setting',
              meta: { title: '批次管理', icon: 'el-icon-document-add' },
              hidden: true,
              children: [
                {
                  path: 'schedule_add',
                  name: '批次新增',
                  component: 'nursing_training/assessment_mng/schedule_add',
                  meta: { title: '批次新增', icon: 'el-icon-document-add' },
                  hidden: true
                },
                {
                  path: 'schedule_detail',
                  name: '批次详情',
                  component: 'nursing_training/assessment_mng/schedule_detail',
                  meta: { title: '批次详情', icon: 'el-icon-document-add' },
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/data_statistics',
      component: 'Layout',
      redirect: '/data_statistics/list',
      name: '数据统计',
      meta: { title: '数据统计', icon: 'example' },
      alwaysShow: true,
      children: [
        {
          path: 'list',
          name: '数据统计列表',
          component: 'data_statistics/list',
          meta: { title: '数据统计列表', icon: 'table' }
        }
      ]
    }
  ]
}
