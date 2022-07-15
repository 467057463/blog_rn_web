import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/a11y-dark.css';
import './markdown.css';

const plugins = [gfm(), highlight()];

const App = observer(({ store }) => {
  // const [content, setContent] = useState('abcdefg');

  return <Viewer plugins={plugins} value={store.content} />;
});

export default App;
