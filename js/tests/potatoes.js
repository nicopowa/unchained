class PotatoChain extends Unchained {

	constructor() {

		super();

		this.state = {
			potatoes: 0,
			progress: 0
		};

	}

	async plant(quantity) {

		await this.delay();

		this.state.potatoes = quantity;

		return "planted " + quantity + " potatoes";

	}

	async water() {

		await this.delay();

		return "watered potatoes";

	}

	async grow(percent) {

		await this.delay();

		this.state.progress = percent;

		return "potatoes growing " + percent + "%";

	}

	async harvest(quantity) {

		await this.delay();

		if(!this.state.potatoes)
			throw "harvest error no potatoes";

		if(this.state.potatoes < quantity)
			quantity = this.state.potatoes;

		this.state.potatoes -= quantity;

		return quantity + " potatoes harvested";

	}

	async peel() {

		await this.delay();

		return "potatoes peeled";

	}
	
	async cook() {

		await this.delay();

		return "cooking potatoes";

	}

	async mash() {

		await this.delay();

		return "mashed potatoes";

	}

	async eat() {

		await this.delay();

		return "eat all the potatoes";

	}

	async enjoy() {

		await this.delay();

		return "i love mashed potatoes";

	}

}

const PotatoFarm = Unchained.from(PotatoChain);