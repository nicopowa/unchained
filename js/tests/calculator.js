class CalculatorChain extends Unchained {

	constructor() {

		super();

		this.state = {
			value: 0
		};

	}

	async set(num) {

		await this.delay();

		this.state.value = num;

		return "" + num;

	}

	async add(num) {

		await this.delay();

		this.state.value += num;

		return "+" + num;

	}

	async substract(num) {

		await this.delay();

		this.state.value -= num;

		return "-" + num;

	}

	async multiply(num) {

		await this.delay();

		this.state.value *= num;

		return "x" + num;

	}

	async divide(num) {

		await this.delay();

		this.state.value /= num;

		return "÷" + num;

	}

	async result() {

		await this.delay();

		return "=" + this.state.value;

	}

}

const Calculator = Unchained.from(CalculatorChain);