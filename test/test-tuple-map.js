let TupleSet = require('../tuple-set.js');
let TupleMap = require('../tuple-map.js');
const assert = require('assert');

describe('TupleMap', ()=>{
	it('class & instance', ()=>{
		assert.ok(TupleMap);
		let factory = (new TupleSet()).createFactory();
		let instance = new TupleMap(factory);
		assert.ok(instance instanceof TupleMap);
		assert.equal(instance.tuple, factory);
	});
	
	it('set & get & has', ()=>{
		let set = new TupleSet();
		let factory = set.createFactory();
		let instance = new TupleMap(factory);
		assert.ok(!instance.has([0,1,1,0]));
		assert.ok(set.has([0,1,1,0]));
		assert.ok(!instance.has([0,1,1,0]));
		instance.set([0,1,1,0], -1);
		assert.ok(instance.has([0,1,1,0]));
		assert.equal(instance.get([0,1,1,0]), -1);
	});
});