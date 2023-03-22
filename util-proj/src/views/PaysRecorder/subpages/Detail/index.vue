<template>
    <div 
        class="detail-container"
        :style="{
            color:fontsColor,
        }"
    >
        <div 
            class="detail-tit"
            :style="{
                borderBottom:`1px solid ${outerColor}`
            }"
        >
            <span 
                class="back" 
                @click="handlerBack"
                :style="{
                    color:outerColor
                }"    
            >{{ '<' }}</span>
            <span 
                class="date"
                :style="{
                    color:outerColor
                }"
            >
                <span
                    :style="{
                        color:mainColorRev
                    }"
                >
                    {{ tit.year }}
                </span>年
                <span
                    :style="{
                        color:mainColorRev
                    }"
                >
                    {{ tit.month }}
                </span>月
                <span
                    :style="{
                        color:mainColorRev
                    }"
                >
                    {{ tit.day }}
                </span>日
            </span>
            <span
                :style="{
                    color:outerColor
                }"
            >
                详情
            </span>
        </div>
        <div class="detail-body">
            <div 
                class="detail-body-tit"
                :style="{
                    borderBottom:`1px solid ${innerColor}`
                }"
            >
                <div class="ops">
                    <span 
                        class="add iconfont icon-tianjia"
                        @mouseenter="handlerAddHover"
                        @mouseleave="handlerAddHover"
                        @click="handlerAppendPay"
                        :style="{
                            color:isAddHover?styleColor:innerColor,
                            transform: isAddHover?'scale(1.1)':'none',
                        }"
                    >
                    </span>
                    <span 
                        class="delate iconfont icon-shanchu"
                        @mouseenter="handlerDelHover"
                        @mouseleave="handlerDelHover"
                        @click="()=>{opMode = !opMode;}"
                        :style="{
                            color:isDelHover?refuseColor:innerColor,
                            transform: isDelHover?'scale(1.1)':'none',
                        }"
                    >
                    </span>
                </div>
                <div 
                    v-for="item,index of paysDetailTit" 
                    :key="item+'-'+index"
                    :style="{
                        borderLeft:`1px solid ${innerColor}`
                    }"
                >
                    {{ item }}
                </div>
            </div>
            <div class="detail-body-content">
                <ul>
                    <li 
                        v-if="content.length>0" 
                        v-for="item, index of content" 
                        :key="index+'-'+item.id"
                        :style="{
                            borderBottom:`1px solid ${innerColor}`,
                            backgroundColor:item.type===-1?'rgba(139,0,0,.3)':'rgba(127,255,0,.3)',
                        }"
                    >
                        <div 
                            class="check"
                            @click="()=>{item.type=item.type===-1?1:-1}"
                        >
                            <span 
                                v-if="opMode" 
                                class="iconfont icon-shanchu"
                                @click="handlerDelete($event, index)"
                            >
                            </span>
                        </div>
                        <div 
                            class="name"
                            :style="{
                                borderLeft:`1px solid ${innerColor}`
                            }"
                        >
                            <span 
                                v-if="editId!==index+'-'+item.id+'-name'"
                                @click="handlerEditId(index+'-'+item.id+'-name')"
                            >
                                {{ item.title }}
                            </span>
                            <AutoInput 
                               v-if="editId===index+'-'+item.id+'-name'" 
                               @blur="handlerEditId('')" 
                               @change="(e)=>{item.title=e.target.value}"
                               @keyup="handlerKeyUp"
                               type="text" 
                               :value="item.title"
                               :style="{
                                   backgroundColor:innerColor
                               }"
                            />
                        </div>
                        <div 
                            class="pay"
                            :style="{
                                borderLeft:`1px solid ${innerColor}`
                            }"
                        >
                            <span 
                                v-if="editId!==index+'-'+item.id+'-pay'"
                                @click="handlerEditId(index+'-'+item.id+'-pay')"
                            >
                                {{ item.price }}
                            </span>
                            <AutoInput 
                               v-if="editId===index+'-'+item.id+'-pay'" 
                               @blur="handlerEditId('')" 
                               @change="(e)=>{item.price=parseFloat(e.target.value)}"
                               @keyup="handlerKeyUp"
                               type="number" 
                               :value="item.price"
                               :style="{
                                   backgroundColor:innerColor
                               }"
                            />
                        </div>
                        <div 
                            class="other"
                            :style="{
                                borderLeft:`1px solid ${innerColor}`
                            }"
                        >
                            <span 
                                v-if="editId!==index+'-'+item.id+'-other'"
                                @click="handlerEditId(index+'-'+item.id+'-other')"
                            >
                                {{ item.other }}
                            </span>
                            <AutoInput 
                               v-if="editId===index+'-'+item.id+'-other'" 
                               @blur="handlerEditId('')" 
                               @change="(e)=>{item.other=e.target.value}"
                               @keyup="handlerKeyUp"
                               type="text" 
                               :value="item.other"
                               :style="{
                                   backgroundColor:innerColor
                               }"
                            />
                        </div>
                    </li>
                    <div 
                        v-else 
                        class="no-content"
                        :style="{
                            color:outerColor
                        }"    
                    >
                        暂无账单
                    </div>
                </ul>
            </div>
            <div 
                class="detail-body-footer"
                :style="{
                    borderTop:`1px solid ${innerColor}`
                }"
            >
            </div>
        </div>
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, reactive, inject, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { paysDetailTit } from '@/static/utils';
import AutoInput from '@/components/AutoInput.vue';

