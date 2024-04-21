import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChannel } from './messages/messageChannel'

config()

const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API)
    const data = result.data
    const price = data.bitcoin.usd
    console.log('price:  -  ', price);
    return price
}

const generateCandles = async () => {

    const messageChannel = await createMessageChannel()

    if (messageChannel) {
        while (true) {
            const loopTimes = Period.HALF_MINUTE / Period.TEN_SECONDS

            const candle = new Candle('BTC')
            console.log('Generating new candle')

            for (let i = 0; i < loopTimes; i++) {
                const price = await readMarketPrice()
                candle.addValue(price)
                console.log(`Market price #${i + 1} of ${loopTimes}`)
                await new Promise(r => setTimeout(r, Period.HALF_MINUTE))
            }

            candle.closeCandle()
            console.log('Candle close')
            const candleObj = candle.toSimpleObject()
            const candleJson = JSON.stringify(candleObj)
            messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
            console.log('Candle sent to queue')
        }
    }
}

generateCandles()