<script setup>
import { ref, onMounted, provide, computed } from 'vue';
import { useStore, mapGetters, mapState } from 'vuex';

import SlidePull from './components/SlidePull.vue';

const store = useStore();

const width = ref(window.innerWidth);

const generateGetter = (name)=>(computed(mapGetters([name])[name].bind({$store:store})));


const outerColor = generateGetter('outerColor');
const innerColor = generateGetter('innerColor');
const mainColor = generateGetter('mainColor');
const fontsColor = generateGetter('fontsColor');
const styleColor = generateGetter('styleColor');
const refuseColor = generateGetter('refuseColor');

const outerColorRev = generateGetter('outerColorRev');
const innerColorRev = generateGetter('innerColorRev');
const mainColorRev = generateGetter('mainColorRev');
const fontsColorRev = generateGetter('fontsColorRev');

provide('outerColor', outerColor);
provide('innerColor', innerColor);
provide('mainColor', mainColor);
provide('fontsColor', fontsColor);
provide('styleColor', styleColor);
provide('refuseColor', refuseColor);

provide('outerColorRev', outerColorRev);
provide('innerColorRev', innerColorRev);
provide('mainColorRev', mainColorRev);
provide('fontsColorRev', fontsColorRev);

const handlerResize = ()=>{
    width.value = window.innerWidth;
}

onMounted(() => {
    window.addEventListener('resize', handlerResize);
    return ()=>{
        window.removeEventListener('resize', handlerResize);
    }
})

</script>

<template>
    <div 
        class="app-container clearfix"
        :style="{
            backgroundColor:mainColor
        }"
    >
        <RouterView></RouterView>
        <SlidePull :links="store.state.Links.links" :totWidth="width" />
    </div>
</template>

<style scoped>
.app-container {
    width: 100%;
    height: 100%;
}
</style>
