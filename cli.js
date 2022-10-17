#!/usr/bin/env node



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
});




