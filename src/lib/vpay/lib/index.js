import vpay from './pay'

const myPlugin = {
    install (Vue, options) {
        Vue.component('vpay',vpay);
    }
}

export default myPlugin