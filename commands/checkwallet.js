const axios = require('axios');

module.exports = async (ctx) => {
    const args = ctx.message.text.split(' ');
    const walletaddress = args[1];
    try {
      const response = await axios.get('https://memescan.io/api?module=account&action=balance&address=' + walletaddress);
      const data = response.data;
      const presponse = await axios.get('https://api.coingecko.com/api/v3/coins/proof-of-memes-pomchain');
      const pdata = presponse.data;
 
      let tokenlist = await getTokenList(walletaddress);
  
      const message = `
POM Wallet Analysis:

🔎 Wallet: ${"0x...." + walletaddress.substring(walletaddress.length - 10)}

🚀 POM Balance: ${(data.result / 10 ** 18).toLocaleString()} POM
💰 Value: $${(pdata.market_data.current_price.usd.toFixed(5) * (data.result / 10 ** 18)).toLocaleString()} at $${pdata.market_data.current_price.usd.toFixed(5)}/POM

Token Holdings:

${tokenlist}

      `;
  
      ctx.reply(message);
  
    } catch (error) {
      ctx.reply('🚨 Error: Unable to fetch details. Check wallet address again!');
    }
  }

  async function getTokenList(string) {
    const walletaddy = string;
    const tresponse = await axios.get('https://memescan.io/api?module=account&action=tokenlist&address=' + walletaddy);
    const tdata = tresponse.data;

    let totaltokens = tdata.result.length;
    let tokenl = '';
    for (i=0;i<totaltokens;i++){
        if(tdata.result[i].type == "ERC-20") {
        tokenl += `$${tdata.result[i].symbol.toUpperCase()}, `
        }
    }
    return tokenl;
}