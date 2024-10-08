/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ToggleBlock"] = factory();
	else
		root["ToggleBlock"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actions/actions.js":
/*!********************************!*\
  !*** ./src/actions/actions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addEventDeleteButton\": () => (/* binding */ addEventDeleteButton),\n/* harmony export */   \"addListeners\": () => (/* binding */ addListeners),\n/* harmony export */   \"addSupportForCopyAndPasteAction\": () => (/* binding */ addSupportForCopyAndPasteAction),\n/* harmony export */   \"clickInDefaultContent\": () => (/* binding */ clickInDefaultContent),\n/* harmony export */   \"enableLineBreaks\": () => (/* binding */ enableLineBreaks),\n/* harmony export */   \"getDescendantsNumber\": () => (/* binding */ getDescendantsNumber),\n/* harmony export */   \"readOnlySupported\": () => (/* binding */ readOnlySupported),\n/* harmony export */   \"restoreItemAttributes\": () => (/* binding */ restoreItemAttributes),\n/* harmony export */   \"setDefaultContent\": () => (/* binding */ setDefaultContent),\n/* harmony export */   \"setInitialTransition\": () => (/* binding */ setInitialTransition),\n/* harmony export */   \"setPlaceHolder\": () => (/* binding */ setPlaceHolder),\n/* harmony export */   \"toolbox\": () => (/* binding */ toolbox)\n/* harmony export */ });\n/* harmony import */ var _toggle_removeFullToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toggle/removeFullToggle */ \"./src/toggle/removeFullToggle.js\");\n\n/**\r\n * Add listener to delete button.\r\n * @param {HTMLDivElement} deleteElement\r\n * @param {number} toggleIndex\r\n */\n\nfunction addEventDeleteButton(deleteElement, toggleIndex) {\n  if (!deleteElement) return;\n  deleteElement.addEventListener('click', () => {\n    const classesList = deleteElement.classList;\n    const classes = Object.values(classesList);\n    if (classes.indexOf('clicked-to-destroy-toggle') === -1) {\n      deleteElement.classList.add('clicked-to-destroy-toggle');\n    } else {\n      (0,_toggle_removeFullToggle__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(toggleIndex);\n    }\n  });\n}\n\n/**\r\n * Adds the required listeners to call the toggle shortcuts\r\n * on the editor.\r\n */\nfunction addListeners() {\n  const redactor = document.activeElement;\n  redactor.addEventListener('keyup', e => {\n    const blockContainer = document.activeElement;\n    const currentBlock = this.getCurrentBlockIndex();\n    const {\n      holder: currentBlockContainer\n    } = this.getBlockByIndex(currentBlock);\n    if (e.code === 'Space') {\n      this.createToggleWithShortcut(blockContainer);\n    } else if (currentBlock > 0 && !this.isPartOfAToggle(currentBlockContainer) && e.code === 'Tab') {\n      this.nestBlock(currentBlockContainer);\n    }\n  });\n}\n\n/**\r\n * Adds mutation observer to reset the toggle ids\r\n * when a toggle is copied and pasted.\r\n */\n\nfunction addSupportForCopyAndPasteAction() {\n  if (!this.readOnly) {\n    const target = document.querySelector('div.codex-editor__redactor');\n    const observer = new MutationObserver(mutations => {\n      mutations.forEach(mutation => {\n        if (mutation.type === 'childList') {\n          setTimeout(this.restoreItemAttributes.bind(this, mutation));\n        }\n      });\n    });\n    const config = {\n      attributes: true,\n      childList: true,\n      characterData: true\n    };\n    observer.observe(target, config);\n  }\n}\n\n/**\r\n * Adds the actions to do when the default content is clicked.\r\n */\nfunction clickInDefaultContent() {\n  this.api.blocks.insert();\n  this.setAttributesToNewBlock();\n  this.setDefaultContent();\n}\n\n/**\r\n * Return the number of blocks inside the root Toggle\r\n * @param {string} fk - The id of the root Toggle\r\n */\n\nfunction getDescendantsNumber(fk) {\n  let counter = 0;\n  const listChildren = document.querySelectorAll(`div[foreignKey=\"${fk}\"]`);\n  listChildren.forEach(child => {\n    // Evaluate if the child is a toggle\n    if (child.hasAttribute('status')) {\n      const childId = child.querySelector('.toggle-block__selector').getAttribute('id');\n      counter += this.getDescendantsNumber(childId);\n    }\n    counter += 1;\n  });\n  return counter;\n}\n\n/**\r\n   * Restores the item attributes to nested blocks.\r\n   *\r\n   * @param {HTMLDivElement} mutation - Html element removed or inserted\r\n   */\n\nfunction restoreItemAttributes(mutation) {\n  if (this.wrapper !== undefined) {\n    const index = this.api.blocks.getCurrentBlockIndex();\n    const block = this.api.blocks.getBlockByIndex(index);\n    const {\n      holder\n    } = block;\n    const currentBlockValidation = !this.isPartOfAToggle(holder);\n    const {\n      length: toggleItemsCount\n    } = this.itemsId;\n    const {\n      length: existingToggleItemsCount\n    } = document.querySelectorAll(`div[foreignKey=\"${this.data.fk}\"]`);\n    if (this.itemsId.includes(block.id) && currentBlockValidation) {\n      this.setAttributesToNewBlock(index);\n    } else if (mutation.addedNodes[0] && mutation?.previousSibling && this.isPartOfAToggle(mutation.previousSibling) && !this.isPartOfAToggle(mutation.addedNodes[0]) && toggleItemsCount > existingToggleItemsCount) {\n      const {\n        id: addedBlockId\n      } = mutation.addedNodes[0];\n      const addedBlock = this.api.blocks.getById(addedBlockId);\n      this.setAttributesToNewBlock(null, this.wrapper.id, addedBlock);\n      this.itemsId[index] = block.id;\n    }\n  }\n}\n\n/**\r\n * Sets the default content. If the toggle has no other blocks inside it,\r\n * so sets the 'block__hidden tag' in the default content,\r\n * otherwise it removes it.\r\n */\n\nfunction setDefaultContent() {\n  const children = document.querySelectorAll(`div[foreignKey=\"${this.wrapper.id}\"]`);\n  const {\n    firstChild,\n    lastChild\n  } = this.wrapper;\n  const {\n    status\n  } = this.data;\n  const value = children.length > 0 || status === 'closed';\n  lastChild.classList.toggle('toggle-block__hidden', value);\n  firstChild.style.color = children.length === 0 ? 'gray' : 'black';\n}\n\n/**\r\n * Adds the initial status for the icon, and establishes\r\n * the delay for the transition displayed when the icon\r\n * is clicked.\r\n */\n\nfunction setInitialTransition() {\n  const {\n    status\n  } = this.data;\n  const icon = this.wrapper.firstChild;\n  const svg = icon.firstChild;\n  svg.style.transition = '0.1s';\n  svg.style.transform = `rotate(${status === 'closed' ? 0 : 90}deg)`;\n}\n\n/**\r\n * If the toggle root is empty and the key event received is 'backspace'\r\n * or 'enter', its content is cleared so that the visible placeholder\r\n * is set through the css.\r\n *\r\n * @param {KeyboardEvent} e - key up event\r\n */\n\nfunction setPlaceHolder(e) {\n  if (e.code === 'Backspace' || e.code === 'Enter') {\n    const {\n      children\n    } = this.wrapper;\n    const {\n      length\n    } = children[1].textContent;\n    if (length === 0) children[1].textContent = '';\n  }\n}\n\n/**\r\n * Icon and title for displaying at the Toolbox\r\n * @returns {{title: string, icon: string}}\r\n */\nfunction toolbox() {\n  return {\n    title: 'Toggle',\n    icon: 'toggleIcon'\n  };\n}\n\n/**\r\n * Disables the creation of new EditorJS blocks by pressing\r\n * 'enter' when in a toggle block.\r\n */\nfunction enableLineBreaks() {\n  return true;\n}\n\n/**\r\n * Notify core that the read-only mode is supported\r\n *\r\n * @returns {boolean}\r\n */\nfunction readOnlySupported() {\n  return true;\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/actions/actions.js?");

