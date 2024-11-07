import {createGenerator} from "../core/generator.js";
import {generate} from "escodegen";

export const generator = createGenerator({generateFn: generate})