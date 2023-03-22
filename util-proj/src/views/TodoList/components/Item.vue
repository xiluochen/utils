<template>
    <div 
        class="item-container"
        :style="{
            borderBottom:`1px solid ${innerColor}`,
        }"
    >
        <div class="check-box">
            <input  type="checkbox" v-model="isChecked" @change="handlerChange" />
        </div>
        <div class="title">
            {{ itemData.title }}
        </div>
        <div v-if="itemData.isClicked" class="delete">
            <button class="delete-btn" @click="handlerDelete">删除</button>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, inject } from 'vue'; 

const innerColor = inject('innerColor')

const props = defineProps({
    itemData:Object,
})

const isChecked = ref(props.itemData.isClicked)

const emits = defineEmits(['change', 'delete'])

const handlerChange = ()=>{
    emits('change', {targetId:props.itemData.id})
}

const handlerDelete = ()=>{
    emits('delete', {targetId:props.itemData.id})
}

watch(props, ()=>{
    isChecked.value = props.itemData.isClicked;
})

</script>

<style lang="less" scoped>
    .item-container {
        height: 40px;
        line-height: 40px;
        padding: 0;
        margin-bottom: 5px;
        div {
            float: left;
        }
        .check-box {
            width: 80px;
            height: 40px;
            margin: 0 20px;
        }
        .title {
            width: 120px;
            height: 40px;
            text-align: center;
        }
        .delete {
            float: right;
            width: 80px;
            height: 40px;
            .delete-btn {
                width: 50px;
                height: 30px;
                background-color: rgb(151, 38, 38);
                color: #fff;
            }
        }
    }
</style>