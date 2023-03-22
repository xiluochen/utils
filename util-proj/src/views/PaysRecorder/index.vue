<template>
    <div class="pay-container clearfix">
        <div 
            class="pay-wrapper"
            :style="{
                boxShadow:`0 0 5px ${outerColor}`
            }"
        >
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const outerColor = inject('outerColor');

</script>

<style lang="less" scoped>
.pay-container {
    width: 100%;
    height: 100%;
    .pay-wrapper {
        width: 600px;
        height: 400px;
        margin: 50px auto;
    }
}
</style>