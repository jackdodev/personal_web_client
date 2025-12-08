import { useState } from 'react'
import Header from '../Header';
import Footer from '../Footer';
import MDEditor from '@uiw/react-md-editor';

export default function BlogEditPage() {
  const [value, setValue] = useState("**Hello World!!!**");
  const [title, setTitle] = useState('My Application Title');

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const saveNewBlog = () => {
    console.log("Saving blog...", title, value);
  }

  return (
    <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
      <Header />
        <main className="flex-1 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div style={{ /* Add your title bar styling here */ }}>
            <textarea
              value={title}
              onChange={handleTitleChange}
              style={{ /* Add styling for the textarea in the title bar */ }}
              rows={1} // Typically a single row for a title bar
            />
            {/* Other title bar elements like buttons, etc. */}
          </div>
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || "")}
            preview="edit"
          />
          <a onClick={saveNewBlog} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition">
            Save Post
          </a>
          <h1>Preview</h1>
          <br />
          <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }}/>
        </main>
      <Footer />
    </div>
  )
}