/***/ }),

/***/ "./src/blocks/getParents.js":
/*!**********************************!*\
  !*** ./src/blocks/getParents.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"extractBlock\": () => (/* binding */ extractBlock),\n/* harmony export */   \"findIndexOfParentBlock\": () => (/* binding */ findIndexOfParentBlock)\n/* harmony export */ });\n/**\r\n   * Extracts a nested block from a toggle\r\n   * with 'shift + tab' combination\r\n   *\r\n   * @param {number} entryIndex - Block's index that will be extracted\r\n   */\n\nfunction extractBlock(entryIndex) {\n  const block = this.getBlockByIndex(entryIndex);\n  const {\n    holder\n  } = block;\n  if (this.isAToggleItem(holder)) {\n    const fk = holder.getAttribute('foreignKey');\n    const parentIndex = this.findToggleRootIndex(entryIndex, fk);\n    if (parentIndex >= 0) {\n      const items = this.getDescendantsNumber(fk);\n      const destiny = parentIndex + items;\n      if (items > 1) {\n        this.api.blocks.move(destiny, entryIndex);\n      }\n      setTimeout(() => this.removeAttributesFromNewBlock(destiny), 200);\n    }\n  }\n  this.api.caret.setToBlock(entryIndex);\n  this.api.toolbar.close();\n}\n\n/**\r\n   * Returns the index of the root of the toggle which is at the same level of the toggle that it\r\n   * is expected to be moved\r\n   *\r\n   * fk of the toggle that is going to be moved\r\n   * @param {string} currentToggleFk\r\n   * @param {string} blockFk // fk of block which is above of the current toggle root\r\n   * @param {number} toggleInitialIndex // index of the root of the current toggle root\r\n   * @returns\r\n   */\n\nfunction findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {\n  const NestedToggleChildren = this.getDescendantsNumber(blockFk);\n  const parentBlockIndex = toggleInitialIndex - (NestedToggleChildren + 1);\n  const parentBlock = this.getBlockByIndex(parentBlockIndex).holder;\n  if (parentBlock.hasAttribute('foreignKey')) {\n    const parentBlockFk = parentBlock.getAttribute('foreignKey');\n    if (parentBlockFk !== currentToggleFk) {\n      const beforeBlock = this.getBlockByIndex(parentBlockIndex - 1).holder;\n      if (beforeBlock.hasAttribute('foreignKey')) {\n        const fk = beforeBlock.getAttribute('foreignKey');\n        if (fk !== parentBlockFk) {\n          return this.findIndexOfParentBlock(currentToggleFk, fk, parentBlockIndex);\n        }\n      }\n    }\n  }\n  return parentBlockIndex;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  extractBlock,\n  findIndexOfParentBlock\n});\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/getParents.js?");

/***/ }),

/***/ "./src/blocks/hideAndShowBlocks.js":
/*!*****************************************!*\
  !*** ./src/blocks/hideAndShowBlocks.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hideAndShowBlocks)\n/* harmony export */ });\n/**\r\n* Hides and shows the toggle paragraphs or the default content.\r\n* If the toggle status is closed, the added value to the hidden attribute\r\n* in the container paragraph is 'true', otherwise is 'false'.\r\n*\r\n* @param {number} index - toggle index\r\n*/\n\nfunction hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {\n  const children = document.querySelectorAll(`div[foreignKey=\"${foreignKey}\"]`);\n  const {\n    length\n  } = children;\n  if (length > 0) {\n    children.forEach(child => {\n      child.hidden = value === 'closed';\n\n      // Check if this child is a toggle and hide his children too\n      const toggles = child.querySelectorAll('.toggle-block__selector');\n      const isToggle = toggles.length > 0;\n      if (isToggle) {\n        const childValue = value === 'closed' ? value : child.getAttribute('status');\n        hideAndShowBlocks(toggles[0].getAttribute('id'), childValue);\n      }\n    });\n  } else if (foreignKey === this.wrapper.id) {\n    const {\n      lastChild\n    } = this.wrapper;\n    lastChild.classList.toggle('toggle-block__hidden', value);\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/hideAndShowBlocks.js?");

/***/ }),

/***/ "./src/blocks/removeBlockAndAttributes.js":
/*!************************************************!*\
  !*** ./src/blocks/removeBlockAndAttributes.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removeAttributesFromNewBlock\": () => (/* binding */ removeAttributesFromNewBlock),\n/* harmony export */   \"removeBlock\": () => (/* binding */ removeBlock)\n/* harmony export */ });\n/**\r\n   * When a nested block is removed, the 'items' attribute\r\n   * is updated, subtracting from it an unit.\r\n   * @param {string} id - block identifier\r\n   */\nfunction removeBlock(holder, id, cursorPosition) {\n  if (cursorPosition === 0) {\n    const position = this.itemsId.indexOf(id);\n    this.itemsId.splice(position, 1);\n  }\n}\n\n/**\r\n   * Removes all properties of a nested block.\r\n   *\r\n   * @param {number} destiny - block position\r\n   */\nfunction removeAttributesFromNewBlock(destiny) {\n  const newBlock = this.api.blocks.getBlockByIndex(destiny);\n  const {\n    holder\n  } = newBlock;\n  if (!this.itemsId.includes(newBlock.id)) {\n    const i = this.itemsId.indexOf(newBlock.id);\n    this.itemsId.splice(i, 1);\n  }\n  holder.removeAttribute('foreignKey');\n  holder.removeAttribute('id');\n  holder.onkeydown = {};\n  holder.onkeyup = {};\n  holder.classList.remove('toggle-block__item');\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/removeBlockAndAttributes.js?");

/***/ }),

/***/ "./src/blocks/resetIdToCopiedBlock.js":
/*!********************************************!*\
  !*** ./src/blocks/resetIdToCopiedBlock.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ resetIdToCopiedBlock)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n/**\r\n   * Reset the toggle ids to ensure toggles with unique id.\r\n   */\nfunction resetIdToCopiedBlock() {\n  if (this.wrapper !== undefined) {\n    const index = this.api.blocks.getCurrentBlockIndex();\n    const {\n      holder\n    } = this.api.blocks.getBlockByIndex(index);\n    if (this.isPartOfAToggle(holder)) {\n      const foreignKey = holder.getAttribute('foreignKey');\n      const toggleRoot = document.querySelectorAll(`#${foreignKey}`);\n      if (toggleRoot.length > 1) {\n        const parentBlock = this.findToggleRootIndex(index, foreignKey);\n        const id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        for (let i = parentBlock; i <= index; i += 1) {\n          const currentBlock = this.api.blocks.getBlockByIndex(i);\n          const {\n            holder: currentBlockHolder\n          } = currentBlock;\n          if (i === parentBlock) {\n            const externalCover = currentBlockHolder.firstChild;\n            const toggleCover = externalCover.firstChild;\n            toggleCover.setAttribute('id', `fk-${id}`);\n          } else {\n            currentBlockHolder.setAttribute('foreignKey', `fk-${id}`);\n          }\n        }\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/resetIdToCopiedBlock.js?");

/***/ }),

/***/ "./src/blocks/save.js":
/*!****************************!*\
  !*** ./src/blocks/save.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ save)\n/* harmony export */ });\n/**\r\n   * Extracts Tool's data from the view\r\n   * @param {HTMLDivElement} blockContent - Toggle tools rendered view\r\n   * @returns {ToggleBlockData} - saved data\r\n   */\nfunction save(blockContent) {\n  const id = blockContent.getAttribute('id');\n  const {\n    children\n  } = blockContent;\n  const caption = children[1].innerHTML;\n  const blocks = document.querySelectorAll(`div[foreignKey=\"${id}\"]`);\n  this.data.fk = id;\n  return Object.assign(this.data, {\n    text: caption,\n    items: blocks.length\n  });\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/save.js?");

/***/ }),

