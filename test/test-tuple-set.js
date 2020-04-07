let TupleSet = require('../tuple-set.js');
const assert = require('assert');
describe('TupleSet', ()=>{
	it('class & instance', ()=>{
		assert.ok(TupleSet);
		let set = new TupleSet();
		assert.ok(set instanceof TupleSet);
	});
	
	it('store', ()=>{
		const set = new TupleSet();
		assert.ok(!set.has([0,0,0,1]));
		set.store([0,0,0,1]);
		assert.ok(set.has([0,0,0,1]));
		assert.equal(set.store([0,0,0,1]), set.store([0,0,0,1]));
		assert.ok(!set.has([-1,0,0,0,0,0,0,0,0]));
	});
	
	it('factory', ()=>{
		const set = new TupleSet();
		const factory = set.createFactory();
		assert.equal(factory([0,0,0,1]), factory([0,0,0,1]));
		assert.ok(set.has([0,0,0,1]));
	});
});