<template>
    <el-input-number
        v-model="item.value"
        @change="change" 
        :disabled="mixin_disabled(item.disabled, item.value, item.$data)"
        :controls-position="item.config && item.config.controlsPosition"
        :style="mixin_style(item.style, item.value, item.data)"
        :class="mixin_class(item.class, item.value, item.$data)"
        :min="min()"
        :max="max()"
        :step="step()"
    >
    </el-input-number>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdcounter',
    data() {
        return {}
    },
    methods: {
        change() {
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        min() {
            if (typeof this.item.min === 'function') {
                return this.item.min({value: this.item.value, data: this.item.$data})
            }
            return this.item.min || 0
        },
        max() {
            if (typeof this.item.max === 'function') {
                return this.item.max({value: this.item.value, data: this.item.$data})
            }
            return this.item.max 
        },
        step() {
            if (typeof this.item.step == 'function') {
                return this.item.step({value: this.item.value, data: this.item.$data})
            }
            return this.item.step || 1
        }
    },
    mounted() {
        if (this.item.value === void 0) {
            this.$set(this.item, 'value', 0)
        }
        this.item.$data[this.item.prop] = this.item.value
        this.mixin_config('counter') 
    }
}
</script>