/***/ "./src/blocks/setAttributesToNewBlock.js":
/*!***********************************************!*\
  !*** ./src/blocks/setAttributesToNewBlock.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setAttributesToNewBlock)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n/**\r\n   * Gets the index of the new block, then assigns the required properties,\r\n   * and finally sends the focus.\r\n   */\n\nfunction setAttributesToNewBlock(entryIndex = null, foreignKey = this.wrapper.id, block = null) {\n  const index = entryIndex === null ? this.api.blocks.getCurrentBlockIndex() : entryIndex;\n  const newBlock = block || this.api.blocks.getBlockByIndex(index);\n  const id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  if (!this.itemsId.includes(newBlock.id)) {\n    this.itemsId.splice(index - 1, 0, newBlock.id);\n  }\n  const {\n    holder\n  } = newBlock;\n  const content = holder.firstChild;\n  const item = content.firstChild;\n  holder.setAttribute('foreignKey', foreignKey);\n  holder.setAttribute('id', id);\n  setTimeout(() => holder.classList.add('toggle-block__item'));\n  if (!this.readOnly) {\n    holder.onkeydown = this.setEventsToNestedBlock.bind(this);\n    item.focus();\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/blocks/setAttributesToNewBlock.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ToggleBlock)\n/* harmony export */ });\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _assets_toggleIcon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/toggleIcon.svg */ \"./assets/toggleIcon.svg\");\n/* harmony import */ var _assets_toggleIcon_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_toggleIcon_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _toggle_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toggle/actions */ \"./src/toggle/actions.js\");\n/* harmony import */ var _toggle_toggleBlockConstructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toggle/toggleBlockConstructor */ \"./src/toggle/toggleBlockConstructor.js\");\n/* harmony import */ var _toggle_createParagraphFromToggleRoot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggle/createParagraphFromToggleRoot */ \"./src/toggle/createParagraphFromToggleRoot.js\");\n/* harmony import */ var _blocks_setAttributesToNewBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/setAttributesToNewBlock */ \"./src/blocks/setAttributesToNewBlock.js\");\n/* harmony import */ var _blocks_getParents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/getParents */ \"./src/blocks/getParents.js\");\n/* harmony import */ var _blocks_hideAndShowBlocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blocks/hideAndShowBlocks */ \"./src/blocks/hideAndShowBlocks.js\");\n/* harmony import */ var _blocks_removeBlockAndAttributes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blocks/removeBlockAndAttributes */ \"./src/blocks/removeBlockAndAttributes.js\");\n/* harmony import */ var _blocks_resetIdToCopiedBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blocks/resetIdToCopiedBlock */ \"./src/blocks/resetIdToCopiedBlock.js\");\n/* harmony import */ var _blocks_save__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blocks/save */ \"./src/blocks/save.js\");\n/* harmony import */ var _movements_moveChildren__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./movements/moveChildren */ \"./src/movements/moveChildren.js\");\n/* harmony import */ var _movements_isChild__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./movements/isChild */ \"./src/movements/isChild.js\");\n/* harmony import */ var _movements_moveDescendants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./movements/moveDescendants */ \"./src/movements/moveDescendants.js\");\n/* harmony import */ var _movements_moveDown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./movements/moveDown */ \"./src/movements/moveDown.js\");\n/* harmony import */ var _movements_moveUp__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./movements/moveUp */ \"./src/movements/moveUp.js\");\n/* harmony import */ var _nest_nestBlock__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nest/nestBlock */ \"./src/nest/nestBlock.js\");\n/* harmony import */ var _nest_setEventsToNestedBlock__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nest/setEventsToNestedBlock */ \"./src/nest/setEventsToNestedBlock.js\");\n/* harmony import */ var _nest_setNestedBlockAttributes__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nest/setNestedBlockAttributes */ \"./src/nest/setNestedBlockAttributes.js\");\n/* harmony import */ var _render_render__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./render/render */ \"./src/render/render.js\");\n/* harmony import */ var _render_renderItems__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./render/renderItems */ \"./src/render/renderItems.js\");\n/* harmony import */ var _render_renderSettings__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./render/renderSettings */ \"./src/render/renderSettings.js\");\n/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./actions/actions */ \"./src/actions/actions.js\");\n\n\n\n// Toggle Imports\n\n\n\n\n// Block Imports\n\n// eslint-disable-next-line import/no-duplicates\n\n// eslint-disable-next-line import/no-duplicates\n\n\n\n\n\n\n// Movements Imports\n\n\n\n\n\n\n// Nest Imports\n\n\n\n\n// Render Imports\n\n\n\n\n\n/**\r\n * ToggleBlock for the Editor.js\r\n * Creates a toggle and paragraphs can be saved in it.\r\n * Requires no server-side uploader.\r\n *\r\n * @typedef {object} ToggleBlockData\r\n * @description Tool's input and output data format\r\n * @property {string} text - toggle text\r\n * @property {string} status - toggle status\r\n * @property {array} items - toggle paragraphs\r\n */\n\nclass ToggleBlock {\n  static get toolbox() {\n    return {\n      title: 'Toggle',\n      icon: (_assets_toggleIcon_svg__WEBPACK_IMPORTED_MODULE_1___default())\n    };\n  }\n  static enableLineBreaks = _actions_actions__WEBPACK_IMPORTED_MODULE_22__.enableLineBreaks;\n  static readOnlySupported = _actions_actions__WEBPACK_IMPORTED_MODULE_22__.readOnlySupported;\n  constructor(options) {\n    _toggle_toggleBlockConstructor__WEBPACK_IMPORTED_MODULE_3__[\"default\"].call(this, options);\n  }\n  isAToggleItem(holder) {\n    return (0,_toggle_actions__WEBPACK_IMPORTED_MODULE_2__.isAToggleItem)(holder);\n  }\n  isAToggleRoot(holder) {\n    return (0,_toggle_actions__WEBPACK_IMPORTED_MODULE_2__.isAToggleRoot)(holder);\n  }\n  createParagraphFromToggleRoot(e) {\n    return _toggle_createParagraphFromToggleRoot__WEBPACK_IMPORTED_MODULE_4__[\"default\"].call(this, e);\n  }\n  createParagraphFromIt() {\n    return this.setAttributesToNewBlock();\n  }\n  setAttributesToNewBlock(entryIndex = null, foreignKey = this.wrapper.id, block = null) {\n    return _blocks_setAttributesToNewBlock__WEBPACK_IMPORTED_MODULE_5__[\"default\"].call(this, entryIndex, foreignKey, block);\n  }\n  setEventsToNestedBlock(e) {\n    return _nest_setEventsToNestedBlock__WEBPACK_IMPORTED_MODULE_17__[\"default\"].call(this, e);\n  }\n  removeBlock(holder, id, cursorPosition) {\n    return _blocks_removeBlockAndAttributes__WEBPACK_IMPORTED_MODULE_8__.removeBlock.call(this, holder, id, cursorPosition);\n  }\n  removeAttributesFromNewBlock(destiny) {\n    return _blocks_removeBlockAndAttributes__WEBPACK_IMPORTED_MODULE_8__.removeAttributesFromNewBlock.call(this, destiny);\n  }\n\n  /**\r\n   * Creates a toggle block view without paragraphs\r\n   * and sets the default content.\r\n   */\n  createToggle() {\n    this.wrapper = document.createElement('div');\n    this.wrapper.classList.add('toggle-block__selector');\n    this.wrapper.id = this.data.fk;\n    const icon = document.createElement('span');\n    const input = document.createElement('div');\n    const defaultContent = document.createElement('div');\n    icon.classList.add('toggle-block__icon');\n    icon.innerHTML = (_assets_toggleIcon_svg__WEBPACK_IMPORTED_MODULE_1___default());\n    input.classList.add('toggle-block__input');\n    input.setAttribute('contentEditable', !this.readOnly);\n    input.innerHTML = this.data.text || '';\n\n    // Events\n    if (!this.readOnly) {\n      // Events to create other blocks and destroy the toggle\n      input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));\n      input.addEventListener('keydown', this.removeToggle.bind(this));\n\n      // Sets the focus at the end of the text when a nested block is deleted with the backspace key\n      input.addEventListener('focusin', () => this.setFocusToggleRootAtTheEnd());\n\n      // Establishes the placeholder for the toggle root when it's empty\n      input.addEventListener('keyup', this.setPlaceHolder.bind(this));\n      input.setAttribute('placeholder', this.placeholder);\n\n      // Calculates the number of toggle items\n      input.addEventListener('focus', this.setDefaultContent.bind(this));\n      input.addEventListener('focusout', this.setDefaultContent.bind(this));\n\n      // Event to add a block when the default content is clicked\n      defaultContent.addEventListener('click', this.clickInDefaultContent.bind(this));\n      input.addEventListener('focus', this.setNestedBlockAttributes.bind(this));\n    }\n    defaultContent.classList.add('toggle-block__content-default', 'toggle-block__hidden');\n    defaultContent.innerHTML = this.setDefaultContent;\n    this.wrapper.appendChild(icon);\n    this.wrapper.appendChild(input);\n    this.wrapper.appendChild(defaultContent);\n  }\n  setFocusToggleRootAtTheEnd() {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.setFocusToggleRootAtTheEnd.call(this);\n  }\n\n  /**\r\n   * Adds the actions to do when the default content is clicked.\r\n   */\n  clickInDefaultContent() {\n    return _actions_actions__WEBPACK_IMPORTED_MODULE_22__.clickInDefaultContent.call(this);\n  }\n\n  /**\r\n   * Sets the default content. If the toggle has no other blocks inside it,\r\n   * so sets the 'block__hidden tag' in the default content,\r\n   * otherwise it removes it.\r\n   */\n  setDefaultContent() {\n    const children = document.querySelectorAll(`div[foreignKey=\"${this.wrapper.id}\"]`);\n    const {\n      firstChild,\n      lastChild\n    } = this.wrapper;\n    const {\n      status\n    } = this.data;\n    const value = children.length > 0 || status === 'closed';\n    lastChild.classList.toggle('toggle-block__hidden', value);\n    firstChild.style.color = children.length === 0 ? 'gray' : 'black';\n  }\n\n  /**\r\n   * Deletes the toggle structure and converts the main text and the nested blocks\r\n   * in regular blocks.\r\n   *\r\n   * @param {KeyboardEvent} e - key down event\r\n   */\n  removeToggle(e) {\n    if (e.code === 'Backspace') {\n      const {\n        children\n      } = this.wrapper;\n      const content = children[1].innerHTML;\n      const cursorPosition = document.getSelection();\n      if (cursorPosition.focusOffset === 0) {\n        const index = this.api.blocks.getCurrentBlockIndex();\n        const breakLine = content.indexOf('<br>');\n        const end = breakLine === -1 ? content.length : breakLine;\n        const blocks = document.querySelectorAll(`div[foreignKey=\"${this.wrapper.id}\"]`);\n        for (let i = 1; i < blocks.length + 1; i += 1) {\n          this.removeAttributesFromNewBlock(index + i);\n        }\n        this.api.blocks.delete(index);\n        this.api.blocks.insert('paragraph', {\n          text: content.slice(0, end)\n        }, {}, index, 1);\n        this.api.caret.setToBlock(index);\n      }\n    }\n  }\n  findToggleRootIndex(entryIndex, fk) {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.findToggleRootIndex.call(this, entryIndex, fk);\n  }\n  extractBlock(entryIndex) {\n    return _blocks_getParents__WEBPACK_IMPORTED_MODULE_6__[\"default\"].call(this, entryIndex);\n  }\n  setPlaceHolder(e) {\n    return _actions_actions__WEBPACK_IMPORTED_MODULE_22__.setPlaceHolder.call(this, e);\n  }\n  render() {\n    return _render_render__WEBPACK_IMPORTED_MODULE_19__[\"default\"].call(this);\n  }\n  setInitialTransition() {\n    return _actions_actions__WEBPACK_IMPORTED_MODULE_22__.setInitialTransition.call(this);\n  }\n  renderItems() {\n    return _render_renderItems__WEBPACK_IMPORTED_MODULE_20__[\"default\"].call(this);\n  }\n  resolveToggleAction() {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.resolveToggleAction.call(this);\n  }\n  hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {\n    return _blocks_hideAndShowBlocks__WEBPACK_IMPORTED_MODULE_7__[\"default\"].call(this, foreignKey, value);\n  }\n  save(blockContent) {\n    return _blocks_save__WEBPACK_IMPORTED_MODULE_10__[\"default\"].call(this, blockContent);\n  }\n  getDescendantsNumber(fk) {\n    return _actions_actions__WEBPACK_IMPORTED_MODULE_22__.getDescendantsNumber.call(this, fk);\n  }\n  highlightToggleItems(fk) {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.highlightToggleItems.call(this, fk);\n  }\n  renderSettings() {\n    return _render_renderSettings__WEBPACK_IMPORTED_MODULE_21__[\"default\"].call(this);\n  }\n  addEventsMoveButtons(moveElement, movement, toggleIndex) {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.addEventsMoveButtons.call(this, moveElement, movement, toggleIndex);\n  }\n  addEventDeleteButton(deleteElement, toggleIndex) {\n    _actions_actions__WEBPACK_IMPORTED_MODULE_22__.addEventDeleteButton.call(this, deleteElement, toggleIndex);\n  }\n  moveToggle(toggleInitialIndex, direction) {\n    _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.moveToggle.call(this, toggleInitialIndex, direction);\n  }\n  moveDown(toggleInitialIndex, toggleEndIndex) {\n    return _movements_moveDown__WEBPACK_IMPORTED_MODULE_14__[\"default\"].call(this, toggleInitialIndex, toggleEndIndex);\n  }\n  moveUp(toggleInitialIndex, toggleEndIndex) {\n    return _movements_moveUp__WEBPACK_IMPORTED_MODULE_15__[\"default\"].call(this, toggleInitialIndex, toggleEndIndex);\n  }\n  findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {\n    return _blocks_getParents__WEBPACK_IMPORTED_MODULE_6__[\"default\"].call(this, currentToggleFk, blockFk, toggleInitialIndex);\n  }\n  moveDescendants(children, finalIndex, parentInitialIndex, direction) {\n    _movements_moveDescendants__WEBPACK_IMPORTED_MODULE_13__[\"default\"].call(this, children, finalIndex, parentInitialIndex, direction);\n  }\n  removeFullToggle(toggleIndex) {\n    _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.removeFullToggle.call(this, toggleIndex);\n  }\n  addListeners() {\n    _actions_actions__WEBPACK_IMPORTED_MODULE_22__.addListeners.call(this);\n  }\n\n  /**\r\n   * Adds mutation observer to restore the item attributes\r\n   * when the undo action is executed and they're lost.\r\n   */\n  addSupportForUndoAndRedoActions() {\n    if (!this.readOnly) {\n      const target = document.querySelector('div.codex-editor__redactor');\n      const observer = new MutationObserver(mutations => {\n        mutations.forEach(mutation => {\n          if (mutation.type === 'childList') {\n            setTimeout(this.restoreItemAttributes.bind(this, mutation));\n          }\n        });\n      });\n      const config = {\n        attributes: true,\n        childList: true,\n        characterData: true\n      };\n      observer.observe(target, config);\n    }\n  }\n  getIndex = target => Array.from(target.parentNode.children).indexOf(target);\n  isChild(parentID, targetFK) {\n    return _movements_isChild__WEBPACK_IMPORTED_MODULE_12__[\"default\"].call(this, parentID, targetFK);\n  }\n\n  /**\r\n   * Adds drop listener to move the childs item\r\n   * when the drag and drop action is executed.\r\n   */\n  addSupportForDragAndDropActions() {\n    if (!this.readOnly) {\n      if (this.wrapper === undefined) {\n        setTimeout(() => this.addSupportForDragAndDropActions(), 250);\n        return;\n      }\n\n      // Set status in attribute to a proper hide and show\n      const toggleBlock = document.querySelector(`#${this.wrapper.id}`).parentNode.parentNode;\n      toggleBlock.setAttribute('status', this.data.status);\n      const settingsButton = document.querySelector('.ce-toolbar__settings-btn');\n      settingsButton.setAttribute('draggable', 'true');\n      settingsButton.addEventListener('dragstart', () => {\n        this.startBlock = this.api.blocks.getCurrentBlockIndex();\n        this.nameDragged = this.api.blocks.getBlockByIndex(this.startBlock).name;\n        this.holderDragged = this.api.blocks.getBlockByIndex(this.startBlock).holder;\n      });\n      document.addEventListener('drop', event => {\n        // Get the position when item was dropped\n        const {\n          target\n        } = event;\n        if (document.contains(target)) {\n          const dropTarget = target.classList.contains('ce-block') ? target : target.closest('.ce-block');\n          if (dropTarget && dropTarget !== this.holderDragged) {\n            let endBlock = this.getIndex(dropTarget);\n\n            // Control the toggle's children will be positioned down of the parent\n            endBlock = this.startBlock < endBlock ? endBlock + 1 : endBlock;\n\n            // Check if the item dropped is another toggle\n            const isTargetAToggle = dropTarget.querySelectorAll('.toggle-block__selector').length > 0 || dropTarget.getAttribute('foreignKey') !== null;\n            setTimeout(() => {\n              // Verify if the item dropped is the toggle\n              if (this.nameDragged === 'toggle') {\n                // Verify if the toggle dropped is the same of this eventListener\n                const currentToggleDropped = this.holderDragged.querySelector(`#${this.wrapper.id}`);\n                if (currentToggleDropped) {\n                  // Check if the toggle dropped was not dropped in its children\n                  if (!this.isChild(currentToggleDropped.getAttribute('id'), dropTarget.getAttribute('foreignKey'))) {\n                    // If is a toggle we have to add the attributes to make it a part of the toggle\n                    this.assignToggleItemAttributes(isTargetAToggle, dropTarget);\n                    this.moveChildren(endBlock);\n                  } else {\n                    // If we are dropping in the toggle children,\n                    // we have to move the toggle in the original position\n                    if (this.startBlock === endBlock) {\n                      this.api.blocks.move(this.startBlock + 1, endBlock);\n                    } else {\n                      this.api.blocks.move(this.startBlock, endBlock);\n                    }\n\n                    // And remove the attributes\n                    if (!isTargetAToggle) {\n                      const newToggleIndex = this.getIndex(this.holderDragged);\n                      this.removeAttributesFromNewBlock(newToggleIndex);\n                    }\n                  }\n                }\n              } else if (this.nameDragged) {\n                // Add the dropped item as an element of the toggle\n                this.assignToggleItemAttributes(isTargetAToggle, dropTarget);\n              }\n\n              // If we are dropping out of a toggle we have to remove the attributes\n              if (!isTargetAToggle) {\n                const newToggleIndex = this.getIndex(this.holderDragged);\n                this.removeAttributesFromNewBlock(newToggleIndex);\n              }\n            });\n          }\n        }\n      });\n    }\n  }\n  assignToggleItemAttributes(isTargetAToggle, dropTarget) {\n    _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.assignToggleItemAttributes.call(this, isTargetAToggle, dropTarget);\n  }\n  moveChildren(endBlock, fk = this.wrapper.id) {\n    _movements_moveChildren__WEBPACK_IMPORTED_MODULE_11__[\"default\"].call(this, endBlock, fk);\n  }\n  restoreItemAttributes(mutation) {\n    _actions_actions__WEBPACK_IMPORTED_MODULE_22__.restoreItemAttributes.call(this, mutation);\n  }\n\n  /**\r\n   * Creates a toggle through the '>' char and the 'Space' key\r\n   */\n  createToggleWithShortcut(blockContainer) {\n    const content = blockContainer.textContent;\n    if (content[0] === '>' && !this.isPartOfAToggle(blockContainer)) {\n      const blockCaller = this.api.blocks.getCurrentBlockIndex();\n      this.api.blocks.insert('toggle', {\n        text: content.slice(2)\n      }, this.api, blockCaller, true);\n      this.api.blocks.delete(blockCaller + 1);\n      this.api.caret.setToBlock(blockCaller);\n    }\n  }\n  nestBlock(blockContainer) {\n    _nest_nestBlock__WEBPACK_IMPORTED_MODULE_16__[\"default\"].call(this, blockContainer);\n  }\n  setNestedBlockAttributes() {\n    _nest_setNestedBlockAttributes__WEBPACK_IMPORTED_MODULE_18__[\"default\"].call(this);\n  }\n  isPartOfAToggle(block) {\n    return _toggle_actions__WEBPACK_IMPORTED_MODULE_2__.isPartOfAToggle.call(this, block);\n  }\n\n  /**\r\n   * Adds mutation observer to reset the toggle ids\r\n   * when a toggle is copied and pasted.\r\n   */\n  addSupportForCopyAndPasteAction() {\n    _actions_actions__WEBPACK_IMPORTED_MODULE_22__.addSupportForCopyAndPasteAction.call(this);\n  }\n  resetIdToCopiedBlock() {\n    _blocks_resetIdToCopiedBlock__WEBPACK_IMPORTED_MODULE_9__[\"default\"].call(this);\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/index.js?");

