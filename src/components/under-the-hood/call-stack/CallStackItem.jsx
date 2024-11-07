import "./CallStack.css";
import Code from "../../Code.jsx";
import PropTypes from "prop-types";

function CallStackItem({content, info: {isCallback, isAsync}}) {
    const smallFontClass = content.length > 50 ? "small-font" : ""
    return <div className={`call-stack-item ${isCallback && "callback"} ${isAsync && "async"} ${smallFontClass}`}>
        <Code>{content}</Code>
    </div>
}

CallStackItem.propTypes = {
    content: PropTypes.string,
    info: PropTypes.shape({
        isCallback: PropTypes.bool,
        isAsync: PropTypes.bool,
    })
}

export default CallStackItem