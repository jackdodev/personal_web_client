import { useEffect } from 'react';
import { useParams } from 'react-router'
import Header from '../Header';
import Footer from '../Footer';
import Markdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

// We render markdown as raw text (no HTML rendering)

const BlogDetailPage: React.FC = () => {
    const { blogId } = useParams();
        const markdown = `Here is some **JavaScript** code:

~~~js
console.log('It works!')
~~~
`;

    useEffect(() => {
        // Fetch blog details using blogId
        }, [blogId])

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div>
                    <div className="mx-auto max-w-3xl p-6">
                        <Markdown
                            children={markdown}
                            components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={dark}
                                />
                                ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                                )
                            }
                            }}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default BlogDetailPage
