export default {
    name: 'FdDiv',
    props: {
        row: Boolean,
        col: Boolean,
        flex: Number | String
    },
    render(createElement) {   
        let style = {
            flex: this.flex
        } 
        if (this.row) {
            style = {
                display: '-webkit-flex',
                display: 'flex',
                flexDirection: 'row'
            }
        } else if (this.col) {
            style = {
                display: '-webkit-flex',
                display: 'flex',
                flexDirection: 'column' 
            }
        } 
        return createElement('div', {style: style}, this.$slots.default);
    } 
}  