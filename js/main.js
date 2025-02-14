window.addEventListener(
	"load",
	() =>
		new Main()
);

const tests = {

	"hello world": async () =>
		await HelloWorld.hello.world.then(console.log),

	"count": async () =>
		await Count.plus.plus.plus.then(console.log),

	"recount": async () =>
		await Count.plus(2)
		.plus(2)
		.plus(2)
		.then(console.log),

	"foo bar": async () =>
		await FooBar.foo.bar.then(console.log),

	"foo bar subchain": async () =>
		await FooBar.baz.then(console.log),
	
	"promise error catch": async () =>
		await HelloWorld.hello.oops
		.catch(console.error),

	"cat chain":  async () => 
		await Cat.name("my cat").is("purring").and.say("meow").and.eat("fish").then(console.log),

	"cat subchain":  async () => 
		await Cat.name("subcat").beingACat.then(console.log),

	"mosquito attack": async () =>
		await Mosquito.name.attack
		.then(console.log),

	"mosquito crash": async () =>
		await Mosquito.name
		.flys.and.crashes
		.then(console.log)
		.catch(console.error),

	"calculator": async () =>
		await Calculator
		.set(3)
		.multiply(2)
		.divide(4)
		.add(5)
		.substract(2)
		.result
		.then(console.log),

	"potato farm": async () =>
		await PotatoFarm
		.plant(10).water
		.grow(0)
		.grow(34)
		.grow(67)
		.ext(potatoFarm =>
			potatoFarm.state.progress + "% potato")
		.grow(100)
		.harvest(5)
		.harvest(5)
		// .harvest(3) // error no more potatoes
		.peel.cook.mash
		.eat.enjoy
		.then(console.log)
		.catch(console.error),

	"lorem ipsum": async () =>
		await Latin.lorem.ipsum.dolor.sit
		.amet.consectetur.adipiscing.elit
		.sed.do.eiusmod.tempor.incididunt
		.ut.labore.et.dolore.magna.aliqua
		.then(console.log),

	"ffmpeg": async () =>
		await FFmpeg
		.inputFile("input.mp4")
		.mp4_1080p
		.filter("scale=1920:1080")
		.overwrite
		.outputFile("output.mp4")
		.build
		.then(console.log)
		.catch(console.error),

	"sql select": async () =>
		await SQL
		.table("users")
		.select("*")
		.where({ role: "admin" })
		.and({ active: true })
		.build,

	"sql insert": async () =>
		await SQL
		.table("users")
		.insert({
			name: "John",
			email: "john@example.com",
			active: true,
			meta: { role: "user" },
			created: new Date()
		})
		.build,

	"sql update": async () =>
		await SQL
		.table("users")
		.update({
			role: "admin",
			meta: { permissions: ["read", "write"] }
		})
		.where({ email: "john@example.com" })
		.and({ active: true })
		.build,

	"sql delete": async () =>
		await SQL
		.table("users")
		.delete
		.where({ role: "guest" })
		.or({ lastLogin: null })
		.build

};

class Main {

	constructor() {

		console.log("UNCHAINED");

		this.draw();

		// this.run();

	}

	draw() {

		const consoleOutput = document.getElementById("console");
		const originalLog = console.log;
		const originalError = console.error;

		function formatArg(arg) {

			if(arg instanceof Error)
				return arg.toString();
			return typeof arg === "object" ? JSON.stringify(arg) : String(arg);
		
		}

		function appendToConsole(args, isError = false) {

			const div = document.createElement("div");
			const text = Array.isArray(args) ? args.map(formatArg)
			.join(" ") : formatArg(args);

			div.textContent = text;
			if(isError)
				div.classList.add("error");
			consoleOutput.appendChild(div);
			consoleOutput.scrollTop = consoleOutput.scrollHeight;
		
		}

		console.log = (...args) => {

			originalLog.apply(
				console,
				args
			);
			appendToConsole(args);
		
		};

		console.error = (...args) => {

			originalError.apply(
				console,
				args
			);
			appendToConsole(
				args,
				true
			);
		
		};

		console.error = (...args) => {

			originalError.apply(
				console,
				args
			);
			appendToConsole(
				args.join(" "),
				true
			);
		
		};

		// Create test buttons
		const buttonsContainer = document.getElementById("buttons");
		
		Object.keys(tests)
		.forEach(testName => {

			const button = document.createElement("button");

			button.textContent = testName;
			button.onclick = async () => {

				consoleOutput.innerHTML = "";
				console.log(`Running test: ${testName}\n`);
				
				const test = tests[testName];
				const testCode = test.toString()
				.replace(
					"async () =>",
					""
				)
				.trim()
				.replace(
					/^await/,
					""
				)
				.trim()
				.replace(
					/\t*/g,
					""
				);
				
				const codeDiv = document.createElement("div");

				codeDiv.textContent = testCode;
				codeDiv.classList.add("code");
				consoleOutput.appendChild(codeDiv);
				
				try {

					await test();
				
				}
				catch(error) {

					console.error(error);
				
				}
			
			};
			buttonsContainer.appendChild(button);
		
		});

	}

	run() {

		Object
		.entries(tests)
		.reduce(
			(prev, [test, chain]) =>
				prev.then(() => {

					console.log("\n\n" + test.toUpperCase() + "\n\n");

					const chainCode = chain.toString()
					.replace(
						"async () =>",
						""
					)
					.trim()
					.replace(
						/^await/g,
						""
					)
					.trim()
					.replace(
						/\t*/g,
						""
					);

					console.log(chainCode);

					return chain();
			
				}),
			Promise.resolve()
		);

	}

}