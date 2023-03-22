<template>
    <input ref="inp" v-bind="attrs" />
</template>

<script setup>
import { useAttrs, onMounted, ref } from 'vue';

    let attrs = useAttrs();
    const inp = ref(null);
    
onMounted(() => {
    inp.value.focus();
})
</script>

<style lang="less" scoped>
    input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
</style>
