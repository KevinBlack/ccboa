export default {
    // 现在所处流程的信息
    nowProcessInfo: {
        line: 'innerProcess',   // 当前所处的流程线。'innerProcess':行内流程， 'outerProcess':跨行流程 '':流程还未确定
        step: 2,                // 当前所在的阶段
    },
    // 行内印章刻制流程
    innerProcess: [
            {'step': 1,  'title': '起草', 'desc': '' },
            {'step': 2,  'title': '申请单位主要负责人审批', 'desc': ''},
            {'step': 3,  'title': '申请单位综合处理', 'desc': ''},
            {'step': 4,  'title': '归口管理部门综合处理', 'desc': ''},
            {'step': 5,  'title': '归口管理部门领导审批', 'desc': ''},
            {'step': 6,  'title': '办公室综合处理', 'desc': ''},
            {'step': 7,  'title': '办公室经办人审核', 'desc': ''},
            {'step': 8,  'title': '办公室领导审批', 'desc': ''},
            {'step': 9,  'title': '印章保管人处理', 'desc': ''},
            {'step': 10, 'title': '取印人确认', 'desc': ''},
            {'step': 11, 'title': '交印人处理', 'desc': ''},
        ],
    // 跨行印章刻制流程.注意有两个申请单位综合处理
    outerProcess: [
            {'step': 1,  'title': '起草', 'desc': '' },
            {'step': 2,  'title': '申请单位主要负责人审批', 'desc': ''},
            {'step': 3,  'title': '申请单位综合处理', 'desc': ''},
            {'step': 4,  'title': '上级行办公室综合处理', 'desc': ''},
            {'step': 5,  'title': '上级行办公室经办人审核', 'desc': ''},
            {'step': 6,  'title': '上级行办公室领导审批', 'desc': ''},
            {'step': 7,  'title': '上级行印章保管人处理', 'desc': ''},
            {'step': 8,  'title': '申请单位综合处理', 'desc': ''},
            {'step': 9,  'title': '取印人确认', 'desc': ''},
            {'step': 10, 'title': '上级行交印人处理', 'desc': ''},
        ],
}