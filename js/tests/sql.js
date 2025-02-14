class SQLChain extends Unchained {

	constructor() {

		super();
		this.state = {
			table: "",
			type: "",
			fields: "*",
			values: [],
			where: [],
			updates: []
		};
	
	}

	table(name) {

		this.state.table = name;
		return this;
	
	}

	select(fields = "*") {

		this.state.type = "SELECT";
		this.state.fields = fields;
		return this;
	
	}

	insert(data) {

		this.state.type = "INSERT";
		if(Array.isArray(data)) {

			const fields = Object.keys(data[0]);

			this.state.fields = fields.join(", ");
			this.state.values = data.map(row =>
				`(${fields.map(f =>
					this.escape(row[f]))
				.join(", ")})`);
		
		}
		else {

			const fields = Object.keys(data);

			this.state.fields = fields.join(", ");
			this.state.values = [`(${fields.map(f =>
				this.escape(data[f]))
			.join(", ")})`];
		
		}
		return this;
	
	}

	update(data) {

		this.state.type = "UPDATE";
		this.state.updates = Object.entries(data)
		.map(([key, value]) =>
			`${key} = ${this.escape(value)}`);
		return this;
	
	}

	delete() {

		this.state.type = "DELETE";
		return this;
	
	}

	where(conditions) {

		if(typeof conditions === "string") {

			this.state.where.push(conditions);
		
		}
		else {

			Object.entries(conditions)
			.forEach(([key, value]) => {

				this.state.where.push(`${key} = ${this.escape(value)}`);
			
			});
		
		}
		return this;
	
	}

	and(conditions) {

		if(this.state.where.length) {

			this.state.where.push("AND");
			this.where(conditions);
		
		}
		return this;
	
	}

	or(conditions) {

		if(this.state.where.length) {

			this.state.where.push("OR");
			this.where(conditions);
		
		}
		return this;
	
	}

	escape(value) {

		if(value === null)
			return "NULL";
		if(value === undefined)
			return "NULL";
		if(typeof value === "boolean")
			return value ? "TRUE" : "FALSE";
		if(typeof value === "number")
			return value;
		if(value instanceof Date)
			return `'${value.toISOString()}'`;
		if(typeof value === "object")
			return `'${JSON.stringify(value)}'`;
		return `'${value.toString()
		.replace(
			/'/g,
			"''"
		)}'`;
	
	}

	build() {

		let query = "";

		switch (this.state.type) {

			case "SELECT":
				query = `SELECT ${this.state.fields} FROM ${this.state.table}`;
				break;

			case "INSERT":
				query = `INSERT INTO ${this.state.table} (${this.state.fields}) VALUES ${this.state.values.join(", ")}`;
				break;

			case "UPDATE":
				query = `UPDATE ${this.state.table} SET ${this.state.updates.join(", ")}`;
				break;

			case "DELETE":
				query = `DELETE FROM ${this.state.table}`;
				break;
		
		}

		if(this.state.where.length) {

			query += ` WHERE ${this.state.where.join(" ")}`;
		
		}

		return query;
	
	}

}

const SQL = Unchained.from(SQLChain);