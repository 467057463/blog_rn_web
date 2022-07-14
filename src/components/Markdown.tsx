// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import '@/styles/markdown.css';

// export default (props) => {
//   return (
//     <ReactMarkdown
//       className="markdown-body"
//       remarkPlugins={[remarkGfm]}
//       components={{
//         code({ node, inline, className, children, ...props }) {
//           const match = /language-(\w+)/.exec(className || '');
//           return !inline && match ? (
//             <SyntaxHighlighter
//               showLineNumbers
//               children={String(children).replace(/\n$/, '')}
//               style={a11yDark}
//               language={match[1]}
//               PreTag="div"
//               {...props}
//             />
//           ) : (
//             <code className={className} {...props}>
//               {children}
//             </code>
//           );
//         },
//       }}
//     >
//       {props.children}
//     </ReactMarkdown>
//   );
// };

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [gfm(), highlight()];

import 'bytemd/dist/index.css';
import 'highlight.js/styles/a11y-dark.css';
import '@/styles/markdown.css';

export default observer(function MarkdownEditor(props) {
  return <Viewer plugins={plugins} value={props.children as string} />;
});
