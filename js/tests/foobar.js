class FooBarChain extends Unchained {

	constructor() {

		super();
	
	}

	async foo() {

		await this.delay();

		return "foo";
	
	}

	async bar() {

		await this.delay();

		return "bar";
	
	}

	baz() {

		return this.sub.foo.bar;
	
	}

}

const FooBar = Unchained.from(FooBarChain);