<template>
    <div 
        class="header-container clearfix"
        :style="{
            borderBottomColor: innerColor
        }"
    >
        <div class="header-wrapper">
            <div class="input-box">
                <input  
                    ref="todoName" 
                    type="text" 
                    @keyup.enter="appendTodo" 
                    @focus="handlerFocusChange(true)"
                    @blur="handlerFocusChange(false)"
                    :style="{
                        backgroundColor:mainColor,
                        boxShadow:`0 0 ${isFocus?'10px':'3px'} ${outerColor}`,
                        color:fontsColor
                    }"
                />
            </div>
            <div class="append-box">
                <button 
                    @click="appendTodo"
                    @mouseenter="handlerHoverChange(true)"
                    @mouseleave="handlerHoverChange(false)"
                    :style="{
                        backgroundColor:mainColor,
                        color:fontsColor,
                        boxShadow:`0 0 ${isHover?'10px':'3px'} ${outerColor}`,
                    }"
                >添加</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const mainColor = inject('mainColor');
const outerColor = inject('outerColor');
const innerColor = inject('innerColor');
const fontsColor = inject('fontsColor');

const isHover = ref(false);
const isFocus = ref(false);

const emit = defineEmits(['appendTodo']);

const todoName = ref(null);

function appendTodo(){
    emit('appendTodo',{todoName:todoName.value.value});
    todoName.value.value = ''
}

defineExpose({
    todoName
})

const handlerFocusChange = (state)=>{
    isFocus.value = state
}

const handlerHoverChange = (state)=>{
    isHover.value = state
}

</script>

<style lang="less" scoped>
.header-container {
    width: 100%;
    padding: 15px 75px 45px;
    .header-wrapper {
        div {
            float: left;
        }
        .input-box {
            width: 300px;
            height: 40px;
            line-height: 40px;
            margin-right: 50px;
            input {
                width: 100%;
                height: 40px;
                padding-left: 15px;
                border-radius: 5px;
                font-size: 18px;
                border: none;
                outline: none;
                transition: all .3s;
            }
        }
        .append-box {
            width: 100px;
            height: 40px;
            line-height: 40px;
            button {
                width: 100px;
                height: 40px;
                padding: 0px;
                letter-spacing: 5px;
                border: none;
                outline: none;
                transition: all .5s;
            }
        }
    }
}
</style>