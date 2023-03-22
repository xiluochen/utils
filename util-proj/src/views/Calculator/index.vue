<template>
    <div class="cal-container">
        <div 
            class="cal-wrapper"
            :style="{
                backgroundColor:fontsColor,
                boxShadow:`0 0 5px ${outerColor}`,
            }"
        >
            <div 
                class="show"
                :style="{
                    backgroundColor:outerColor,
                }"
            >
                <div 
                    class="his"
                    :style="{
                        color:fontsColorRev,
                        fontSize:(his.length>12)?'22px':'48px',
                        marginLeft:(his.length>12)?`-${(his.length-12)*48}px`:'0px',
                    }"
                >
                    {{ his }}
                </div>
                <div 
                    class="now"
                    :style="{
                        color:fontsColorRev,
                        marginLeft:(mode.length>12)?`-${(mode.length-12)*48}px`:'0px'
                    }"
                >
                    {{ mode }}
                </div>
            </div>
            <div class="tabs-box">
                <div 
                    class="nums-box"
                    :style="{
                        backgroundColor:mainColorRev
                    }"
                >
                    <ul>
                        <li 
                            v-for="tab,index of tabs" 
                            :key="tab+'-'+index"
                            :class="clickId==tab?'active':''"
                            @click="handlerClick(tab)"
                            @mouseenter="handlerHoverChange(0,tab)"
                            @mouseleave="handlerHoverChange(1)"
                            :style="{
                                backgroundColor:(hoverId===tab)||(clickId===tab)?outerColorRev:innerColorRev,
                                color:(hoverId===tab)||(clickId===tab)?fontsColorRev:innerColorRev,
                                boxShadow: (hoverId===tab)||(clickId===tab)?`0 0 3px ${outerColorRev}`:'',
                            }"
                        >
                            {{ tab }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { calcForStr } from '@/static/utils.js';
import { ref, onMounted, inject } from 'vue';

const his = ref('');
const mode = ref('0');
const clickId = ref('');
const hoverId = ref('')

const outerColor = inject('outerColor');
const outerColorRev = inject('outerColorRev');
const innerColorRev = inject('innerColorRev');
const fontsColorRev = inject('fontsColorRev');
const fontsColor = inject('fontsColor');
const mainColor = inject('mainColor');
const mainColorRev = inject('mainColorRev');

const tabs = [
    'pi', 'e', 'CE','<x',
    '(', ')', 'n!','+', 
    '7', '8', '9','-',
    '4', '5', '6','*',
    '1', '2', '3','/',
    '+/-', '0', '.','=',
];

const checkNow = (now)=>{
    if(now === 'pi'){
        now = Math.PI;
    }else if(now === 'e'){
        now = Math.E;
    }else if(now[now.length-1]==='!'){
        let non = now.slice(0, now.length-1);
        if(parseInt(non)!==parseInt(non)){
            mode.value = 'NaN';
        }
        now = 1;
        for(let i=2;i<parseInt(non);i++){
            now *= i;
        }
    }
    return now;
}

const calc = (s='')=>{
    let splits = [], now='';
    for(let noc of s){
        if(['+','-','*','/','(',')'].includes(noc)){
            if(now!==''){
                now = checkNow(now)
                splits.push(now);
            }
            splits.push(noc);
            now = '';
        }else {
            now+=noc;
        }
    }
    if(now.length>0){
        now = checkNow(now);
        splits.push(now);
    }
    if(splits.length === 1){
        mode.value = splits[0]
    }else {
        mode.value = calcForStr(splits);
    }
}

const showPress = (key)=>{
    clickId.value = key;
    setTimeout(()=>{
        clickId.value = '';
    },300)
}

const handlerHoverChange = (type, id)=>{
    hoverId.value = (type===0)?id:'';
}

const handlerClick = (tab)=>{
    if(tabs.includes(tab)){
        showPress(tab);
    }
    if(his.value.length>0){
        his.value = '';
    }
    if(tab!=='CE'&&tab!=='<x'&&tab!=='n!'&&tab!=='='){
        if(['+','-','*','/',')'].includes(tab)){
            if(mode.value === '0')
                return;
            else {
                let last = mode.value[mode.value.length-1];
                if((last<'0'||last>'9')&&last!=='!'&&last!==')'&&last!=='i'&&last!=='e'){
                    return
                }else {
                    mode.value += tab;
                }
            }
        }else if(tab==='('){
            let last = mode.value[mode.value.length-1];
            if(mode.value.length>0&&last!=='0'&&!['+','-','*','/'].includes(last)){
                return;
            }else {
                if(mode.value==='0'){
                    mode.value='';
                }
                mode.value += tab;
            }
        }else{
            if(mode.value==='0'){
                mode.value='';
            }else {
                let last = mode.value[mode.value.length-1];
                if((last<'0'||last>'9')&&!['+','-','*','/','('].includes(last)&&last!=='.'){
                    return;
                }
            }
            mode.value += tab;
        }
        
    }else if(tab==='CE'){
        if(mode.value === '0'){
            his.value = ''
        }else {
            mode.value = '0'
        }
    }else if(tab==='<x'){
        if(mode.value.length>1){
            if(mode.value === 'NaN' || mode.value==='out'){
                mode.value = '0'
            }else {
                mode.value = mode.value.slice(0, mode.value.length-1);
            }
        }else {
            if(mode.value === '0'){
                his.value = ''
            }else {
                mode.value = '0'
            }
        }
    }else if(tab==='n!'){
        mode.value += '!'
    }else if(tab==='='){
        his.value = mode.value+'=';
        calc(mode.value);
    }
}

const handlerKeyPress = (e)=>{
    const {key} = e;
    if(tabs.includes(key)){
        handlerClick(key);
    }else if(key==='Backspace'||key==='Delete'){
        handlerClick('<x')
    }else if(key==='Enter'){
        handlerClick('=')
    }else if(key===' '){
        handlerClick('CE')
    }else if(key==='!'){
        handlerClick('n!')
    }else if(key==='p'||key==='i'||key==='P'||key==='I'){
        handlerClick('pi')
    }else if(key==='E'){
        handlerClick('e')
    }
    
}
onMounted(() => {
    document.addEventListener('keyup', handlerKeyPress)

    return ()=>{
        document.removeEventListener('keyup', handlerKeyPress)
    }
})
</script>

<style lang="less" scoped>
.cal-container {
    width: 100%;
    height: 100%;
    .cal-wrapper {
        width: 400px;
        height: 600px;
        padding: 10px;
        margin: 0 auto;
        margin-top: 50px;
        .show {
            width: 100%;
            height: 140px;
            padding: 0 10px;
            overflow: hidden;
            div {
                height: 70px;
                line-height: 70px;
                font-size: 48px;
                text-align: right;
            }
        }
        .tabs-box {
            // position: relative;
            width: 100%;
            height: 420px;
            margin-top: 20px;
            .nums-box {
                display: inline-block;
                width: 380px;
                // height: 280px;
                ul {
                    width: 100%;
                    height: 100%;
                    li {
                        float: left;
                        width: 85px;
                        height: 60px;
                        margin: 5px;
                        line-height: 60px;
                        text-align: center;
                        border-radius: 10px;
                        font-size: 20px;
                        cursor: pointer;
                        user-select: none;
                        transition: all .3s;
                    }
                }
            }
        }
    }
}
</style>