const axios = require('axios');

module.exports = async (ctx) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/proof-of-memes-pomchain');
        const data = response.data;
    
        const message = `
Proof Of Memes (POM) Price:

🚀 POM Price: $${data.market_data.current_price.usd.toFixed(5)}
🚨 24H Volume: $${data.market_data.total_volume.usd.toLocaleString()}

🟢 ATH was $${data.market_data.ath.usd.toFixed(5)} (${getDate(data.market_data.ath_date.usd)} D ago). Currently ${data.market_data.ath_change_percentage.usd.toFixed(2)}% from ATH.
🔻 ATL was $${data.market_data.atl.usd.toFixed(5)} (${getDate(data.market_data.atl_date.usd)} D ago). Currently ${data.market_data.atl_change_percentage.usd.toFixed(2)}% from ATL.
        `;
    
        ctx.reply(message);
    
      } catch (error) {
        console.log(error);
        ctx.reply('🚨 Error: Unable to fetch details!');
      }
  }

  function getDate(string) {
    const dateTime = string;
    const indexOfT = dateTime.indexOf('T');
    const dateString = dateTime.substring(0, indexOfT);
    const startDate = new Date(dateString);
    const endDate = new Date();
    const milliseconds = endDate.getTime() - startDate.getTime();
    let days = milliseconds / (1000 * 60 * 60 * 24);
    days = Math.floor(days);
    return days;
}