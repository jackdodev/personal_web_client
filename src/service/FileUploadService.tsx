import axios from 'axios';

// TODO: Complete implementation
export async function uploadFile(title: string, value: string): Promise<string> {
  var response = await axios({
    method: 'POST',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/upload-link',
    responseType: 'json',
    data: {
      id: 'id',
      author_id: 'author_id',
      content: value
    }
  })

  const {upload_url, key} = response.data
  console.log('Upload link received:', upload_url, key)

  var uploaded = await axios.put(upload_url, value, {
    headers: {
      'Content-Type': 'text/plain'
    },
  }).catch((error) => {
    console.error('Error uploading file:', error)
  })

  return ''
}