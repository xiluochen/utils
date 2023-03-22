import axios from "axios"

const requirePaysAxios = (path, config)=>(
    axios('/pays'+path, config)
)
const requireTodosAxios = (path, config)=>(
    axios('/todo'+path, config)
)

export const requireGetTodos = ()=>{
    return requireTodosAxios('', {
        method:'GET',
    })
}

export const requireAppendTodo = (title)=>{
    return requireTodosAxios('', {
        method:'POST',
        data:{
            title
        }
    })
}

export const requireDeleteTodos = (ids)=>{
    return requireTodosAxios('', {
        method:'DELETE',
        data:{
            ids
        }
    })
}

export const requirePaysByDate = (date)=>{
    return requirePaysAxios('',{
        method:'GET',
        params:{
            date:JSON.stringify(date)
        }
    })
}

export const requireUpdatePays = (pays)=>{
    return requirePaysAxios('', {
        method:'POST',
        data: {
            pays
        }
    })
}

export const requireRemovePay = (id)=>{
    return requirePaysAxios(`/${id}`,{
        method:'POST',
    })
}