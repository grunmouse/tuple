const TupleSet = require('./tuple-set.js');

class TupleMap extends Map{
	constructor(iterable, factory){
		if(iterable instanceof Function){
			factory = iterable;
			iterable = [];
		}
		if(!factory){
			let scope = new TupleSet();
			factory = scope.createFactory();
		}
		super(iterable);
		this.tuple = factory;
	}

	has(key){
		return super.has(this.tuple(key));
	}
	get(key){
		return super.get(this.tuple(key));
	}
	delete(key){
		return super.delete(this.tuple(key));
	}
	set(key, value){
		return super.set(this.tuple(key), value);
	}
	
}

module.exports = TupleMap;