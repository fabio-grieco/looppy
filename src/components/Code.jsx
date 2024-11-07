import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Code({children}) {
    return <SyntaxHighlighter language="javascript" style={dracula}
                              customStyle={{
                                  display: 'inline-block',
                                  overflowX: 'visible',
                                  padding: '0',
                                  background: 'transparent',
                                  margin: '0',
                              }}>{children}</SyntaxHighlighter>
}

Code.propTypes = {
    children: PropTypes.string
}

export default Code
