
const state = {
    styleMode:false,
}

const actions = {
}

const mutations = {
    CHANGEMODE(state){
        state.styleMode = !state.styleMode
    }
}

const getters = {
    outerColor: (state)=>(state.styleMode?'rgba(255,255,255,.3)':'rgba(0,0,0,.3)'),
    innerColor: (state)=>(state.styleMode?'rgba(255,255,255,.1)':'rgba(0,0,0,.1)'),
    mainColor: (state)=>(state.styleMode?'#000':'#fff'),
    fontsColor: (state)=>(state.styleMode?'#fff':'#000'),
    outerColorRev: (state)=>(state.styleMode?'rgba(0,0,0,.3)':'rgba(255,255,255,.3)'),
    innerColorRev: (state)=>(state.styleMode?'rgba(0,0,0,.1)':'rgba(255,255,255,.1)'),
    mainColorRev: (state)=>(state.styleMode?'#fff':'#000'),
    fontsColorRev: (state)=>(state.styleMode?'#000':'#fff'),
    styleColor:()=>'#A0C5E8',
    refuseColor:()=>'#F26A6A',
}

export default {
    actions,
    mutations,
    state,
    getters
}