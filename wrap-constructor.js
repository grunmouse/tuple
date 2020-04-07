function wrapConstructor(Ctor, map){
	return WrappedConstructor(...args){
		let key = [Ctor, ...args];
		if(map.has(key)){
			return map.get(key);
		}
		else{
			let item = new Ctor(...args);
			map.set(key, item);
			return item;
		}
	};
}

module.exports = wrapConstructor;