import { config } from 'dotenv'
import { connect } from 'mongoose'

export const connectToMongoDB = async () => {
    config()

    try {
        if (process.env.MONGODB_CONNECTION_URL) {

            return await connect(process.env.MONGODB_CONNECTION_URL)
        }
        return console.log('error internal')

    } catch (error) {
        console.log('error', error)

    }


}