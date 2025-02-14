class LatinChain extends Unchained {

	constructor() {

		super();
	
	}

}

"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
.split(" ")
.forEach(word =>
	Object.defineProperty(
		LatinChain.prototype,
		word,
		{
			// this old school context
			value: async function() {

				await this.delay();

				return word;

			}
		}
	));

const Latin = Unchained.from(LatinChain);