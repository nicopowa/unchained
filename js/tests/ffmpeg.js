class FFmpegBase extends Unchained {

	constructor() {

		super();
		
		this.state = {
			input: "",
			output: "",
			options: new Set(),
			filters: []
		};
	
	}

	async inputFile(path) {

		await this.delay();
		this.state.input = path;
		return `-i "${path}"`;
	
	}

	async outputFile(path) {

		await this.delay();
		this.state.output = path;
		return `"${path}"`;
	
	}

	// Base options
	async overwrite() {

		await this.delay();
		this.state.options.add("-y");
		return "-y";
	
	}

	async videoCodec(codec) {

		await this.delay();
		this.state.options.add(`-c:v ${codec}`);
		return `-c:v ${codec}`;
	
	}

	async audioCodec(codec) {

		await this.delay();
		this.state.options.add(`-c:a ${codec}`);
		return `-c:a ${codec}`;
	
	}

	async videoBitrate(bitrate) {

		await this.delay();
		this.state.options.add(`-b:v ${bitrate}`);
		return `-b:v ${bitrate}`;
	
	}

	async audioBitrate(bitrate) {

		await this.delay();
		this.state.options.add(`-b:a ${bitrate}`);
		return `-b:a ${bitrate}`;
	
	}

	async size(width, height) {

		await this.delay();
		this.state.options.add(`-s ${width}x${height}`);
		return `-s ${width}x${height}`;
	
	}

	async framerate(fps) {

		await this.delay();
		this.state.options.add(`-r ${fps}`);
		return `-r ${fps}`;
	
	}

	async seek(time) {

		await this.delay();
		this.state.options.add(`-ss ${time}`);
		return `-ss ${time}`;
	
	}

	async duration(time) {

		await this.delay();
		this.state.options.add(`-t ${time}`);
		return `-t ${time}`;
	
	}

	async filter(filter) {

		await this.delay();
		this.state.filters.push(filter);
		return `-vf "${filter}"`;
	
	}

	// Preset subchains
	async mp4_1080p() {

		console.log("mp4 1080p preset subchain");
		return this.sub
		.videoCodec("libx264")
		.size(
			1920,
			1080
		)
		.videoBitrate("5M")
		.audioCodec("aac")
		.audioBitrate("192k");
	
	}

	async web_video() {

		console.log("web video preset subchain");
		return this.sub
		.videoCodec("libx264")
		.size(
			1280,
			720
		)
		.videoBitrate("2M")
		.audioCodec("aac")
		.audioBitrate("128k");
	
	}

	async mkv_hevc() {

		console.log("mkv hevc preset subchain");
		return this.sub
		.videoCodec("libx265")
		.videoBitrate("3M")
		.audioCodec("libopus")
		.audioBitrate("192k");
	
	}

	async gif() {

		console.log("gif preset subchain");
		return this.sub
		.videoCodec("gif")
		.filter("fps=15")
		.filter("scale=480:-1:flags=lanczos");
	
	}

	async dvd() {

		console.log("dvd preset subchain");
		return this.sub
		.videoCodec("mpeg2video")
		.videoBitrate("9M")
		.audioCodec("ac3")
		.audioBitrate("448k")
		.size(
			720,
			480
		)
		.framerate(29.97);
	
	}

	async proxy() {

		console.log("proxy preset subchain");
		return this.sub
		.videoCodec("libx264")
		.size(
			854,
			480
		)
		.videoBitrate("1M")
		.audioCodec("aac")
		.audioBitrate("96k")
		.framerate(24);
	
	}

	async stream() {

		console.log("stream preset subchain");
		return this.sub
		.videoCodec("libx264")
		.videoBitrate("4M")
		.audioCodec("aac")
		.audioBitrate("160k")
		.size(
			1280,
			720
		)
		.framerate(30)
		.filter("format=yuv420p");
	
	}

	async archive() {

		console.log("archive preset subchain");
		return this.sub
		.videoCodec("libx264")
		.videoBitrate("8M")
		.audioCodec("flac")
		.size(
			1920,
			1080
		)
		.filter("format=yuv420p");
	
	}

	async audio_only() {

		console.log("audio only preset subchain");
		return this.sub
		.audioCodec("libmp3lame")
		.audioBitrate("320k")
		.filter("anull");
	
	}

	async thumbnails() {

		console.log("thumbnails preset subchain");
		return this.sub
		.videoCodec("mjpeg")
		.framerate(1 / 60) // One frame every minute
		.filter("select='not(mod(n,1500))'") // Every 1500 frames at 25fps = 1 minute
		.filter("scale=320:-1");
	
	}

	// Command builder
	async build() {

		await this.delay();

		if(!this.state.input || !this.state.output) {

			throw "FFmpeg error: Input and output paths are required";
		
		}

		const filterString = this.state.filters.length
			? `-vf "${this.state.filters.join(",")}"` : "";

		const command = [
			"ffmpeg",
			...Array.from(this.state.options),
			filterString,
			"-i",
			`"${this.state.input}"`,
			`"${this.state.output}"`
		].filter(part =>
			part)
		.join(" ");

		return command;
	
	}

}

const FFmpeg = Unchained.from(FFmpegBase);

// Example usage:
/*

// Web video conversion
await FFmpeg
	.inputFile("source.mov")
	.web_video
	.filter("fps=30")
	.outputFile("web.mp4")
	.build
	.then(console.log)
	.catch(console.error);

// HEVC/MKV conversion with trim
await FFmpeg
	.inputFile("video.mp4")
	.seek("00:01:30")
	.duration("00:05:00")
	.mkv_hevc
	.outputFile("output.mkv")
	.build
	.then(console.log)
	.catch(console.error);
*/