/***/ }),

/***/ "./src/movements/isChild.js":
/*!**********************************!*\
  !*** ./src/movements/isChild.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isChild)\n/* harmony export */ });\n/**\r\n   * Checks if target is a child of a toggle\r\n   * @param {string} parentID id of the parent element\r\n   * @param {string} targetFK foreign key of the target element\r\n   * @returns {boolean}\r\n   */\nfunction isChild(parentID, targetFK) {\n  if (!parentID || !targetFK) return false; // No parent or no target\n  if (parentID === targetFK) return true; // Direct child of the toggle\n\n  return [...document.querySelectorAll(`div[foreignKey=\"${parentID}\"]`)].some(child => {\n    const toggle = child.querySelector('.toggle-block__selector');\n    if (!toggle) return false;\n    return this.isChild(toggle.getAttribute('id'), targetFK);\n  });\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/movements/isChild.js?");

/***/ }),

/***/ "./src/movements/moveChildren.js":
/*!***************************************!*\
  !*** ./src/movements/moveChildren.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ moveChildren)\n/* harmony export */ });\nfunction moveChildren(endBlock, fk = this.wrapper.id) {\n  // Get the children of the dropped toggle\n  let children = document.querySelectorAll(`div[foreignKey=\"${fk}\"]`);\n\n  // Move all the children to the parent position\n  children = this.startBlock >= endBlock ? [...children].reverse() : children;\n  children.forEach(child => {\n    const childIndex = this.getIndex(child);\n    this.api.blocks.move(endBlock, childIndex);\n\n    // If this child is a toggle we have to move his children too\n    const toggles = child.querySelectorAll('.toggle-block__selector');\n    const isToggle = toggles.length > 0;\n    if (isToggle) {\n      const toggleIndex = this.getIndex(child);\n      const fix = this.startBlock < endBlock ? 0 : 1;\n      toggles.forEach(toggle => moveChildren(toggleIndex + fix, toggle.getAttribute('id')));\n      const dif = Math.abs(endBlock - toggleIndex);\n      endBlock = this.startBlock < endBlock ? endBlock + dif : endBlock - dif;\n    }\n  });\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/movements/moveChildren.js?");

/***/ }),

