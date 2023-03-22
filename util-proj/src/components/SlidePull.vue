<template>
    <div 
        class="pull-container"
        :style="{
            left:`${totWidth/2+400}px`,
            boxShadow:`0 0 ${isShow?'5px':'3px'} ${outerColor}`,
            color:fontsColor,
            backgroundColor:mainColor,
        }"
        @mouseenter="handlerShow"
        @mouseleave="handlerShow"
    >
        <div class="title-icon" @click="handlerLight">
            <span 
                class="iconfont icon-deng"
                :style="{
                    color:fontsColor
                }"
            ></span>
        </div>
        <div 
            v-show="route.path!=='/'"
            class="show-body"
            :style="{
                height:isShow?`${linkFil.length*30}px`:'0px',
                borderTop:isShow?`1px solid`:'none',
                borderTopColor:outerColor,
            }"
        >
            <ul>
                <li 
                    v-for="link,index of linkFil" 
                    :key="link.name"
                    @click="handlerNavigate(link.path)"
                >
                    {{ link.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watch, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const outerColor = inject('outerColor')
const mainColor = inject('mainColor')
const fontsColor = inject('fontsColor')

const props = defineProps({
    links:Array,
    totWidth:Number
})

const linkFil = ref([])

const isShow = ref(false)

const handlerLight = ()=>{
    store.commit('CHANGEMODE')
}

const handlerShow = ()=>{
    isShow.value = !isShow.value;
}

const handlerNavigate = (path)=>{
    if(route.path !== path){
        router.push(path);
    }
}

watch(()=>route.path, ()=>{
    isShow.value = false;
    linkFil.value = props.links.filter(item=>(item.path!==route.path));
})

</script>

<style lang="less" scoped>
.pull-container {
    position: absolute;
    top: 80px;
    width: 120px;
    transition: all .5s;
    .title-icon {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        span {
            transition: color .5s;
            font-size: 24px; 
        }
    }
    .show-body {
        // display: inline-block;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid rgba(0,0,0,.1);
        transition: height .5s;
        ul {
            li {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                    
                }
            }
        }
    }
}
</style>