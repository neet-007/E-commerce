import { lazy } from "react";

export function LazyLoad(path, namedExprot){
    return lazy(()=>{
        const promise = import(path)
        if (namedExprot == null){
            return promise
        }else{
            return promise.then(module => ({default: module[namedExprot]}))
        }
    })
}