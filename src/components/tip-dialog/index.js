import TipDialog from './TipDialog'

const TipDialogGlobal = {
  install: function(Vue) {
    Vue.component('TipDialog', TipDialog)
  }
}

export default TipDialogGlobal
