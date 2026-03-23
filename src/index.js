// @pagedjs/fragmenter

// Core engine
export { default as Layout } from "./layout.js";

// Data types
export { default as BreakToken } from "./breaktoken.js";
export { default as Overflow } from "./overflow.js";
export { default as RenderResult, OverflowContentError } from "./renderresult.js";

// Content preparation
export { default as ContentParser } from "./parser.js";

// Plugin system
export { default as Hook } from "./utils/hook.js";

// DOM utilities
export {
	walk,
	nodeAfter,
	nodeBefore,
	elementAfter,
	elementBefore,
	displayedElementAfter,
	displayedElementBefore,
	stackChildren,
	rebuildTableRow,
	rebuildTree,
	rebuildAncestors,
	needsBreakBefore,
	needsBreakAfter,
	needsPreviousBreakAfter,
	needsPageBreak,
	words,
	letters,
	isContainer,
	isElement,
	isText,
	cloneNode,
	inIndexOfRefs,
	replaceOrAppendElement,
	findElement,
	findRef,
	validNode,
	prevValidNode,
	nextValidNode,
	indexOf,
	child,
	isVisible,
	hasContent,
	hasTextContent,
	indexOfTextNode,
	isIgnorable,
	isAllWhitespace,
	previousSignificantNode,
	breakInsideAvoidParentNode,
	parentOf,
	nextSignificantNode,
	filterTree,
} from "./utils/dom.js";

// Low-level utilities
export {
	getBoundingClientRect,
	getClientRects,
	UUID,
	positionInNodeList,
	findCssSelector,
	attr,
	querySelectorEscape,
	defer,
	requestIdleCallback,
	CSSValueToString,
} from "./utils/utils.js";
