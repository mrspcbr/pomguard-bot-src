const pkg = require('evm');
const { EVM } = pkg;
const Web3 = require('web3');
const axios = require('axios');

module.exports = async (ctx) => {
    const args = ctx.message.text.split(' ');
    const contract = args[1];
    try {
        var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet-rpc.memescan.io")); 
        var evmcode = await web3.eth.getCode(contract.toString());
        const evm = new EVM(evmcode);
        var functions = evm.getFunctions();
        if(functions.length == 0) {
            ctx.reply('šØ Error: Unable to fetch details. Check contract address again!');
        } else {
            try { 
                var freport = `\n\nContract Functions:\n`;
                for(var i=0;i<functions.length;i++)
                {
                    freport += `\n<code>${functions[i]}</code>`;
                }
                var report = `POM Contract Details:\n`;

                report += `\nš Contract: <code>${"0x...." + contract.substring(contract.length - 10)}</code>`;
                report += `\nš Source: <a href="https://memescan.io/address/${contract}">View on MemeScan</a>`;
                report += freport;
                ctx.replyWithHTML(report, {disable_web_page_preview: true});
            } catch (error) {
                ctx.reply('šØ Error: Unable to fetch details. Check contract address again!');
            }
        }
    } catch (error) {
        ctx.reply('šØ Error: Unable to fetch details. Check contract address again!');
    }
  }