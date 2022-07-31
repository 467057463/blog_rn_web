import React from 'react';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import a11yDark from '@/assets/a11y-dark';

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
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    color: '#000',
    fontWeight: '700',
  },
  heading1: {
    fontSize: 30,
    marginBottom: 5,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 36,
    borderBottomColor: '#ececec',
    // borderBottomWidth: 1,
  },
  heading3: {
    fontSize: 18,
    lineHeight: 30,
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

  codeInline: {
    // paddingHorizontal: 3,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#fff5f5',
    color: '#ff502c',
    borderRadius: 2,
    marginHorizontal: 3,
  },

  blockquote: {
    color: '#666',
    paddingHorizontal: 23,
    paddingVertical: 1,
    borderLeftColor: '#cbcbcb',
    borderLeftWidth: 4,
    backgroundColor: '#f8f8f8',
    marginVertical: 20,
  },

  table: {
    marginVertical: 20,
    borderRadius: 0,
    borderColor: '#f6f6f6',
    borderWidth: 1,
  },

  tableHeader: {
    backgroundColor: '#f6f6f6',
  },

  tableRow: {
    borderColor: '#f6f6f6',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },

  listUnorderedItemIcon: {
    // fontSize: 24,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333333',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 5,
  },

  listOrderedItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 13,
    color: '#333333',
  },

  link: {
    textDecorationLine: 'underline',
    color: '#0b57d0',
  },

  text: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default (props) => {
  return (
    <Markdown style={styles} rules={rules}>
      {props.children}
    </Markdown>
  );
};