import { requirePaysByDate, requireUpdatePays, requireRemovePay } from '@/static/axios.js'

const fontsColor = inject('fontsColor');
const innerColor = inject('innerColor');
const outerColor = inject('outerColor');
const mainColorRev = inject('mainColorRev');
const styleColor = inject('styleColor');
const refuseColor = inject('refuseColor');

const route = useRoute();
const router = useRouter();

let contentOri = [];

const tit = reactive({
    year: route.query.year,
    month: route.query.month,
    day:route.query.day
})

const isAddHover = ref(false);
const isDelHover = ref(false);

const editId = ref('');

const opMode = ref(false);

const content = ref([]);

const handlerBack = ()=>{
    router.go(-1);
}

const handlerAppendPay = ()=>{
    content.value.push({
        title:'',
        price:0,
        date: new Date(`${route.query.year}-${route.query.month}-${route.query.day}`),
        time: `${route.query.year}-${route.query.month}-${route.query.day}`,
        type:-1,
        other:'',
    })
    opMode.value = false;
}

const handlerDelete = (event, index)=>{
    event.preventDefault();
    let res= contentOri.filter((item)=>(item.id === content.value[index].id));
    if(res.length>0){
        askDeletePay(index);
    }else {
        content.value.splice(index,1)
    }
}

const handlerEditId = (id)=>{
    editId.value = id;
}

const handlerAddHover = ()=>{
    isAddHover.value = ! isAddHover.value
}

const handlerDelHover = ()=>{
    isDelHover.value = ! isDelHover.value
}
const handlerKeyUp = (e)=>{
    e.preventDefault();
    if(e.keyCode===13)
        handlerEditId('')
}

const checkDiff = (arr1, arr2)=>{
    if(arr1.length==0){
        return arr2;
    }
    let keys = Object.keys(arr1[0]);
    let ans =arr2.reduce((prev, item, index)=>{
        let flag = keys.reduce((prev, key)=>(prev&&arr1[index]&&item[key]===arr1[index][key]), true);
        if(!flag){
            prev.push(item);
        }
        return prev
    }, [])
    return ans;
}

const cleanContent = (arr)=>{
    let ans = [], dict={};
    arr.forEach(item=>{
        if(item.title!==''&&!dict[item.title]){
            ans.push(item);
            dict[item.title] = 1;
        }
    })
    return ans;
}

const askDeletePay = async (index)=>{
    let res = await requireRemovePay(content.value[index].id);
    if(res.status === 200){
        content.value.splice(index,1)
    }
}

const askPaysByDate = async ()=>{
    let res = await requirePaysByDate(
        `${route.query.year}-${route.query.month}-${route.query.day}`
    );
    if(res.status === 200) {
        content.value.push(...JSON.parse(JSON.stringify(res.data)));
        contentOri = [...JSON.parse(JSON.stringify(res.data))];
    }
}

const askUpdatePays= async (data)=>{
    let res = await requireUpdatePays(data);
    if(res.status === 200) {
        return;
    }else {
        console.log(res.data);
    }
}

onMounted(() => {
    askPaysByDate();
})
onBeforeUnmount(() => {
    content.value = cleanContent(content.value);

    askUpdatePays(checkDiff(contentOri, content.value));  
})

</script>

<style lang="less" scoped>
.detail-container {
    width: 100%;
    height: 100%;
    .detail-tit {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        .back {
            width: 40px;
            height: 40px;
            line-height: 40px;
            margin-left: -10px;
            margin-right: 5px;
            font-size: 24px;
            vertical-align:baseline;
            cursor: pointer;
        }
    }
    .detail-body {
        width: 100%;
        height: 360px;
        .detail-body-tit {
            width: 100%;
            height: 30px;
            line-height: 30px;
            div {
                float: left;
                width: 25%;
                height: 100%;
                line-height: 30px;
                font-size: 14px;
                text-align: center;
            }
            .ops {
                span {
                    display: inline-block;
                    width: 40px;
                    height: 100%;
                    margin: 0 5px;
                    font-size: 18px;
                    transition: all .3s;
                    cursor: pointer;
                }
            }
        }
        .detail-body-content {
            width: 100%;
            height: 300px;
            overflow: auto;
            .no-content {
                width: 100%;
                text-align: center;
                margin-top: 20px;
                letter-spacing: 3px;
            }
            ul {
                width: 100%;
                height: 100%;
                overflow: hidden;
                li {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    div {
                        float: left;
                        width: 25%;
                        height: 100%;
                        text-align: center;
                        span {
                            display: block;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                        }
                        input {
                            display: block;
                            width: 100%;
                            height: 100%;
                            padding: 0 10px;
                            border: 0;
                            outline: none;
                        }
                    }
                }
            }
        }
        .detail-body-footer {
            width: 100%;
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>