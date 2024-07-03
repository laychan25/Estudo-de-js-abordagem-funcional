import { handleStatus } from "../utils/promises-Helpers.js";
import {partialize , pipe} from '../utils/operators.js'
import { Maybe } from "../utils/maybe.js";

const API = 'http://localhost:3000/notas'

const getItensFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItensByCode = (code, itensM) => itensM.map( itens=> itens.filter(item => item.codigo == code));
const sumItemsValue = itensM => itensM.map( itens=> itens.reduce((total,item)=> total + item.valor , 0));


export const notaService = {

    listAll() {
    return fetch(API)
    .then(handleStatus)
    .then(notas => Maybe.of(notas))
    .catch(err => {
        console.log(err)
        return Promise.reject('Nao foi possivel retornar as notas fiscais')
    })

    },

    
    sumItems(code){
        const filterItens = partialize(filterItensByCode,code)
        const sumItems = pipe(getItensFromNotas, filterItens, sumItemsValue);

        return this.listAll()
        .then(sumItems)
        .then(result => result.getOrElse(0))
         
    }
}
