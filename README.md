# Unchained

### [DEMO](https://nicopowa.github.io/unchained)

## Features

- ES6 class to chained API
- Chain sync & async tasks
- Handle errors
- Promise chain.then.catch
- Or try catch async await
- Nested "subchains"
- Sync chain state and data
- Clear syntax, no need "new"
- Optional methods parentheses

## Hello World

Write ES6 class

```js
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
```

Feed it to Unchained class

```
const HelloWorld = Unchained.from(HelloWorldChain);
```

Run the chain

```js
HelloWorld.hello.world.then(console.log);
// ["hello", "world"]
```
```js
console.log(await HelloWorld.hello.world);
// ["hello", "world"]
```

## Subchains

Merge chained methods into nested chains

Start subchain with "this.sub"

```js
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

		// subchain foo + bar
		return this.sub.foo.bar;
	
	}

}

const FooBar = Unchained.from(FooBarChain);
```

```js
await FooBar.foo.bar.then(console.log);
// ["foo", "bar"]		
```

```js
// baz = foo + bar
await FooBar.baz.then(console.log);
// ["foo", "bar"]		
```

## Shared data and chained methods args

```js
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
```

```js
// default value, no need parentheses
Count.plus.plus.plus.then(console.log);
// [1, 2, 3]
```

```js
Count.plus(2).plus(2).plus(2).then(console.log);
// [2, 4, 6]
```

## Chain anything

```js
await Latin.lorem.ipsum.dolor.sit
.amet.consectetur.adipiscing.elit
.sed.do.eiusmod.tempor.incididunt
.ut.labore.et.dolore.magna.aliqua
.then(console.log);
// ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"]
```

```js
// probably broken, dropped Unchained class in Claude's window 
// and typed "ffmpeg cmd builder chained class"
await FFmpeg
.inputFile("input.mp4")
.mp4_1080p
.filter("scale=1920:1080")
.overwrite
.outputFile("output.mp4")
.build
.then(console.log);
// ffmpeg -c:v libx264 -s 1920x1080 -b:v 5M -c:a aac -b:a 192k -y -vf "scale=1920:1080" -i "input.mp4" "output.mp4"
```


## Next

- Chain instance pause / resume / reset / reuse
- Shared data state between chain & subchain

## Why ?

Put it on top of Puppeteer and bot websites with a one-liner x)