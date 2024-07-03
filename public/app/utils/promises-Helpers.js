export const handleStatus = res => 
    res.ok ? res.json() : Promise.reject(res.statusText)

export const log = params =>{
    console.log(params)
    return params
}

export const timeoutPromise = (millseconds, promise) => {

    const timeout = new Promise((resolve , reject) =>
        setTimeout(() => reject(`Limite da promise excedido (limite: ${millseconds} ms`),millseconds))

    return Promise.race([
        timeout, promise
    ])
    }

export const delay =  millseconds => data => 
    new Promise ((resolve, reject) => setTimeout(()=>resolve(data), millseconds))

export const retry = (retries, millseconds, fn) =>
    fn().catch(err=>{
        console.log(retries);
        return delay(millseconds)() .then(() =>
         retries > 1
        ? retry(--retries, millseconds, fn)
        : Promise.reject(err))
    });