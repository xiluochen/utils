<template>
    <div class="hello-container">
        <div 
            class="hello-wrapper"
            :style="{
                boxShadow:`0 0 5px ${outerColor}`
            }"
        >
            <div 
                v-for="item,index of links" 
                :key="item.name+'-'+index" 
                class="btn"
                @click="handlerPush(item.path)"
                @mouseenter="handlerHoverChange(0, item.name)"
                @mouseleave="handlerHoverChange(1)"
                :style="{
                    color:hoverId===item.name?fontsColorRev:fontsColor,
                    backgroundColor:hoverId===item.name?outerColor:outerColorRev,
                }"
            >
               <div>{{ item.name }}</div> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const navigate =useRouter();

const store = useStore();

const hoverId = ref('');

const links = store.state.Links.links;

const outerColor = inject('outerColor')
const outerColorRev = inject('outerColorRev')
const fontsColor = inject('fontsColor')
const fontsColorRev = inject('fontsColorRev')

const handlerPush = (url='')=>{
    navigate.push(url);
}

const handlerHoverChange = (type, id)=>{
    if(type===0){
        hoverId.value = id
    }else {
        hoverId.value = '';
    }
}

</script>

<style lang="less" scoped>
    .hello-container {
        width: 100%;
        height: 100%;
        .hello-wrapper {
            width: 400px;
            padding: 5px 0;
            margin: 100px auto;
            overflow: hidden;
            .btn {
                height: 40px;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                transition: all .3s;
                div {
                    transition: transform .5s;                    
                }
                &:hover {
                    // background-color: rgba(0,0,0,.5);
                    // color: #fff;
                    div {
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
</style>