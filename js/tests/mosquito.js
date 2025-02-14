class MosquitoChain extends Unchained {

	constructor() {

		super();

		this.state.name = "mosquito";
	
	}

	async name(who = "") {

		if(who)
			this.state.name = who;

		await this.delay();

		return this.state.name;
	
	}

	async and() {

		await this.delay();

		return "and";
	
	}

	async flys() {

		await this.delay();

		return "flys";
	
	}

	async stings() {

		await this.delay();

		return "stings";
	
	}

	async attack() {

		return this.sub.flys.and.stings;
	
	}

	async crashes() {

		await this.delay();

		return Promise.reject(this.state.name + " crashed into the wall");
	
	}

}

const Mosquito = Unchained.from(MosquitoChain);