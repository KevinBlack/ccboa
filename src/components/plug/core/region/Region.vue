<template>
    <span> 
        <template v-for="(column, index) in tempColumns" >
            <fd-contains v-if="isWhich('column', column)" :key="index" :columns='column' @event="event" :data="data">
                <fd-region :columns='clearContainType(column)' :data="data" @event="throwEvent"/>
            </fd-contains>
            <fd-elements v-else-if="isWhich('object', column)" @event="event" :key="index" :item="column"/> 
        </template>
    </span>
</template>
<script>
import base from '../../mixins/base.js'; 
import FdElements from '../../elements/Elements';
import FdContains from '../../containers/Contains'
import util from '../../utils/util.js';
import external from '../../config/external.js' 
import store from '../store'

export default {
    name: 'FdRegion',
    props: {
        columns: {
            required: true,
            type: Array
        },
        data: {
            type: Object, 
            default: () => {
                return {}
            }
        }
    }, 
    components: { 
        FdElements,
        FdContains
    },
    mixins: [base], 
    watch: {
        data: {
            handler(nd, od) { 
                if (od) { 
                    if (this.forceUpdates.length) {
                        this.forceUpdates.forEach(forceUpdate => {
                            forceUpdate()
                        })
                    }
                    var columns = this.clone(this.columns)
                    this.tempColumns = this.resetColumns(columns, nd)
                }
            },
            deep: true
        },
        columns: {
            handler(nd, od) { 
                this.columns = this.tempColumns = this.resetColumns(nd, this.data)
            }
        }
    },
    computed: {
        store: _ => store
    },
    data() {
        return {
            tempColumns: [],
            forceUpdates: []
        }
    },
    methods: {
        isWhich(columnOrObj, column) {
            if (columnOrObj === 'object') {
                return this.isPlainObject(column) 
                    && this.load(column)
                    && this.Authorized(column) 
            } else if (columnOrObj === 'column') { 
                let _t = this.isColumn(column) && this.Authorized(column) 

                if (column.length && util.isContains(column[column.length - 1])) { 
                    if (this.isPlainObject(column[column.length - 1].$loadRelation)) { 
                        return _t && this.load(column[column.length - 1].$loadRelation)
                    } else {
                        return _t && this.load(column[column.length - 1])
                    }
                } 
                return _t && column.length
            }
        },
        isPlainObject(column) {
            return util.isPlainObject(column)
        },
        isColumn(column) {
            return Array.isArray(column)
        },
        load(column) { 
            column.$load = true
            if (column.load !== void 0 && typeof column.load === 'function') {
                column.$load = column.load({value: column.value, data: this.data, column: column, store: this.store})
            } else if (column.load !== void 0) {
                column.$load = column.load
            }
            return column.$load
        }, 
        Authorized(column) {
            return  external.Authorized({column: column})
        },
        clone(columns) {
            return columns
        },
        setColumn(column, data) {
            if (column.value === void 0) 
                this.$set(column, 'value', (data[column.prop] === void 0 || data[column.prop] === null) ? column.value : data[column.prop])
            else
                column.value = (data[column.prop] === void 0 || data[column.prop] === null) ? column.value : data[column.prop]
            if (column.type == 'render' && column.forceUpdate === true) {
                column.forceUpdate = (forceUpdate) => {
                    this.forceUpdates[this.forceUpdates.length] = forceUpdate
                } 
            }
            column.$data = data
        },
        resetColumns(columns = [], data = {}) {
            this.forceUpdates = []
            for (let i = 0; i < columns.length; i ++) {  
                if (Array.isArray(columns[i])) {
                    this.resetColumns(columns[i], data)
                } else { 
                    this.setColumn(columns[i], data) 
                }
            } 
            return columns
        },
        event(params) { 
            if (params && params.type == 'change' && params.prop) {
                this.data[params.prop] = params.value 
            }
            this.$emit('event', {...params, row: util.clone(this.data)})
        },
        clearContainType(columns) {
            let column = columns[columns.length - 1]
            let type = (column.type || '').split('-')[0]
            // *******************************??????write here???*************************************** //
            const names = ['row', 'col', 'formitem', 'badge']
            if (names.includes(type))
                return columns.slice(0, columns.length - 1)
            else return columns
        },
        throwEvent(params) {
            this.$emit('event', params)
        }
    }, 
    created() {
        this.tempColumns = this.resetColumns(this.clone(this.columns) , this.data)
        this.defalutStyles = external.defaultStyles
    }
}
</script> 
