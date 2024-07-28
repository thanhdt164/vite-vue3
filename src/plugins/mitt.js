import mitt from 'mitt'

const mittInt = mitt()
const mittObj = {
	$on: (...args) => mittInt.on(...args),
	$once: (...args) => mittInt.once(...args),
	$off: (...args) => mittInt.off(...args),
	$emit: (...args) => mittInt.emit(...args)
}
export default mittObj;