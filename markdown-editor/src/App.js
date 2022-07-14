import React, { useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/a11y-dark.css';
import './markdown.css';

const plugins = [gfm(), highlight()];

function App() {
  const [content, setContent] = useState('');
  return (
    <Editor
      plugins={plugins}
      value={content}
      onChange={(value) => {
        setContent(value);
      }}
    />
  );
}

export default App;
