<template>
    <div class="todo-list-container">
        <div 
            class="todo-list-wrapper"
            :style="{
                boxShadow:`0 0 5px ${outerColor}`,
            }"
        >
            <Header ref="header" @appendTodo="appendTodo" />
            <Content 
                :contents="contents"
                :handlerDelete="handlerDelete"
                :handlerChange="handlerChange"
            />
            <Footer
                :len="contents.length"
                :checkedNum="checked" 
                @deleteAll="handlerDeleteAll"
                @checkAllChange="handlerCheckAllChange"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import { nanoid } from 'nanoid';
 
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
import { requireGetTodos, requireAppendTodo, requireDeleteTodos } from '../../static/axios';

const contents = ref(getContents());

const outerColor = inject('outerColor');

const header = ref();

const checked = computed(()=>{
    return contents.value.reduce((prev, item)=>(prev+(item.isClicked?1:0)),0);
})

function getContents(){
    return JSON.parse(window.sessionStorage.getItem('todos')) || [];
}

function appendTodo(data=''){
    const { todoName } = data;
    if(todoName){
        askAppendTodo(todoName, (data=[])=>{
            contents.value = data;
            window.sessionStorage.setItem('todos', data);
        })
    }
}

const handlerInputWhole = (event)=>{
    if(event.key === 'i'){
        header.value.todoName.focus();
    }
}

const handlerChange = (data={})=>{
    const { targetId } = data;
    const target = contents.value.find(item=>item.id===targetId);
    target.isClicked = !target.isClicked;
}

const handlerDelete = (data={})=>{
    const { targetId } = data;
    askDeleteTodos([targetId], ()=>{
        contents.value = contents.value.filter(item=>item.id!==targetId);
    }); 
}

const handlerCheckAllChange = (data={})=>{
    let { checked } = data;
    checked = Boolean(checked);
    contents.value.forEach(item=>{
        item.isClicked = checked;
    })
}

const handlerDeleteAll = ()=>{
    let removes = [], saves = [];
    contents.value.forEach(item=>{
        if(item.isClicked){
            removes.push(item.id);
        }else {
            saves.push(item);
        }
    })
    askDeleteTodos(removes, ()=>{
        contents.value = saves;
    });
}

const askTodos = async()=>{
    let res = await requireGetTodos();
    if(res.status === 200){
        window.sessionStorage.setItem('todos', res.data);
        contents.value = res.data;
    }
}

const askAppendTodo = async(title, success)=>{
    if(!success){
        success = ()=>{};
    }
    let res = await requireAppendTodo(title);
    if(res.status === 200){
        success(res.data);
    }
}

const askDeleteTodos = async (ids, success)=>{
    let res = await requireDeleteTodos(ids);
    if(res.status === 200){
        success();
    }
}

watch([contents, contents.value],()=>{
    contents.value.forEach(item=>{
        if(!item.isClicked){
            item.isClicked = false;
        }
        if(!item.id){
            item.id = item._id;
        }
    })
    window.sessionStorage.setItem('todos', JSON.stringify(contents.value));
})

onMounted(() => {
    askTodos();
    document.addEventListener('keyup', handlerInputWhole)
    return ()=>{
        document.removeEventListener('keyup', handlerInputWhole);    
    }
})


</script>

<style lang="less" scoped>
.todo-list-container {
    width: 100%;
    height: 100%;
    .todo-list-wrapper {
        position: absolute;
        top: 50px;
        left: 50%;
        width: 600px;
        box-sizing: content-box;
        padding: 30px 0px;
        transform: translateX(-50%);
    }
}
</style>