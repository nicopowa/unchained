class AnimalChain extends Unchained {

	constructor() {

		super();
	
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

	async is(what) {

		await this.delay();

		return "is " + what;
	
	}

	async walking() {

		await this.delay();

		return this.is("walking");
	
	}

	async eat(what) {

		await this.delay();

		return "eating " + what;
	
	}

	async sleep() {

		await this.delay();

		return this.is("sleeping");
	
	}

	async say(what) {

		await this.delay();

		return "saying " + what;
	
	}

}

const Animal = Unchained.from(AnimalChain);

class CatChain extends AnimalChain {

	constructor() {

		super();

	}

	async pur() {

		return this.is("purring");
	
	}

	async meow() {

		return this.say("meow");
	
	}

	async eatFish() {

		return this.eat("fish");
	
	}

	beingACat() {

		return this.sub.pur.and.meow.and.eatFish;
	
	}

}

const Cat = Unchained.from(CatChain);

class MosquitoChain extends AnimalChain {

	constructor() {

		super();

		this.state.name = "mosquito";
	
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