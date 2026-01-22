import { useState } from 'react'
import Header from '../Header';
import Footer from '../Footer';
import MDEditor from '@uiw/react-md-editor';
import { getUploadLink } from '../../service/FileUploadService';

import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import axios from 'axios';

type UserContextType = {
  userId: string;
};

export default function BlogEditPage({ userId = "sokin1" }: UserContextType) {
  const [value, setValue] = useState("**Hello World!!!**");
  const [title, setTitle] = useState('My Application Title');
  const [loading, setLoading] = useState<boolean>(true)


  const saveNewBlog = async () => {
    console.log("Saving blog...", title, value);

    // assign new blog id
    const u = uuidv4();
    const bytes = uuidParse(u);
    const bId = toUrlSafeBase64(btoa(String.fromCharCode(...bytes)));

    // build key for upload file
    const key = `blog/${userId}:${bId}`;

    setLoading(true);
    // create new blog entry 
    var resp = await axios({
      method: 'POST',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/new/'+bId,
      responseType: 'json',
      data: {
        author_id: userId,
        subject: title,
        tags: [],
      }
    })

    if (resp.status !== 201) {
      console.error('Error creating new blog entry:', resp);
      setLoading(false);
      return;
    }
    
    const upload_link = await getUploadLink(key);
    if (upload_link === '') {
      axios({
        method: 'DELETE',
        url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/delete',
        responseType: 'json',
        data: {
          id: bId,
        }
      })
      setLoading(false);
      return;
    }

    await axios.put(upload_link, value, {
      headers: {
        'Content-Type': 'text/plain'
      },
    }).catch((error) => {
      console.error('Error uploading file:', error)
      // on upload error, delete the blog entry
      axios({
        method: 'DELETE',
        url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/delete',
        responseType: 'json',
        data: {
          id: bId,
        }
      }).finally(() => {
        setLoading(false);
      });
    });

    setLoading(false);
  }

  return (
    <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-3xl">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                // Strip newlines from pasted/typed input to enforce single-line title
                const sanitized = e.target.value.replace(/\r?\n/g, ' ');
                setTitle(sanitized);
              }}
              placeholder="Write a catchy title..."
              aria-label="Blog title"
              className="w-full text-center text-3xl md:text-4xl font-semibold bg-transparent border-0 p-0 focus:outline-none placeholder-gray-400 text-secondary"
            />
          </div>
        </div>
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || "")}
          preview="edit"
        />
        <a onClick={saveNewBlog} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition">
          Save Post
        </a>

        <section className="mt-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Preview</h2>
              <p className="text-sm text-gray-500">A quick look at how your post will appear.</p>
            </div>
            <div className="text-right">
              <div className="text-base md:text-lg font-medium text-gray-900 truncate max-w-xs">{title}</div>
            </div>
          </div>

          <div className="prose max-w-none bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }}/>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function toUrlSafeBase64(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
