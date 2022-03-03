import axios from 'axios'
import { data } from './data.js'

const insertData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  for (var items in data) {
    try {
      await axios.post(
        'http://localhost:8080/api/admin/products',
        data[items],
        config
      )
    } catch (error) {
      console.log(error)
    }
  }
}

insertData()
