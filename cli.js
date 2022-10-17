#!/usr/bin/env node

const fs = require('fs');

const valid_extensions = ['md', 'txt'];
const [,, ...args] = process.argv;

const filepaths = [];
const flags = [];

for (const arg of args) {
	if (arg[0] == '-') {
		flags.push(arg);
	} else {
		filepaths.push(arg);
	}
}

filepaths.forEach((filepath, index) => {
	console.log(`File #${1+index} of ${filepaths.length} (${filepath}):`);

	const extension = filepath.split('.').pop();
	if (!valid_extensions.includes(extension)) {
		console.log(`\t==== invalid extension (${filepath})`);
	}
	else if (!fs.existsSync(filepath)) {
		console.log(`\t==== file NOT found (${filepath})`);
	} else {
		console.log(`\t==== formatting file (${filepath})`);
		formatPartfile(filepath);
	}
});

function formatPartfile (filepath) {
	const input_text = fs.readFileSync(filepath, { encoding: 'utf8' });
	const input_lines = input_text.split('\n');

	let dashline_count = 0;
	input_lines.forEach((text, i) => { if (text.startsWith('====')) dashline_count++ });

	let result_text = "";
	let dashline_index = 0;
	for (const input_line of input_lines) {
		if (input_line.startsWith('====')) {
			const dashline_text = `=============== part ${dashline_index+1}/${dashline_count} ===============`;
			result_text += '\n' + dashline_text;
			dashline_index++;
		} else {
			result_text += '\n' + input_line.trimRight();
		}
	}

	fs.writeFileSync(filepath, result_text);
	console.log(`\t==== saved (${filepath}) with ${dashline_count} parts`);
}




