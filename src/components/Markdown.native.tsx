import React from 'react';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const rules = {
  fence: (node, children, parent, styles) => {
    // const match = /language-(\w+)/.exec(className || '');
    // console.log(node, children, parent, styles);
    return (
      <SyntaxHighlighter
        language="javascript"
        style={a11yDark}
        highlighter={'prism'}
      >
        {node.content}
      </SyntaxHighlighter>
    );
  },
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 35,
    marginBottom: 10,
    paddingBottom: 5,
  },
  heading1: {
    fontSize: 30,
    marginBottom: 5,
  },
  heading2: {
    fontSize: 24,
    // borderBottomColor: '#ececec',
    // borderBottomWidth: 1,
  },
  heading3: {
    fontSize: 18,
    paddingBottom: 0,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
    marginTop: 5,
  },

  hr: {
    backgroundColor: '#ddd',
    marginVertical: 32,
  },

  blockquote: {
    color: '#666',
    paddingHorizontal: 1,
    // paddingVertical: 23,
    borderLeftColor: '#cbcbcb',
    borderLeftWidth: 4,
    backgroundColor: '#f8f8f8',
  },
  inlineCode: {
    paddingHorizontal: 3,
    backgroundColor: '#fff5f5',
    color: '#ff502c',
  },
  // paragraph: {
  //   marginVertical: 22,
  // },
});

export default (props) => {
  return (
    <Markdown style={styles} rules={rules}>
      {props.children}
    </Markdown>
  );
};
