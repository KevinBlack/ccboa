
/** @description: 支持标签页识别的公共混入 */
export default {
    name: "publishedMixin",
    data() {
      return {
      }
    },
    computed: {
      /** @description: 来自query的Data */
      dataFromQuery(){
        return (key, expectType = 'object') => {
          const queryData= this.$route.query || {}
          const value = queryData[key || 'queryData']
          try {            
            let defaultValue = {}
            switch (expectType) {
              case 'string':
                defaultValue = ''            
              default:
                defaultValue = {}
            }
            return typeof value === 'string' ? value && JSON.parse(value) || defaultValue : value || defaultValue
          } catch (error) {
            return value
          }
        }
      },
      /** @description: 来自params的Data */
      dataFromParams(){
        return (key, expectType = 'object') => {
          const paramsData= this.$route.params || {}
          const value = paramsData[key || 'paramsData']
          try {            
            let defaultValue = {}
            switch (expectType) {
              case 'string':
                defaultValue = ''            
              default:
                defaultValue = {}
            }
            return typeof value === 'string' ? value && JSON.parse(value) || defaultValue : value || defaultValue
          } catch (error) {
            return value
          }
        }
      },
      /** @description: 来自query的来源路由名 */
      sourceRouteNameFromParams() {
        const { sourceRouteName } = this.$route.params || {}
        return sourceRouteName
      },
      /** @description: 来自params的来源路由名 */
      sourceRouteNameFromQuery() {
        return this.dataFromQuery('sourceRouteName')
      },
      /** @description: 来自哪个标签页 */
      whichActiveNameFromChengKan() {
        const {activeName: whichActiveNameFromChengKan} = this.$route.query || {}
        return whichActiveNameFromChengKan
      },      
      /** @description: 获取源路由名除外的queryData */
      queryDataExcludeSourceRouteName() {
        const queryData = this.deepCopy(this.$route.query)
        queryData.sourceRouteName && delete queryData.sourceRouteName
        return queryData
      },
      /** @description: 获取指定属性除外的queryData */
      queryDataExcludeSpecifiedAttributes() {
        return attrs => {
          const queryData = this.deepCopy(this.$route.query)
          attrs && attrs.forEach(attr => {
            queryData[attr] && delete queryData[attr]
          })
          return queryData
        }
      },
      /** @description: 获取指定属性除外的paramsData */
      paramsDataExcludeSpecifiedAttributes() {
        return attrs => {
          const paramsData = this.deepCopy(this.$route.params)
          attrs && attrs.forEach(attr => {
            paramsData[attr] && delete paramsData[attr]
          })
          return paramsData
        }
      },
      /** @description: 前一个路由 */
      previousRouteName() {
        return this.dataFromParams('previousRouteName')
      },
      /** @description: 组装本路由数据包括 包括query 和 params */
      dataToInherit() {
        return {
          sourceRouteName: this.sourceRouteNameFromQuery || this.previousRouteName,
          query: this.queryDataExcludeSpecifiedAttributes(),
          params: this.paramsDataExcludeSpecifiedAttributes(['dataToInherit'])
        }
      }
    },
    beforeRouteLeave(to, from, next){
      to.params && this.$set(to.params, 'dataToInherit', this.dataToInherit)
      const previousRouteName = from && from.name
      to.params && this.$set(to.params, 'previousRouteName', previousRouteName)
      next()
    },
    methods: {        
        /** @description: 根据列表和分隔符，获取字符串 */
        getStrFromListAndSeparator(list, separator= ',') {
          return list && (Object.keys(list).length === 0 ? '' : list.join(separator)) || ''
        },
        /** @description: 转换为list或对象 */
        convertToListOrObj(value, isNeedList = true) {
          return value ? (typeof value === 'string' ? JSON.parse(value) : value) : (isNeedList ? [] : {})
        },
        /** @description: 更新查询条件信息 默认查询条件都放在路由params参数中传递。*/
        updateQueryConditionData(queryConditionData) {
          return Object.assign(queryConditionData || {}, this.dataFromParams())
        },
         /** @description: 深度复制对象 */
        deepCopy(obj) {
          return JSON.parse(JSON.stringify(obj || {})) 
        },
        /** @description: 去到上一个路由页面 */
        gotoSourceRoutePage(externalQuery, externalParams, isNeedSelfQuery = true, isNeedSelfParams = true) {   
          let { query, params } = this.dataFromParams('dataToInherit') || {}
          console.log('gotoSourceRoutePage> query, params',  query, params)
          params = isNeedSelfParams? params : {}
          query = isNeedSelfQuery ? query : {}
          this.$router.push({
            name: this.sourceRouteNameFromQuery || this.previousRouteName,
            query: {
              ...(query || {}),
              ...(externalQuery || {})
            },
            params: {
              ...(params || {}),
              ...(externalParams || {})
            }
          })
        },
        /** @description: 还原参数回到源路由 */
        gotoSourceRoutePageEnhanced() {
          const { sourceRouteName, query, params } = this.dataFromParams
          this.gotoPublishedPage(sourceRouteName, query, params, false, false)
        },
        /** @description: 去指定路由名routeName的页面 */
        gotoPublishedPage(routeName, externalQuery, externalParams, isNeedSelfQuery = true, isNeedSelfParams = true) {
            const params = isNeedSelfParams? this.$route.params : {}
            const query = isNeedSelfQuery ? this.$route.query : {}
            const queryData =  {
              activeName: this.whichActiveNameFromChengKan,
              ...query,
              ...(externalQuery || {})
            }
            const paramsData = {
              ...params,
              ...(externalParams || {})
            }
            console.log('params515:', params,'queryData515', queryData, 'paramsData515', paramsData)
            this.$router.push({
                name: routeName,
                query: queryData,
                params: paramsData
            })
        }
    }
}