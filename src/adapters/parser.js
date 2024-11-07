import {createParser} from "../core/parser.js";
import {parseScript} from "esprima";

function esprimaParse(program) {
    return parseScript(program, {loc: true})
}

export const parser = createParser({parseScriptFn: esprimaParse})