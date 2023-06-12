import mongoose from 'mongoose'

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mernAuth')
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}

export default connect
