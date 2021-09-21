import axios from 'axios'
import { TOKEN } from './constants'

let baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"
if (process.env.NODE_ENV === "test") {
  baseURL = ""
}

const customAxios = axios.create({
  baseURL,
  headers: {
    'Authorization': localStorage.getItem(TOKEN)
  }
})

export default customAxios