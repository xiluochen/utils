<template>
    <div
        class="calendar-container"
        :style="{
            color:fontsColor,
        }"
    >
        <!-- 选择 年月日 -->
        <div 
            class="calendar-tit"
            :style="{
                border:`1px solid ${innerColor}`,
            }"
        >
            选择日期
        </div>
        <!-- 展示 当前选择的 年份/月份 下的 月/日 -->
        <div 
            class="calendar-body"
            :style="{
            }"
        >
            <div class="calendar-body-tit">
                <BreadChosen  
                    afterChar="年" 
                    :contentData="String(chosen.year>0?chosen.year:'-')" 
                    beforeChar="/" 
                    @click="handlerBreadClick(0)"
                />
                <BreadChosen 
                    v-if="chooseLevel>=1"  
                    afterChar="月" 
                    :contentData="String(chosen.month>0?chosen.month:'-')" 
                    beforeChar="/" 
                    @click="handlerBreadClick(1)"
                />
                <BreadChosen 
                    v-if="chooseLevel >= 2"  
                    afterChar="日" 
                    :contentData="String(chosen.day>0?chosen.day:'-')" 
                    beforeChar="/" 
                    @click="handlerBreadClick(2)"
                />
                <button 
                    @click="handlerSearhDetail"
                    @mouseenter="handlerHover"
                    @mouseleave="handlerHover"
                    :style="{
                        height: (chooseLevel===3)?'40px':'0px',
                        color:fontsColor,
                        boxShadow:(isHoverDetail)?`0 0 3px ${mainColorRev}`:'none'
                    }"
                >
                    账单详情
                </button>
            </div>
            <div 
                class="calendar-body-box"
                @wheel="handlerScroll"
            >
                <ListGround @click="handlerClick" :listData="showData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, reactive, inject, onMounted, watchEffect } from 'vue';
import BreadChosen from '@/components/BreadChosen.vue';
import ListGround from '@/components/ListGround.vue';
import { useRouter } from 'vue-router';

import { monthData, days } from '@/static/utils';

const router = useRouter();

const innerColor = inject('innerColor');
const mainColorRev = inject('mainColorRev');
const fontsColor = inject('fontsColor');

const chosen = reactive({
    year:0,
    month:0,
    day:0,
})

const showData = reactive({
    data:monthData,
    chosen:chosen.month
});

const chooseLevel = ref(1);

const isHoverDetail = ref(false);

const handlerClick = (index)=>{
    const level = chooseLevel.value;
    if(level === 0){
        chosen.year = Number(showData.data[index]);
        chooseLevel.value = 1;
    }else if(level === 1){
        chosen.month = Number(showData.data[index]);
        chooseLevel.value = 2;
    }else {
        chosen.day = Number(showData.data[index]);
        chooseLevel.value = 3;
    }
}

const handlerScroll = (e)=>{
    let top = showData.data[0];
    if(chooseLevel.value === 0&&e.target.scrollTop===0&&e.deltaY<0){
        for(let i=-1;i>-5;i--){
            if(i+top>=2000)
                showData.data.unshift(i+top);
        }
    }
}

const generateDays = (month)=>{
    let dayData = [], target=days[chosen.month];
    if(chosen.month === 2){
        const { year } = chosen;
        if((year%4==0&&year%100!==0)||(year%400===0)){
            target++;
        }
    }
    for(let i=1;i<=target;i++){
        dayData.push(i);
    }
    return dayData;
}

const handlerSearhDetail = ()=>{
    router.push(`/pays/detail?year=${chosen.year}&month=${chosen.month}&day=${chosen.day}`)
}

const handlerHover = ()=>{
    isHoverDetail.value = !isHoverDetail.value;
}

const handlerBreadClick = (state)=>{
    if(state === 0){
        chosen.month = 0;
        chosen.day = 0
    }else if(state === 1){
        chosen.day = 0;
    }
    chooseLevel.value = state;
}

watchEffect(()=>{
    if(chooseLevel.value === 1){
        showData.data = monthData;
        showData.chosen = chosen.month;
    }else if(chooseLevel.value === 0) {
        let yearData = [];
        let nowYear = dayjs().year();
        if(chosen.year === nowYear){
            for(let i=-11;i<1;i++){
                yearData.push(i+chosen.year);
            }
        }else {
            for(let i=-6;i<6;i++){
                yearData.push(i+chosen.year);
            }
        }
        showData.chosen = chosen.year;
        showData.data = yearData;
    }else if(chooseLevel.value === 2){
        let dayData = generateDays(chosen.month);
        showData.chosen = chosen.day;
        showData.data = dayData;
    }else {
        showData.chosen = chosen.day;
    }
})

onMounted(() => {
    let time = dayjs();
    chosen.year = time.year();
    chosen.month = time.month()+1;
    chosen.day = time.date();
    chooseLevel.value = 3;
    showData.data = generateDays(chosen.month)
    showData.chosen = chosen.day;
})
</script>

<style lang="less" scoped>
.calendar-container {
    width: 100%;
    height: 100%;
    .calendar-tit {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        letter-spacing: 2px;
    }
    .calendar-body {
        width: 100%;
        .calendar-body-tit {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 5px 20px;
            button {
                float: right;
                width: 100px;
                line-height: 40px;
                font-size: 14px;
                transition: box-shadow 1s;
                outline: none;
                background-color: transparent;
                overflow: hidden;
                cursor: pointer;
            }
        }
        .calendar-body-box {
            width: 100%;
            height: 320px;
            padding: 10px 20px;
        }
    }
}
</style>