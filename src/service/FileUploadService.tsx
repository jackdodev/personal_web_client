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

  const {link, key} = response.data
  console.log('Upload link received:', link, key)

  // var uploaded = await axios({
  //   method: 'PUT',
  //   url: link,
  //   headers: {
  //     'Content-Type': 'application/octet-stream'
  //   },
  // })

  // return uploaded.statusText
  return link;
}