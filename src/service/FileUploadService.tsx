import axios, { HttpStatusCode } from 'axios';

// TODO: Complete implementation
export async function getUploadLink(key: string): Promise<string> {
  var response = await axios({
    method: 'POST',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/upload-link',
    responseType: 'json',
    data: {
      key: key,
    }
  })

  const {upload_url} = response.data
  return upload_url
}

export async function getDownloadLink(key: string): Promise<string> {
  var response = await axios({
    method: 'POST',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/download-link',
    responseType: 'json',
    data: {
      key: key,
    }
  }).catch((error) => {
    throw new Error('Error fetching download link, ' + error);
  })

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error('Error fetching download link');
  }

  const {download_url} = response.data
  return download_url
}

export async function downloadContent(download_url: string): Promise<string> {
  var response = await axios.get(download_url)
  if (response.status !== HttpStatusCode.Ok) {
    throw new Error('Error fetching markdown content');
  }

  return response.data
}