
const symValue = Symbol();
const {ExtendableMap} = require('@grunmouse/extendable-sets');


/**
 *
 */
class TreeItem extends ExtendableMap{
	has(arr, own){
		if(!Array.isArray(arr)){
			return super.has(symValue, own);
		}
		else if(arr.length === 0){
			return super.has(symValue, own);
		}
		else{
			let car = arr[0], cdr = arr.slice(1);
			if(super.has(car, own)){
				let sub = super.get(car, own);
				return sub.has(cdr, own);
			}
			else{
				return false;
			}
		}
	}
	
	get(arr, own){
		if(arr.length === 0){
			return super.get(symValue, own);
		}
		else{
			let car = arr[0], cdr = arr.slice(1);
			if(super.has(car, own)){
				let sub = super.get(car, own);
				return sub.get(cdr, own);
			}
			else{
				return false;
			}
		}
	}
	
	add(key){
		if(key === symValue){
			throw new Error('Can not add symValue');
		}
		if(super.has(key, true)){
			//Если ключ существует в текущем объекте - возвращает значение по нему
			return super.get(key, true);
		}
		else{
			//Если нет - создаёт
			let sub;
			if(super.has(key, false)){
				//Если ключ есть у parent - берёт по нему значение и использует его в качестве parent для создаваемого объекта
				let parent = super.get(key, true);
				sub = new TreeItem(parent);
			}
			else{
				sub = new TreeItem();
			}
			super.set(key, sub);
			return sub;
		}
	}
	
	store(arr, value){
		if(arr.length===0){
			if(super.has(symValue)){
				return super.get(symValue);
			}
			else{
				super.set(symValue, value);
				return value;
			}
		}
		else{
			let car = arr[0], cdr = arr.slice(1);
			let sub = this.add(car);
			return sub.store(cdr, value);
		}
	}
}

module.exports = TreeItem;