/***/ "./src/movements/moveDescendants.js":
/*!******************************************!*\
  !*** ./src/movements/moveDescendants.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ moveDescendants)\n/* harmony export */ });\n/**\r\n   * Move all the children of the toggle that is being moved\r\n   * @param {number} children // Number of children of the current toggle\r\n   * @param {number} finalIndex // index to calculate where children are going to be moved\r\n   * @param {number} parentInitialIndex // index to calculate where the children are\r\n   * @param {number} direction // 0: to move from top to bottom || 1: to move from bottom to the top\r\n   */\nfunction moveDescendants(children, finalIndex, parentInitialIndex, direction) {\n  let childrenCurrentPosition = parentInitialIndex;\n  let childrenFinalPosition = finalIndex;\n  while (children) {\n    this.move(childrenFinalPosition, childrenCurrentPosition);\n    if (direction === 0) {\n      childrenCurrentPosition += 1;\n      childrenFinalPosition += 1;\n    }\n    children -= 1;\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/movements/moveDescendants.js?");

/***/ }),

/***/ "./src/movements/moveDown.js":
/*!***********************************!*\
  !*** ./src/movements/moveDown.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ moveDown)\n/* harmony export */ });\n/**\r\n   * Move down the whole current toggle to the next corresponding position\r\n   * @param {number} toggleInitialIndex // index of the root of the current toggle\r\n   * @param {number} toggleEndIndex // index of the last child of the current toggle\r\n   */\nfunction moveDown(toggleInitialIndex, toggleEndIndex) {\n  const blockAfterToggleIndex = toggleEndIndex + 1;\n  const blockAfterToggle = this.getBlockByIndex(blockAfterToggleIndex);\n  const {\n    holder\n  } = blockAfterToggle;\n  this.move(toggleInitialIndex, blockAfterToggleIndex);\n\n  // Evaluate if the block is a toggle to move its children\n  if (blockAfterToggle.name === 'toggle') {\n    const id = holder.querySelector('.toggle-block__selector').getAttribute('id');\n    const children = this.getDescendantsNumber(id);\n    this.moveDescendants(children, toggleInitialIndex + 1, blockAfterToggleIndex + 1, 0);\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/movements/moveDown.js?");

/***/ }),

