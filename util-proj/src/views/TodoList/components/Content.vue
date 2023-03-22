<template>
    <div 
        class="content-container clearfix"
        :style="{
            borderBottom: `1px solid ${innerColor}`,
        }"
    >
        <div 
            class="content-wrapper"
            :style="{
                color:fontsColor
            }"    
        >
            <ul>
                <Item 
                    v-if="contents.length>0" 
                    v-for="item,index of contents" 
                    :key="item._id" 
                    :itemData="item" 
                    @change="handlerChange"
                    @delete="handlerDelete"
                />
                <div v-else>无</div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

import Item from './Item.vue';

const innerColor = inject('innerColor');
const fontsColor = inject('fontsColor');

const props = defineProps({
    contents:Array,
    handlerDelete:Function,
    handlerChange:Function
})

</script>

<style lang="less" scoped>
.content-container {
    width: 100%;
    padding: 10px 0;
    .content-wrapper {
        padding: 0px 10px;
        text-align: center;
        ul {
            .item-container {
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>