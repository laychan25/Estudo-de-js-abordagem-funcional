import {  log, timeoutPromise, retry } from "./utils/promises-Helpers.js";
import './utils/array-helpers.js'
import { notaService as service } from "./nota/service.js";
import { partialize, takeUntil, pipe } from "./utils/operators.js";
import { debounceTime } from "./utils/operators.js";
import {EventEmitter} from './utils/event-emitter.js';




const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
)

const action = operations( ()=>
        retry (3, 3000, () => timeoutPromise( 1000, service.sumItems('2143')))
        .then(total => EventEmitter.emit('itensTotalizados', total))
        .catch(console.log)

) ;



document
.querySelector('#myButton')
.onclick = action;



