import React, { useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/a11y-dark.css';
import './markdown.css';

const plugins = [gfm(), highlight()];

function App() {
  const content = `
    ## test
  `;
  return (
    <Viewer
      plugins={plugins}
      value={content}
    />
  );
}

export default App;
