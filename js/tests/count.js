class CountChain extends Unchained {

	constructor() {

		super();

		this.state = {
			value: 0
		};

	}

	plus(add = 1) {

		this.state.value += add;

		return this.state.value;

	}

}

const Count = Unchained.from(CountChain);