import { useState } from 'react'
import axios from './axios'

function UploadImage() {
  const [file, setFile] = useState(null)

  function onChangeFile(e) {
    setFile(e.target.files[0])
  }

  async function sendFile() {
    console.log(file)
    // enviarlo al servidor con axios

    // content type: application/json
    // content type: multipart/form-data - mezcla entre archivos y campos normales
    const formData = new FormData()
    formData.append("image", file)
    formData.append("name", "prueba")
    await axios.post('/upload', formData)
  }

  return (
    <>
      <input type="file" onChange={onChangeFile}></input>
      <button onClick={sendFile}>Enviar</button>
    </>
  )
}

export default UploadImage