/***/ "./src/movements/moveUp.js":
/*!*********************************!*\
  !*** ./src/movements/moveUp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ moveUp)\n/* harmony export */ });\n/**\r\n   * Move up the whole current toggle to the next corresponding position\r\n   * @param {number} toggleInitialIndex // index of the root of the current toggle\r\n   * @param {number} toggleEndIndex // index of the last child of the current toggle\r\n   */\nfunction moveUp(toggleInitialIndex, toggleEndIndex) {\n  const blockBeforeToggleIndex = toggleInitialIndex - 1;\n  const blockBeforeToggle = this.getBlockByIndex(blockBeforeToggleIndex);\n  if (blockBeforeToggle.name === 'toggle') {\n    return;\n  }\n  const {\n    holder\n  } = blockBeforeToggle;\n  // Evaluate if the block is an item of a toggle to move the whole parent toggle\n  if (holder.hasAttribute('foreignKey')) {\n    const currentToggle = this.getBlockByIndex(toggleInitialIndex).holder;\n    const currentToggleFk = currentToggle.getAttribute('foreignKey');\n    const fk = holder.getAttribute('foreignKey');\n    if (fk !== currentToggleFk) {\n      const parentBlockIdx = this.findIndexOfParentBlock(currentToggleFk, fk, toggleInitialIndex);\n      const parentBlock = this.getBlockByIndex(parentBlockIdx).holder;\n      const id = parentBlock.querySelector('.toggle-block__selector').getAttribute('id');\n      const children = this.getDescendantsNumber(id);\n      this.move(toggleEndIndex, parentBlockIdx);\n      this.moveDescendants(children, toggleEndIndex, parentBlockIdx, 1);\n      return;\n    }\n  }\n  this.move(toggleEndIndex, blockBeforeToggleIndex);\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/movements/moveUp.js?");

/***/ }),

/***/ "./src/nest/nestBlock.js":
/*!*******************************!*\
  !*** ./src/nest/nestBlock.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ nestBlock)\n/* harmony export */ });\n/**\r\n   * Nests a block inside a toggle through the 'Tab' key\r\n   */\nfunction nestBlock(blockContainer) {\n  const previousBlock = blockContainer.previousElementSibling;\n  const previousCover = previousBlock.firstChild;\n  const previousContainer = previousCover.firstChild;\n  if (this.isPartOfAToggle(previousContainer) || this.isPartOfAToggle(previousBlock)) {\n    const foreignId = previousBlock.getAttribute('foreignKey');\n    const toggleId = previousContainer.getAttribute('id');\n    const foreignKey = foreignId || toggleId;\n    blockContainer.setAttribute('will-be-a-nested-block', true);\n    const toggleRoot = document.getElementById(foreignKey);\n    toggleRoot.children[1].focus();\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/nest/nestBlock.js?");

/***/ }),

/***/ "./src/nest/setEventsToNestedBlock.js":
/*!********************************************!*\
  !*** ./src/nest/setEventsToNestedBlock.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setEventsToNestedBlock)\n/* harmony export */ });\n/**\r\n   * Sets the events to be listened through the holder\r\n   * in a nested block.\r\n   *\r\n   * @param {KeyboardEvent} e - key down event\r\n   */\nfunction setEventsToNestedBlock(e) {\n  if (e.code === 'Enter') {\n    setTimeout(() => this.createParagraphFromIt());\n  } else {\n    const indexBlock = this.getCurrentBlockIndex();\n    const nestedBlock = this.getBlockByIndex(indexBlock);\n    const {\n      holder\n    } = nestedBlock;\n    if (e.code === 'Tab' && e.shiftKey) {\n      this.extractBlock(indexBlock);\n    }\n    if (e.code === 'Backspace') {\n      const cursorPosition = document.getSelection().focusOffset;\n      this.removeBlock(holder, nestedBlock.id, cursorPosition);\n    }\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/nest/setEventsToNestedBlock.js?");

/***/ }),

/***/ "./src/nest/setNestedBlockAttributes.js":
/*!**********************************************!*\
  !*** ./src/nest/setNestedBlockAttributes.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setNestedBlockAttributes)\n/* harmony export */ });\n/**\r\n   * Sets the required attributes to convert an external block\r\n   * of the toggle into a block inside the toggle.\r\n   */\nfunction setNestedBlockAttributes() {\n  const blockIndex = this.api.blocks.getCurrentBlockIndex();\n  const block = this.api.blocks.getBlockByIndex(blockIndex);\n  const {\n    holder\n  } = block;\n  const willBeABlock = holder.getAttribute('will-be-a-nested-block');\n  if (willBeABlock) {\n    holder.removeAttribute('will-be-a-nested-block');\n    this.setAttributesToNewBlock(blockIndex);\n    this.api.toolbar.close();\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/nest/setNestedBlockAttributes.js?");

/***/ }),

/***/ "./src/render/render.js":
/*!******************************!*\
  !*** ./src/render/render.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\n/**\r\n   * Renders Tool's view.\r\n   * First renders the toggle root, and immediately\r\n   * renders its items as new blocks under the root.\r\n   *\r\n   * @returns {HTMLDivElement}\r\n   */\nfunction render() {\n  this.createToggle();\n\n  // Renders the nested blocks after the toggle root is rendered\n  setTimeout(() => this.renderItems());\n\n  // Adds initial transition for the icon\n  setTimeout(() => this.setInitialTransition());\n  return this.wrapper;\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/render/render.js?");

/***/ }),

/***/ "./src/render/renderItems.js":
/*!***********************************!*\
  !*** ./src/render/renderItems.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderItems)\n/* harmony export */ });\n/**\r\n   * Renders the items view and assigns the properties required to look\r\n   * like a block inside the toggle.\r\n   */\nfunction renderItems() {\n  const blocksInEditor = this.api.blocks.getBlocksCount();\n  const icon = this.wrapper.firstChild;\n  let toggleRoot;\n  if (this.readOnly) {\n    const redactor = document.getElementsByClassName('codex-editor__redactor')[0];\n    const {\n      children\n    } = redactor;\n    const {\n      length\n    } = children;\n    for (let i = 0; i < length; i += 1) {\n      const blockCover = children[i].firstChild;\n      const blockContainer = blockCover.firstChild;\n      const {\n        id\n      } = blockContainer;\n      if (id === this.wrapper.id) {\n        toggleRoot = i;\n        break;\n      }\n    }\n  } else {\n    const toggle = this.wrapper.children[1];\n    let currentBlock = {};\n    let index = this.api.blocks.getCurrentBlockIndex();\n    const delta = index === blocksInEditor - 1 ? -1 : 1;\n    while (currentBlock[1] !== toggle) {\n      toggleRoot = index;\n      const block = this.api.blocks.getBlockByIndex(toggleRoot);\n      if (!block) break;\n      const {\n        holder\n      } = block;\n      const blockCover = holder.firstChild;\n      const blockContent = blockCover.firstChild;\n      currentBlock = blockContent.children;\n      index += delta;\n    }\n  }\n  if (toggleRoot + this.data.items < blocksInEditor) {\n    for (let i = toggleRoot + 1, j = 0; i <= toggleRoot + this.data.items; i += 1) {\n      const block = this.api.blocks.getBlockByIndex(i);\n      const {\n        holder\n      } = block;\n      const cover = holder.firstChild;\n      const content = cover.firstChild;\n      if (!this.isPartOfAToggle(content)) {\n        this.setAttributesToNewBlock(i);\n        j += 1;\n      } else {\n        this.data.items = j;\n        break;\n      }\n    }\n  } else {\n    this.data.items = 0;\n  }\n  icon.addEventListener('click', () => {\n    this.resolveToggleAction();\n    setTimeout(() => {\n      this.hideAndShowBlocks();\n    });\n  });\n  this.hideAndShowBlocks();\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/render/renderItems.js?");

/***/ }),

