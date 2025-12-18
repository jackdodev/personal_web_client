import axios from 'axios';

// TODO: Complete implementation
export async function uploadFile(key: string, value: string): Promise<string> {
  var response = await axios({
    method: 'POST',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/upload-link',
    responseType: 'json',
    data: {
      key: key,
      content: value
    }
  })

  const {upload_url} = response.data
  console.log('Upload link received:', upload_url)

  return upload_url
}