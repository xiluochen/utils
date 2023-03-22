const checkFirst = (a)=>{
    if(a==='+'||a==='-'){
        return 0
    }else if(a==='*'||a==='/'){
        return 1
    }
    return -1
}

export const monthData = [
    '1', '2', '3', '4',
    '5', '6', '7', '8',
    '9', '10', '11', '12',
]

export const days = [
    0,31,28,31,30,31,30,31,31,30,31,30,31
]

export const paysDetailTit = [
    '账单名',
    '费用(元)',
    '备注'
]

export const calcForStr = (splits)=>{
    let stack = [], staSig = [], top;
    for(let nos of splits){
        if(['+','-','*','/','(',')'].includes(nos)){
            switch(nos) {
                case '+':
                case '-':
                case "*":
                case "/":
                    if(staSig.length>0){
                        top = staSig[staSig.length-1];
                        while(checkFirst(nos)<=checkFirst(top)){
                            stack.push(top);
                            staSig.pop();
                            if(staSig.length==0){
                                break
                            }
                            top = staSig[staSig.length-1];
                        }
                    }
                    staSig.push(nos);
                    break;
                case "(":
                    staSig.push(nos);
                    break
                case ")":
                    top = staSig[staSig.length-1]
                    while(top!=='('){
                        stack.push(top);
                        staSig.pop();
                        if(staSig.length===0){
                            return NaN;
                        }
                        top = staSig[staSig.length-1]
                    }
                    staSig.pop();
                    break;
            }
        }else {
            stack.push(nos);
        }
    }
    if(staSig.length>0){
        stack.push(...staSig.reverse());
    }
    let ansSta = [];
    for(let nos of stack) {
        let res;
        if(['+','-','*','/'].includes(nos)){
            let a = parseFloat(ansSta.pop()), b=parseFloat(ansSta.pop());
            switch(nos) {
                case '+':
                    res = a+b;
                    break
                case '-':
                    res = b-a
                    break
                case '*':
                    res = a*b    
                    break
                case '/':
                    res = b/a
            }
        }else {
            res = nos;
        }
        ansSta.push(res);
    }
    return ansSta[0].toString().slice(0, 12);
}