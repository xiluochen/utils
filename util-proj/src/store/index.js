import { createStore } from "vuex"

import Color from './modules/Color'
import Links from "./modules/Links"

export default createStore({
    modules:{
        Color,
        Links
    },
})