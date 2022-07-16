import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [gfm(), highlight()];

import 'bytemd/dist/index.css';
import 'highlight.js/styles/a11y-dark.css';
import '@/styles/markdown.css';

export default observer(function MarkdownEditor({ onChange, value }: any) {
  const [content, setContent] = useState(value);

  return (
    <Editor
      plugins={plugins}
      value={content}
      onChange={(value) => {
        setContent(value);
        onChange(value);
      }}
    />
  );
});
