<template>
    <Teleport to="body">
        <div 
            v-if="isMaskShow"
            class="mask"
            :style="{
                backgroundColor:outerColor,
            }"
        >
        </div>
    </Teleport>
</template>

<script setup>

import { inject } from 'vue';

const outerColor = inject('outerColor');

const props = defineProps({
    isMaskShow: Boolean,
})

</script>

<style lang="less" scoped>
.mask {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>