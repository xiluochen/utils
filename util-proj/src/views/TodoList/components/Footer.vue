<template>
    <div class="footer-container">
        <div 
            class="footer-wrapper"
            
        >
            <div 
                v-if="len>0" 
                class="click-all-box"
                :style="{
                    color:fontsColor
                }"
            >
                <input 
                    type="checkbox" 
                    v-model="isAll" 
                    @change="handlerCheckAllChange" 
                />
                全选
            </div>
            <div v-if="checkedNum>0" class="delete-all-box">
                <button 
                    @click="handlerDeleteAll"
                >删除所选</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch,inject } from 'vue';

const fontsColor = inject('fontsColor')

const props = defineProps({
    checkedNum:Number,
    len:Number
});

const isAll = ref(props.checkedNum===props.len);
const emits = defineEmits(['deleteAll', 'checkAllChange']);

const handlerDeleteAll = ()=>{
    emits('deleteAll');
}
const handlerCheckAllChange = ()=>{
    emits('checkAllChange', {checked:isAll.value})
}

watch(props, ()=>{
    isAll.value = props.checkedNum===props.len
})

</script>

<style lang="less" scoped>
.footer-container {
    width: 100%;
    padding: 15px 40px 0;
    .footer-wrapper {
        height: 40px;
        line-height: 40px;
        .click-all-box {
            float: left;
            width: 80px;
            height: 30px;
        }
        .delete-all-box {
            float: right;
            width: 80px;
            height: 40px;
            line-height: 40px;
            button {
                width: 80px;
                height: 30px;
                background-color: rgb(151, 38, 38);
                color: #fff;
            }
        }
    }
}
</style>