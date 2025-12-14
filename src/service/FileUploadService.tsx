import axios from 'axios';

// TODO: Complete implementation
export async function uploadFile(title: string, value: string): Promise<string> {
  var response = await axios({
    method: 'POST',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog',
    responseType: 'stream',
    data: {
      subject: title,
      content: value
    }
  })

  const {link, key} = response.data

  var uploaded = await axios({
    method: 'PUT',
    url: link,
    headers: {
      'Content-Type': 'application/octet-stream'
    },
  })

  return uploaded.statusText
}