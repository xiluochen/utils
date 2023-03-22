<template>
    <div class="ground-container">
        <ul
            @wheel="handlerScroll"
            :ref="ref"
            :style="{
                paddingRight:(isShowScoll)?'20px':'40px',
                overflow:(isShowScoll)?'auto':'hidden'
            }"
        >
            <li 
                v-for="item,index of listData.data" 
                :key="item+'-'+index"
                @mouseenter="handlerHover(1, item+'-'+index)"
                @mouseleave="handlerHover(0)"
                @click="handlerClick(item,index)"
                @wheel="(e)=>{e.preventDefault(); e.stopPropagation();}"
                @scroll="(e)=>{e.preventDefault(); e.stopPropagation();}"
                :style="{
                    boxShadow:(hoverId===(item+'-'+index))||(listData.chosen == item)?`0 0 10px ${outerColor}`:'none',
                    textShadow:(hoverId===(item+'-'+index))||(listData.chosen == item)?`0 0 10px ${outerColor}`:'none'
                }"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>

import { inject, ref, computed } from 'vue';

const outerColor = inject('outerColor')

const hoverId = ref('')

const ulRef = ref();

const props = defineProps({
    listData:Object,
    ref:String,
})

const isShowScoll = computed(()=>(props.listData.data.length>12))

const emit = defineEmits(['click']);

const handlerHover = (type, id)=>{
    if(type === 1){
        hoverId.value = id;
    }else {
        hoverId.value = '';
    }
}

const handlerClick = (title, index) => {
    emit('click', index);
}

</script>

<style lang="less" scoped>
    .ground-container {
        width: 100%;
        height: 100%;
        ul {
            width: 100%;
            height: 100%;
            padding: 0 40px;
            li {
                float: left;
                width: 100px;
                height: 80px;
                line-height: 80px;
                margin: 10px;
                text-align: center;
                transition: all .5s;
                border-radius: 10px;
                cursor: pointer;
                font-family:'FangSong';
                font-size: 24px;
            }
        }
    }
</style>