<template>
    <div 
        class="page-container"
        :style="{
            height:height+'px',
            lineHeight:height+'px'
        }"
    >
        <ul>
            <li 
                v-for="page, index of pages" 
                :key="page+'-'+index"
                @click="handlerPageChange(page)"
                :style="{
                    width:width*0.8+'px',
                    height:height*0.8+'px',
                    lineHeight:height*0.8+'px',
                    marginTop:height*0.1+'px',
                    fontSize:width*0.4+'px',
                    border: `1px solid ${now==page?outerColor:innerColor}`,
                    color:now==page?fontsColor:innerColor,
                }"
            >
                {{ page }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue';

const emit = defineEmits(['pageChange']);

const props = defineProps({
    width:{
        type:Number,
        default: 30
    },
    height:{
        type:Number,
        default: 30
    },
    start:{
        type:Number,
        default:1
    },
    now:{
        type:Number,
        default:1
    },
    end:{
        type:Number,
        default:1
    },
    divid:{
        type:Number,
        default:3
    },
})

const fontsColor = inject('fontsColor');
const innerColor = inject('innerColor');
const outerColor = inject('outerColor');

const pages = ref([])

const generatePages = ()=>{
    let nowPages = [];
    const { start, end, now, divid } = props;
    nowPages.push(start);
    let mid = Math.floor(divid/2);
    if(now - mid > start+1){
        nowPages.push('...')
    }
    for(let i=-mid;i<=mid;i++){
        let nowI = i + now;
        if(nowI>start&& nowI<end){
            nowPages.push(nowI)
        }
    }
    if(now + mid < end - 1){
        nowPages.push('...')
    }
    if(end!=start)
        nowPages.push(end);
    pages.value = nowPages;
}

const handlerPageChange = (page)=>{
    if(page === '...')return;
    emit('pageChange', {page})
}

watch(props, ()=>{
    generatePages();
})

onMounted(() => {
    generatePages()
})

</script>

<style lang="less" scoped>
.page-container {
    width: 100%;
    text-align: center;
    ul {
        display: inline-block;
        li {
            float: left;
            margin: 0 5px;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>