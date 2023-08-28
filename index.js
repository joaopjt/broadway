const { Command } = require('commander');
const { name, version } = require('./package.json');
const { Lantern } = require('lantern');
const broadway = require('./src/broadway.json');
const program = new Command();

program
  .name(name)
  .version(version);

program.command('parse')
  .description('Parse a input into its own reference keyword')
  .argument('<string>', 'string to parse')
  .option('-d, --debug', 'debug')
  .action((s, { debug }) => {
    const p = new Lantern(s, debug);
    let result = [];

    p.result.forEach((_h_word) => {
      if (_h_word._children.length === 3) {
        let w = _h_word._children[2].wide;

        result.push({ word: broadway[_h_word.wide][w],  _children: _h_word });
      } else {
        result.push({ word: broadway[_h_word.wide]._default,  _children: _h_word });
      }
    });

    console.log(result);
  });


program.parse();