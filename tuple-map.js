
class TupleMap extends Map{
	constructor(iterable, tupleFactory){
		if(iterable instanceof Function){
			tupleFactory = iterable;
			iterable = [];
		}
		super(iterable);
		this.tuple = tupleFactory;
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