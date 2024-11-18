export function findInputError(errors:any,name:string,label:string){
    const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, key) => {
        return Object.assign(cur,{error:errors[key],label:label})
    }, {error:{message:''},label:''});
    return filtered;
}

export const isFormInvalid = (err:any) => {
    if(Object.keys(err).length > 0) return true
    return false;
}