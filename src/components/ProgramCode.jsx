import PropTypes from "prop-types";
import "./ProgramCode.css"
import React, {useEffect, useState} from "react";
import {useSnapshot} from "valtio";
import {state} from "../adapters/state.js";
import "./ProgramCode.css"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import {isRunning} from "../core/store/selectors.js";
import {isInThePast} from "../core/store/historySelectors.js";
import Button from "./Button.jsx";


function ProgramCode({code, onChange}) {
    const {value, history} = useSnapshot(state)
    const [markers, setMarkers] = useState([])

    function addTransitionClassToMarkers() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const currentMarkers = document.querySelectorAll('.running-marker')
                currentMarkers.forEach(marker => {
                    marker.classList.add('transition');
                })
            })
        })
    }

    useEffect(() => {
        addTransitionClassToMarkers();
    }, [markers])

    useEffect(() => {
        if (value.runningNodeLoc) {
            const marker = {
                loc: value.runningNodeLoc,
                isAsync: value.callStack[0]?.info.isAsync
            }
            setMarkers([marker])
        } else {
            setMarkers([])
        }
    }, [value.runningNodeLoc, value.callStack]);

    const editorMarkers = markers.map(({loc, isAsync}) => ({
        startRow: loc.start.line - 1,
        startCol: loc.start.column,
        endRow: loc.end.line - 1,
        endCol: loc.end.column,
        className: `running-marker ${isAsync ? 'async' : ''}`,
        type: 'background'
    }));

    const readOnly = isRunning(value) || isInThePast(history)

    const editorStyle = {width: "100%", height: "100%", cursor: "not-allowed"}
    return (
        <div className="code">
            <AceEditor
                style={editorStyle}
                className={"code-editor"}
                mode="javascript"
                theme="dracula"
                name="blah2"
                onChange={onChange}
                fontSize={18}
                lineHeight={24}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={false}
                value={code}
                readOnly={readOnly}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                markers={editorMarkers}
            />
            <Button/>
        </div>
    );
}

export default ProgramCode

ProgramCode.propTypes = {
    code: PropTypes.string,
    onChange: PropTypes.func,
}