/***/ "./src/render/renderSettings.js":
/*!**************************************!*\
  !*** ./src/render/renderSettings.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderSettings)\n/* harmony export */ });\n/**\r\n   * Adds events for the move up, move down and delete options in the toolbar\r\n   */\nfunction renderSettings() {\n  const settingsBar = document.getElementsByClassName('ce-settings');\n  const optionsContainer = settingsBar[0];\n  setTimeout(() => {\n    const options = optionsContainer.lastChild;\n    const toggleIndex = this.api.blocks.getCurrentBlockIndex();\n    this.highlightToggleItems(this.wrapper.id);\n    const moveUpElement = options.querySelector('[data-item-name=\"move-up\"]') || options.getElementsByClassName('ce-tune-move-up')[0];\n    const moveDownElement = options.querySelector('[data-item-name=\"move-down\"]') || options.getElementsByClassName('ce-tune-move-down')[0];\n    const deleteElement = options.querySelector('[data-item-name=\"delete\"]') || options.getElementsByClassName('ce-settings__button--delete')[0];\n    this.addEventsMoveButtons(moveDownElement, 0, toggleIndex);\n    this.addEventsMoveButtons(moveUpElement, 1, toggleIndex);\n    this.addEventDeleteButton(deleteElement, toggleIndex);\n  });\n  return document.createElement('div');\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/render/renderSettings.js?");

/***/ }),

/***/ "./src/toggle/actions.js":
/*!*******************************!*\
  !*** ./src/toggle/actions.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addEventsMoveButtons\": () => (/* binding */ addEventsMoveButtons),\n/* harmony export */   \"addSupportForCopyAndPasteAction\": () => (/* binding */ addSupportForCopyAndPasteAction),\n/* harmony export */   \"assignToggleItemAttributes\": () => (/* binding */ assignToggleItemAttributes),\n/* harmony export */   \"findToggleRootIndex\": () => (/* binding */ findToggleRootIndex),\n/* harmony export */   \"highlightToggleItems\": () => (/* binding */ highlightToggleItems),\n/* harmony export */   \"isAToggleItem\": () => (/* binding */ isAToggleItem),\n/* harmony export */   \"isAToggleRoot\": () => (/* binding */ isAToggleRoot),\n/* harmony export */   \"isPartOfAToggle\": () => (/* binding */ isPartOfAToggle),\n/* harmony export */   \"moveToggle\": () => (/* binding */ moveToggle),\n/* harmony export */   \"removeFullToggle\": () => (/* binding */ removeFullToggle),\n/* harmony export */   \"resolveToggleAction\": () => (/* binding */ resolveToggleAction),\n/* harmony export */   \"setFocusToggleRootAtTheEnd\": () => (/* binding */ setFocusToggleRootAtTheEnd)\n/* harmony export */ });\n/* harmony import */ var _blocks_resetIdToCopiedBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blocks/resetIdToCopiedBlock */ \"./src/blocks/resetIdToCopiedBlock.js\");\n\n/**\r\n * Returns true if the div element is a toggle child, otherwise, returns false\r\n * @param {HTMLDivElement} holder\r\n * @returns {boolean}\r\n */\nfunction isAToggleItem(holder) {\n  return holder.classList.contains('toggle-block__item');\n}\n\n/**\r\n * Returns true if the div element is a toggle root, otherwise, returns false\r\n * @param {HTMLDivElement} holder\r\n * @returns {boolean}\r\n */\nfunction isAToggleRoot(holder) {\n  return holder.classList.contains('toggle-block__selector') || Boolean(holder.querySelector('.toggle-block__selector'));\n}\n\n/**\r\n * Sets the focus at the end of the toggle root when\r\n * a nested block is deleted through the backspace key.\r\n */\nfunction setFocusToggleRootAtTheEnd() {\n  const toggle = document.activeElement;\n  const selection = window.getSelection();\n  const range = document.createRange();\n  selection.removeAllRanges();\n  range.selectNodeContents(toggle);\n  range.collapse(false);\n  selection.addRange(range);\n  toggle.focus();\n}\n\n/**\r\n * Converts the toggle status to its opposite.\r\n * @returns {string} icon - toggle icon\r\n */\nfunction resolveToggleAction() {\n  const icon = this.wrapper.firstChild;\n  const svg = icon.firstChild;\n  this.data.status = this.data.status === 'closed' ? 'open' : 'closed';\n  svg.style.transform = this.data.status === 'open' ? 'rotate(90deg)' : 'rotate(0deg)';\n  const toggleBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());\n  toggleBlock.holder.setAttribute('status', this.data.status);\n}\nfunction assignToggleItemAttributes(isTargetAToggle, dropTarget) {\n  if (isTargetAToggle) {\n    const foreignKey = dropTarget.getAttribute('foreignKey') || dropTarget.querySelector('.toggle-block__selector').getAttribute('id');\n    const newToggleIndex = this.getIndex(this.holderDragged);\n    this.setAttributesToNewBlock(newToggleIndex, foreignKey);\n  }\n}\n\n/**\r\n * Returns the toggle's root index, given the index of one of its children\r\n * @param {number} entryIndex - block index\r\n * @param {String} fk - The block's foreign key\r\n * @returns {number} The Toggle's root index\r\n */\nfunction findToggleRootIndex(entryIndex, fk) {\n  const block = this.getBlockByIndex(entryIndex);\n  const {\n    holder\n  } = block;\n  if (this.isAToggleRoot(holder)) {\n    const id = holder.querySelector('.toggle-block__selector').getAttribute('id');\n    if (fk === id) return entryIndex;\n  }\n  return entryIndex - 1 >= 0 ? this.findToggleRootIndex(entryIndex - 1, fk) : -1;\n}\n\n/**\r\n * Highlight the blocks that belong to the Toggle\r\n * @param {string} fk - The id of the root Toggle\r\n */\nfunction highlightToggleItems(fk) {\n  const listChildren = document.querySelectorAll(`div[foreignKey=\"${fk}\"]`);\n  listChildren.forEach(child => {\n    child.classList.add('ce-block--selected');\n    if (child.hasAttribute('status')) {\n      const childId = child.querySelector('.toggle-block__selector').getAttribute('id');\n      this.highlightToggleItems(childId);\n    }\n  });\n}\n\n/**\r\n * Validates if a block contains one of the classes to be part of a toggle.\r\n * @param {HTMLDivElement} block - Block to be validated\r\n * @returns {boolean}\r\n */\nfunction isPartOfAToggle(block) {\n  const classNamesToCheck = ['toggle-block__item', 'toggle-block__input', 'toggle-block__selector'];\n  const isToggleChild = classNamesToCheck.some(className => block.getElementsByClassName(className).length !== 0);\n  const isToggle = classNamesToCheck.some(className => block.classList.contains(className));\n  return isToggle || isToggleChild;\n}\n\n/**\r\n * Add listener to move button.\r\n * @param {HTMLDivElement} moveElement\r\n * @param {number} movement // 0: Move down || 1: Move up\r\n * @param {number} toggleIndex\r\n */\nfunction addEventsMoveButtons(moveElement, movement, toggleIndex) {\n  if (!moveElement) return;\n  moveElement.addEventListener('click', () => this.moveToggle(toggleIndex, movement));\n}\n\n/**\r\n * Move the toggle in the given direction.\r\n * @param {number} toggleInitialIndex\r\n * @param {number} direction\r\n */\nfunction moveToggle(toggleInitialIndex, direction) {\n  if (!this.readOnly) {\n    this.close();\n    const currentToggleIndex = this.getCurrentBlockIndex();\n    const descendants = this.getDescendantsNumber(this.wrapper.id);\n    const blocks = this.getBlocksCount();\n    const toggleEndIndex = toggleInitialIndex + descendants;\n    this.move(toggleInitialIndex, currentToggleIndex);\n    if (toggleInitialIndex >= 0 && toggleEndIndex <= blocks - 1) {\n      // eslint-disable-next-line no-unused-expressions\n      direction === 0 ? this.moveDown(toggleInitialIndex, toggleEndIndex) : this.moveUp(toggleInitialIndex, toggleEndIndex);\n    }\n  }\n}\n\n/**\r\n * Delete the toggle and all its children.\r\n * @param {number} toggleIndex\r\n */\nfunction removeFullToggle(toggleIndex) {\n  const children = document.querySelectorAll(`div[foreignKey=\"${this.wrapper.id}\"]`);\n  const {\n    length\n  } = children;\n\n  // eslint-disable-next-line no-plusplus\n  for (let i = toggleIndex; i < toggleIndex + length; i++) {\n    setTimeout(() => this.api.blocks.delete(toggleIndex));\n  }\n}\n\n/**\r\n * Adds mutation observer to reset the toggle ids when a toggle is copied and pasted.\r\n */\nfunction addSupportForCopyAndPasteAction() {\n  if (!this.readOnly) {\n    const target = document.querySelector('div.codex-editor__redactor');\n    const observer = new MutationObserver(mutations => {\n      mutations.forEach(mutation => {\n        if (mutation.type === 'childList') {\n          setTimeout(_blocks_resetIdToCopiedBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bind(this, mutation));\n        }\n      });\n    });\n    observer.observe(target, {\n      attributes: true,\n      childList: true,\n      characterData: true\n    });\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/toggle/actions.js?");

