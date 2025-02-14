const VERBOSE = true;
const DELAY = 250;

class Unchained {

	constructor() {

		this.chain = Promise.resolve();
		this.output = [];
		this.state = {};
	
	}

	get sub() {

		if(VERBOSE) console.log("subchain");
		
		return Unchained.prox(Object.assign(
			Object.create(Object.getPrototypeOf(this)),
			this,
			{
				chain: Promise.resolve(),
				output: [],
				state: this.state
			}
		));
	
	}

	ext(out) {

		return out(this);
	
	}

	delay() {

		return new Promise(res =>
			setTimeout(
				res,
				DELAY
			));
	
	}

	static from(classRef) {

		return new Proxy(
			classRef,
			{
				construct(what, args) {
	
					return Unchained.prox(new what(...args));
			
				},
			
				get(what, prop) {
	
					if(typeof what.prototype[prop] === "function")
						return Unchained.prox(new what())[prop];
	
					return what[prop];
			
				}
			}
		);

	}

	static prox(obj, handler = null) {
		
		return new Proxy(
			() => {},
			{
				get(target, prop) {
	
					if(prop === "then") {
	
						if(handler)
							obj.chain = obj.chain
							.then(() =>
								handler())
							.then(res =>
								Unchained.drop(
									obj,
									res
								));
	
						const finalPromise = obj.chain.then(() =>
							obj.output);
	
						return finalPromise.then.bind(finalPromise);
					
					}
	
					if(prop === "catch") {
	
						const errorPromise = obj.chain
						.then(() =>
							obj.output)
						.catch(error => {
	
							throw error;
	
						});
	
						return errorPromise.catch.bind(errorPromise);
					
					}
	
					if(handler)
						obj.chain = obj.chain
						.then(() =>
							handler())
						.then(res =>
							Unchained.drop(
								obj,
								res
							));
	
					const method = obj[prop];
	
					if(!method) {
	
						obj.chain = obj.chain.then(() =>
							Promise.reject("no method \"" + prop.toString() + "\""));
	
						return Unchained.prox(obj);
					
					}
	
					if(typeof method === "function")
						return Unchained.prox(
							obj,
							(...args) =>
								method.apply(
									obj,
									args
								)
						);
	
					return method;
				
				},
	
				apply(target, thisArg, args) {
	
					if(handler)
						obj.chain = obj.chain
						.then(() =>
							handler(...args))
						.then(res =>
							Unchained.drop(
								obj,
								res
							));
						
					return Unchained.prox(obj);
				
				}
			}
		);
	
	}

	static drop(obj, res) {

		if(res?.output)
			obj.output.push(...res.output);
		else if(res) {

			if(VERBOSE && !Array.isArray(res)) console.log(res);

			obj.output.push(...[res].flat());

		}

	}

}