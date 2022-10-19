export default {
    '待办': [{
            'sqsj':    '20121010-11:45',            // 申请时间
            'sqdw':    '123456',                    // 申请单位
            'fzyzmc':  '四川成都植物园建设分行',        // 废止印章名称
            'dqhj':    '02',                        // 当前环节
            'czr':    '57862602（小红）'            //  操作人
        }],
    '已办': [{
            'sqsj':         '20121010-11:25',         // 申请时间
            'sqdw':          '123456',                 // 申请单位
            'fzyzmc':        '四川成都植物园建设分行',   // 废止印章名称
            'dqhj':           '06',                    // 当前环节
            'czr':    '57862602（小红）'                //  操作人
        }],
    'years': [
                {label: '2009年', value: '2009'}, {label: '2010年', value: '2010'}, 
                {label: '2011年', value: '2011'}, {label: '2012年', value: '2012'}
            ],
    '办结': {
        '2009': [],
        '2010': [],
        '2011': [],
        '2012': [],
    },
        
    // 现在所处流程的信息
    nowProcessInfo: {
        line: 'innerProcess',   // 当前所处的流程线。'innerProcess':行内流程， 'outerProcess':跨行流程 '':流程还未确定
        step: 2,                // 当前所在的阶段
    },
    // 行内印章废止申请流程
    innerProcess: [
            {'step': 1, 'title': '起草', 'desc': '' },
            {'step': 2, 'title': '申请单位主要负责人审批', 'desc': ''},
            {'step': 3, 'title': '申请单位综合处理', 'desc': ''},
            {'step': 4, 'title': '办公室综合处理', 'desc': ''},
            {'step': 5, 'title': '印章保管人处理', 'desc': ''},
            {'step': 6, 'title': '交印人确认', 'desc': ''},
            {'step': 7, 'title': '保管人处理', 'desc': ''},
        ],
    // 跨行印章废止申请流程
    outerProcess: [
            {'step': 1, 'title': '起草', 'desc': '' },
            {'step': 2, 'title': '申请单位主要负责人审批', 'desc': ''},
            {'step': 3, 'title': '申请单位综合处理', 'desc': ''},
            {'step': 4, 'title': '上级行办公室综合处理', 'desc': ''},
            {'step': 5, 'title': '上级行印章保管人处理', 'desc': ''},
            {'step': 6, 'title': '交印人确认', 'desc': ''},
            {'step': 7, 'title': '上级行保管人处理', 'desc': ''},
        ],
}