/***/ }),

/***/ "./src/toggle/createParagraphFromToggleRoot.js":
/*!*****************************************************!*\
  !*** ./src/toggle/createParagraphFromToggleRoot.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createParagraphFromToggleRoot)\n/* harmony export */ });\n// /toggle/createParagraphFromToggleRoot.js\n/**\r\n * First it gets the toggle index.\r\n *\r\n * After checks the toggle status, if this is 'closed' then open it.\r\n *\r\n * After inserts a new block after the toggle index and the a method\r\n * is called to add the required properties to the new block.\r\n * gets the focus.\r\n *\r\n * @param {KeyboardEvent} e - key up event\r\n */\nfunction createParagraphFromToggleRoot(e) {\n  if (e.code === 'Enter') {\n    const currentPosition = document.getSelection().focusOffset;\n    const originalIndex = this.api.blocks.getCurrentBlockIndex();\n    const block = this.api.blocks.getBlockByIndex(originalIndex);\n    const {\n      holder\n    } = block;\n    const blockCover = holder.firstChild;\n    const blockContent = blockCover.firstChild;\n    const content = blockContent.children[1].innerHTML;\n    const breakLine = content.indexOf('<br>');\n    const end = breakLine === -1 ? content.length : breakLine;\n    if (this.data.status === 'closed') {\n      this.resolveToggleAction();\n      this.hideAndShowBlocks();\n    }\n    const newText = content.slice(end + 4, currentPosition.focusOffset);\n    blockContent.children[1].innerHTML = content.slice(currentPosition.focusOffset, end);\n    this.api.blocks.insert('paragraph', {\n      text: newText\n    }, {}, originalIndex + 1, 1);\n    this.setAttributesToNewBlock();\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/toggle/createParagraphFromToggleRoot.js?");

/***/ }),

/***/ "./src/toggle/removeFullToggle.js":
/*!****************************************!*\
  !*** ./src/toggle/removeFullToggle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ removeFullToggle)\n/* harmony export */ });\n/**\r\n * Removes a toggle root and its nested blocks.\r\n *\r\n * @param {number} toggleIndex - toggle index\r\n */\nfunction removeFullToggle(toggleIndex) {\n  const children = document.querySelectorAll(`div[foreignKey=\"${this.wrapper.id}\"]`);\n  const {\n    length\n  } = children;\n  for (let i = toggleIndex; i < toggleIndex + length; i += 1) {\n    setTimeout(() => this.api.blocks.delete(toggleIndex));\n  }\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/toggle/removeFullToggle.js?");

/***/ }),

/***/ "./src/toggle/toggleBlockConstructor.js":
/*!**********************************************!*\
  !*** ./src/toggle/toggleBlockConstructor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toggleBlockConstructor)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n/**\r\n * Render tool`s main Element and fill it with saved data\r\n *\r\n * @param {{data: object, api: object}}\r\n * data - Previously saved data\r\n * api - Editor.js API\r\n * readOnly - read-only mode status\r\n */\nfunction toggleBlockConstructor({\n  data,\n  api,\n  readOnly,\n  config\n}) {\n  this.data = {\n    text: data.text || '',\n    status: data.status || 'open',\n    fk: data.fk || `fk-${(0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()}`,\n    items: data.items || 0\n  };\n  this.itemsId = [];\n  this.api = api;\n  const {\n    toolbar: {\n      close\n    },\n    blocks: {\n      getCurrentBlockIndex,\n      getBlockByIndex,\n      getBlocksCount,\n      move\n    }\n  } = this.api;\n  this.close = close;\n  this.getCurrentBlockIndex = getCurrentBlockIndex;\n  this.getBlocksCount = getBlocksCount;\n  this.getBlockByIndex = getBlockByIndex;\n  this.move = move;\n  this.wrapper = undefined;\n  this.readOnly = readOnly || false;\n  this.placeholder = config?.placeholder ?? 'Toggle';\n  this.defaultContent = config?.defaultContent ?? 'Empty toggle. Click or drop blocks inside.';\n  this.addListeners();\n  this.addSupportForUndoAndRedoActions();\n  this.addSupportForDragAndDropActions();\n  this.addSupportForCopyAndPasteAction();\n}\n\n//# sourceURL=webpack://ToggleBlock/./src/toggle/toggleBlockConstructor.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".toggle-block__selector > div {\\r\\n  vertical-align: middle;\\r\\n  display: inline-block;\\r\\n  padding: 1% 0 1% 0;\\r\\n  outline: none;\\r\\n  border: none;\\r\\n  width: 90%;\\r\\n}\\r\\n\\r\\n.toggle-block__selector br {\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.toggle-block__icon > svg {\\r\\n  vertical-align: middle;\\r\\n  width: 15px;\\r\\n  height: auto;\\r\\n}\\r\\n\\r\\n.toggle-block__icon:hover {\\r\\n  color: #388ae5;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.bi-play-fill {\\r\\n  width: 34px;\\r\\n  height: 34px;\\r\\n}\\r\\n\\r\\n.toggle-block__input {\\r\\n  margin-left: 5px;\\r\\n}\\r\\n\\r\\n.toggle-block__input:empty:before {\\r\\n  content: attr(placeholder);\\r\\n  color: gray;\\r\\n  background-color: transparent;\\r\\n}\\r\\n\\r\\n.toggle-block__content-default {\\r\\n  margin-left: 20px;\\r\\n}\\r\\n\\r\\n.toggle-block__item {\\r\\n  margin-left: 39px;\\r\\n}\\r\\n\\r\\n.toggle-block__content-default {\\r\\n  color: gray;\\r\\n  border-radius: 5px;\\r\\n}\\r\\n\\r\\n.toggle-block__content-default:hover {\\r\\n  cursor: pointer;\\r\\n  background: rgba(55, 53, 47, 0.08);\\r\\n}\\r\\n\\r\\ndiv.toggle-block__hidden {\\r\\n  display: none;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://ToggleBlock/./src/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://ToggleBlock/./src/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./assets/toggleIcon.svg":
/*!*******************************!*\
  !*** ./assets/toggleIcon.svg ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" class=\\\"bi bi-play-fill\\\" viewBox=\\\"0 0 16 16\\\"><path d=\\\"m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z\\\"></path></svg>\"\n\n//# sourceURL=webpack://ToggleBlock/./assets/toggleIcon.svg?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID\n});\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"unsafeStringify\": () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\n\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\n\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://ToggleBlock/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});