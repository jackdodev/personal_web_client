import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import Header from '../Header';
import Footer from '../Footer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import axios from 'axios';

// We render markdown as raw text (no HTML rendering)

const BlogDetailPage: React.FC = () => {
    const [post, setPost] = useState<Array<any>>([])
    const [markdown, setMarkdown] = useState<string>(`No content available.`);
    const { blogId } = useParams();

    useEffect(() => {
        // Fetch blog details using blogId
        console.log('Fetching blog details for ID:', blogId);
        axios({
            method: 'GET',
            url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/'+blogId,
            responseType: 'json',
        }).then((response) => {
            if (response.status === 200) {
                setPost(response.data);

                console.log(response.data);
                var bucket_key = `blog/${response.data.author_id}:${response.data.blog_id}`
                axios({
                    method: 'POST',
                    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/download-link',
                    responseType: 'json',
                    data: {
                        key: bucket_key,
                    }
                }).then((resp) => {
                    if (resp.status === 200) {
                        const download_url = resp.data.download_url;
                        axios.get(download_url+`/key=${bucket_key}`).then((mdResp) => {
                            if (mdResp.status === 200) {
                                setMarkdown(mdResp.data);
                            } else {
                                console.error('Error fetching markdown content:', mdResp);
                            }
                        })
                    } else {
                        console.error('Error fetching download link:', resp);
                    }
                }).catch((error) => {
                    console.error('Error fetching download link:', error);
                });
            } else {
                console.error('Error fetching blog details:', response);
            }
        })
    }, [blogId])

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-3xl p-6 prose prose-h1:text-4xl prose-h1:text-blue-600 prose-p:text-lg prose-code:bg-gray-200 lg:prose-xl">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // custom code block renderer (keeps existing behavior)
                            code(props: any) {
                                const {children, className, node, inline, ...rest} = props;
                                const match = /language-(\w+)/.exec(className || '')
                                const codeString = String(children).replace(/\n$/, '');
                                return match && !inline ? (
                                    <SyntaxHighlighter PreTag="div" language={match[1]} style={dark}>
                                        {codeString}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code {...rest} className={className}>
                                        <b>{children}</b>
                                    </code>
                                );
                            },
                            h2({children, ...props}: any) {
                                return <h2 {...props} className="text-3xl text-600 mt-8 mb-4">{children}</h2>
                            },
                            h3({children, ...props}: any) {
                                return <h3 {...props} className="text-2xl text-600 mt-6 mb-3">{children}</h3>
                            },
                            // ensure lists render correctly with Tailwind
                            ul({children, ...props}: any) {
                                return <ul {...props} className="list-disc list-inside ml-6">{children}</ul>
                            },
                            // ordered lists (numbers)
                            ol({children, ...props}: any) {
                                return <ol {...props} className="list-decimal list-inside ml-6">{children}</ol>
                            },
                            li({children, ...props}: any) {
                                return <li {...props} className="mb-1">{children}</li>
                            },
                        }}
                    >
                        {markdown}
                    </Markdown>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default BlogDetailPage
