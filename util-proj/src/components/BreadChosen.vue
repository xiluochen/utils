<template>
    <div 
        class="bread-container"
        :style="{
        }"
    >
        <span>{{ beforeChar }}</span>
        <div class="content" @click="handlerClick">{{ contentData }}</div>
        <span>{{ afterChar }}</span>
    </div>
</template>

<script setup>

const emit = defineEmits(['click']);

const props = defineProps({
    title:String,
    contentData:String,
    beforeChar: {
        type:String,
        default:''
    },
    afterChar: {
        type:String,
        default:''
    },
})

const handlerClick = ()=>{
    emit('click')
}
</script>

<style lang="less" scoped>
.bread-container {
    display: inline-block;
    height: 100%;
    padding: 0px 10px;
    span {
        display: inline-block;
        height: 100%;
        padding: 0 5px;
        color:#aaa;
    }
    .content {
        display: inline-block;
        height: 100%;
        margin: 0 2px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>