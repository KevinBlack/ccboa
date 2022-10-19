/** @description: 公共分页逻辑 混入 */
export default {
    name: 'commonPaginationMixin',
    data() {            
       return {           
       }
    },
    computed: {
    },
    methods: {
        /** @description: 获取表格数据请求参数 */
        getDataTableReqParams(tableVm, pagination, bizParams, custPaginationParams) {
            const oldPagination = tableVm && tableVm.pagination || {}
            console.log('oldPagination', oldPagination)
            const innerPagination = pagination || {
                pageSize: 20,
                ...oldPagination,
                pageNum: 1
            }
            console.log('innerPagination', innerPagination)
            const paginationParams = {
              ...innerPagination,
              PAGE_JUMP: innerPagination.pageNum,
              REC_IN_PAGE: innerPagination.pageSize,
            }
            return [bizParams || {}, custPaginationParams || paginationParams]
        },
        /** @description: 公共加载后端列表数据方法 */
        async commonLoadListData(tableVm,  pagination, bizParams, custPaginationParams, promiseFn, bizCallbackFn) {
            const paramsList = this.getDataTableReqParams(tableVm, pagination, bizParams, custPaginationParams)
            if(promiseFn) {
                await promiseFn(...paramsList).then(res => {
                    this.commonUpdateTableTotal(tableVm, res.total, paramsList[1])
                    bizCallbackFn && bizCallbackFn(res)                        
                    this.$nextTick(() => {
                        tableVm && tableVm.$forceUpdate()
                    })
                })
            }
        },
        /** @description: 公共更新表格数据 总数量 */
        commonUpdateTableTotal(tableVm, total, pagination) {
            console.log('commonUpdateTableTotal>pagination',total, pagination)
            tableVm && tableVm.updatePagination && tableVm.updatePagination(tableVm, total, pagination)
        }
    }
}