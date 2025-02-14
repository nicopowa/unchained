class HelloWorldChain extends Unchained {

	constructor() {

		super();
	
	}

	hello() {

		return "hello";
	
	}

	world() {

		return "world";
	
	}

}

const HelloWorld = Unchained.from(HelloWorldChain);