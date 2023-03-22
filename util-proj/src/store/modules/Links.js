import { routes } from '@router/index.js'

const state = {
    links: routes.filter(item=>item.name.length>0).map(item=>(
        {
            name:item.name,
            path:item.path,
        }
    ))
}

export default { 
    state
}