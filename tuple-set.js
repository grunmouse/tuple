const TreeItem = require('./tree-item.js');
const {ExtendableSet} = require('@grunmouse/extendable-sets');

function TupleSet(parent){
	this._tree = new TreeItem(parent && parent._tree);
	this._set = new ExtendableSet(parent && parent._set);
}
TupleSet.prototype = {
	constructor:TupleSet,
	store:function(arr){
		if(!this._set.has(arr)){
			arr = this._tree.store(arr, arr);
			this._set.add(arr);
		}
		return arr;
	},
	storeRecursive(arr){
		if(!this._set.has(arr)){
			arr = arr.map((item)=>(Array.isArray(item) ? this.storeRecursive(item) : item));
			arr = this.store(arr);
		}
		return arr;
	},
	
	createFactory:function(recursive){
		let scope = this;
		if(recursive){
			return function TupleFactoryRecursive(arr){
				return scope.storeRecursive(arr);
			}
		}
		else{
			return function TupleFactory(arr){
				return scope.store(arr);
			}
		}
	},
	
	has:function(arr){
		return this._set.has(arr) || this._tree.has(arr);
	}
}

TupleSet.prototype[Symbol.iterator] = function() {
    return this._set[Symbol.iterator]();
};

module.exports = TupleSet;