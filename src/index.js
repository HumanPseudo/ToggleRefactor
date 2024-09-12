import "./index.css";
import toggleIcon from "../assets/toggleIcon.svg";
import { toolbox, enableLineBreaks, readOnlySupported } from "./actions";
// Toggle Imports
// ToDo : createToggle and removeFullToggle
import { toggleBlockConstructor } from "./toggle/toggleBlockConstructor";
import { isAToggleItem, isAToggleRoot, setFocusToggleRootAtTheEnd, resolveToggleAction, assignToggleItemAttributes, findToggleRootIndex, highlightToggleItems, isPartOfAToggle } from "./toggle/actions";
import { createParagraphFromToggleRoot } from "./toggle/createParagraphFromToggleRoot";
import { moveToggle } from './toggle/moveToggle';
import { removeFullToggle } from './toggle/removeFullToggle';

// Block Imports

import { setAttributesToNewBlock } from "./blocks/setAttributesToNewBlock";
import { findIndexOfParentBlock, extractBlock } from "./blocks/getParents";
import { hideAndShowBlocks } from "./blocks/hideAndShowBlocks";
import { removeBlock, removeAttributesFromNewBlock } from "./blocks/removeBlockAndAttributes";
import { resetIdToCopiedBlock } from "./blocks/resetIdToCopiedBlock";
import { save } from "./blocks/save";

// Movement Imports
import { moveChildren } from "./movements/moveChildren";
import { isChild } from "./movements/isChild";
import { moveDescendants } from "./movements/moveDescendants";
import { moveDown } from "./movements/moveDown";
import {moveUp} from "./movements/moveUp";

// Nest Imports
import { nestBlock } from "./nest/nestBlock";
import { setEventsToNestedBlock } from "./nest/setEventsToNestedBlock";
import { setNestedBlockAttributes } from "./nest/setNestedBlockAttributes";

// Render Imports
import { render } from "./render/render";
import { renderItems } from "./render/renderItems";
import { renderSettings } from "./render/renderSettings";

/**
 * ToggleBlock for the Editor.js
 * Creates a toggle and paragraphs can be saved in it.
 * Requires no server-side uploader.
 *
 * @typedef {object} ToggleBlockData
 * @description Tool's input and output data format
 * @property {string} text - toggle text
 * @property {string} status - toggle status
 * @property {array} items - toggle paragraphs
 */

export default class ToggleBlock {
  static toolbox = toolbox;
  static enableLineBreaks = enableLineBreaks;
  static readOnlySupported = readOnlySupported;
  constructor(options) {
    toggleBlockConstructor.call(this, options);
  }

  isAToggleItem(holder) {
    return isAToggleItem(holder);
  }

  isAToggleRoot(holder) {
    return isAToggleRoot(holder);
  }

  createParagraphFromToggleRoot(e) {
    createParagraphFromToggleRoot.call(this, e);
  }
  
  /**isAToggleRoot
   * Calls the method to add the required properties to the new block.
   */
  createParagraphFromIt() {
    this.setAttributesToNewBlock();
  }

  setAttributesToNewBlock(entryIndex = null, foreignKey = this.wrapper.id, block = null) {
    setAttributesToNewBlock.call(this, entryIndex, foreignKey, block);
  }


  setEventsToNestedBlock(e) {
    setEventsToNestedBlock.call(this, e);
  }

  removeBlock(holder, id, cursorPosition){
    removeBlock.call(this, holder, id, cursorPosition);
  }

  removeAttributesFromNewBlock(destiny) {
    removeAttributesFromNewBlock.call(this, destiny);
  }

  /**
   * Creates a toggle block view without paragraphs
   * and sets the default content.
   */
  createToggle() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("toggle-block__selector");
    this.wrapper.id = this.data.fk;

    const icon = document.createElement("span");
    const input = document.createElement("div");
    const defaultContent = document.createElement("div");

    icon.classList.add("toggle-block__icon");
    icon.innerHTML = toggleIcon;

    input.classList.add("toggle-block__input");
    input.setAttribute("contentEditable", !this.readOnly);
    input.innerHTML = this.data.text || "";

    // Events
    if (!this.readOnly) {
      // Events to create other blocks and destroy the toggle
      input.addEventListener(
        "keyup",
        this.createParagraphFromToggleRoot.bind(this)
      );
      input.addEventListener("keydown", this.removeToggle.bind(this));

      // Sets the focus at the end of the text when a nested block is deleted with the backspace key
      input.addEventListener("focusin", () =>
        this.setFocusToggleRootAtTheEnd()
      );

      // Establishes the placeholder for the toggle root when it's empty
      input.addEventListener("keyup", this.setPlaceHolder.bind(this));
      input.setAttribute("placeholder", this.placeholder);

      // Calculates the number of toggle items
      input.addEventListener("focus", this.setDefaultContent.bind(this));
      input.addEventListener("focusout", this.setDefaultContent.bind(this));

      // Event to add a block when the default content is clicked
      defaultContent.addEventListener(
        "click",
        this.clickInDefaultContent.bind(this)
      );

      input.addEventListener("focus", this.setNestedBlockAttributes.bind(this));
    }

    defaultContent.classList.add(
      "toggle-block__content-default",
      "toggle-block__hidden"
    );
    defaultContent.innerHTML = this.defaultContent;

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(defaultContent);
  }

  /**
   * Sets the focus at the end of the toggle root when
   * a nested block is deleted through the backspace key.
   */
  setFocusToggleRootAtTheEnd(){
    setFocusToggleRootAtTheEnd.call(this);
  }

  /**
   * Adds the actions to do when the default content is clicked.
   */
  clickInDefaultContent() {
    this.api.blocks.insert();
    this.setAttributesToNewBlock();
    this.setDefaultContent();
  }

  /**
   * Sets the default content. If the toggle has no other blocks inside it,
   * so sets the 'block__hidden tag' in the default content,
   * otherwise it removes it.
   */
  setDefaultContent() {
    const children = document.querySelectorAll(
      `div[foreignKey="${this.wrapper.id}"]`
    );
    const { firstChild, lastChild } = this.wrapper;
    const { status } = this.data;
    const value = children.length > 0 || status === "closed";

    lastChild.classList.toggle("toggle-block__hidden", value);
    firstChild.style.color = children.length === 0 ? "gray" : "black";
  }

  /**
   * Deletes the toggle structure and converts the main text and the nested blocks
   * in regular blocks.
   *
   * @param {KeyboardEvent} e - key down event
   */
  removeToggle(e) {
    if (e.code === "Backspace") {
      const { children } = this.wrapper;
      const content = children[1].innerHTML;

      const cursorPosition = document.getSelection();

      if (cursorPosition.focusOffset === 0) {
        const index = this.api.blocks.getCurrentBlockIndex();
        const breakLine = content.indexOf("<br>");
        const end = breakLine === -1 ? content.length : breakLine;
        const blocks = document.querySelectorAll(
          `div[foreignKey="${this.wrapper.id}"]`
        );

        for (let i = 1; i < blocks.length + 1; i += 1) {
          this.removeAttributesFromNewBlock(index + i);
        }

        this.api.blocks.delete(index);
        this.api.blocks.insert(
          "paragraph",
          { text: content.slice(0, end) },
          {},
          index,
          1
        );
        this.api.caret.setToBlock(index);
      }
    }
  }

  /**
   * Returns the toggle's root index, given the index of one of its children
   *
   * @param {number} entryIndex - block index
   * @param {String} fk - The block's foreign key
   * @returns {number} The Toggle's root index
   */
  findToggleRootIndex(entryIndex, fk) {
    const block = this.getBlockByIndex(entryIndex);
    const { holder } = block;

    if (this.isAToggleRoot(holder)) {
      const id = holder.querySelector('.toggle-block__selector').getAttribute('id');
      if (fk === id) {
        return entryIndex;
      }
    }
    if (entryIndex - 1 >= 0) {
      return this.findToggleRootIndex(entryIndex - 1, fk);
    }
    return -1;
  }

   /**
   * Extracts a nested block from a toggle
   * with 'shift + tab' combination
   *
   * @param {number} entryIndex - Block's index that will be extracted
   */
   extractBlock(entryIndex) {
    extractBlock.call(this, entryIndex);
  }

  

  /**
   * If the toggle root is empty and the key event received is 'backspace'
   * or 'enter', its content is cleared so that the visible placeholder
   * is set through the css.
   *
   * @param {KeyboardEvent} e - key up event
   */
  setPlaceHolder(e) {
    if (e.code === "Backspace" || e.code === "Enter") {
      const { children } = this.wrapper;
      const { length } = children[1].textContent;

      if (length === 0) children[1].textContent = "";
    }
  }


  render() {
    return render.call(this);
  }

  /**
   * Adds the initial status for the icon, and establishes
   * the delay for the transition displayed when the icon
   * is clicked.
   */
  setInitialTransition() {
    const { status } = this.data;
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;
    svg.style.transition = "0.1s";
    svg.style.transform = `rotate(${status === "closed" ? 0 : 90}deg)`;
  }

  renderItems() {
    renderItems.call(this);
  }

  resolveToggleAction() {
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;

    if (this.data.status === 'closed') {
      this.data.status = 'open';
      svg.style.transform = 'rotate(90deg)';
    } else {
      this.data.status = 'closed';
      svg.style.transform = 'rotate(0deg)';
    }

    const toggleBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());
    toggleBlock.holder.setAttribute('status', this.data.status);
  }

  hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {
    hideAndShowBlocks.call(this, foreignKey, value);
  }

       /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */

        save(blockContent) {
        return save.call(this, blockContent);
      }
  

  /**
   * Return the number of blocks inside the root Toggle
   * @param {string} fk - The id of the root Toggle
   */
  getDescendantsNumber(fk) {
    let counter = 0;
    const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
    listChildren.forEach((child) => {
      // Evaluate if the child is a toggle
      if (child.hasAttribute("status")) {
        const childId = child
          .querySelector(".toggle-block__selector")
          .getAttribute("id");
        counter += this.getDescendantsNumber(childId);
      }
      counter += 1;
    });
    return counter;
  }
  highlightToggleItems(fk) {
    const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
    listChildren.forEach((child) => {
      child.classList.add('ce-block--selected');
      // Evaluate if the child is a toggle, then highlight also its children
      if (child.hasAttribute('status')) {
        const childId = child.querySelector('.toggle-block__selector').getAttribute('id');
        this.highlightToggleItems(childId);
      }
    });
  }

  renderSettings() {
    return renderSettings.call(this);
  }

  /**
   * Add listener to move button.
   * @param {HTMLDivElement} moveElement
   * @param {number} movement // 0: Move down || 1: Move up
   * @param {number} toggleIndex
   */
  addEventsMoveButtons(moveElement, movement, toggleIndex) {
    if (!moveElement) return;
    moveElement.addEventListener("click", () => {
      this.moveToggle(toggleIndex, movement);
    });
  }

  /**
   * Add listener to delete button.
   * @param {HTMLDivElement} deleteElement
   * @param {number} toggleIndex
   */
  addEventDeleteButton(deleteElement, toggleIndex) {
    if (!deleteElement) return;

    deleteElement.addEventListener("click", () => {
      const classesList = deleteElement.classList;
      const classes = Object.values(classesList);

      if (classes.indexOf("clicked-to-destroy-toggle") === -1) {
        deleteElement.classList.add("clicked-to-destroy-toggle");
      } else {
        this.removeFullToggle(toggleIndex);
      }
    });
  }
  moveToggle(toggleInitialIndex, direction) {
    if (!this.readOnly) {
      this.close();
      const currentToggleIndex = this.getCurrentBlockIndex();
      const descendants = this.getDescendantsNumber(this.wrapper.id);
      const blocks = this.getBlocksCount();
      const toggleEndIndex = toggleInitialIndex + descendants;

      // Move back the root of the Toggle to its initial position
      this.move(toggleInitialIndex, currentToggleIndex);

      if (toggleInitialIndex >= 0 && toggleEndIndex <= (blocks - 1)) {
        if (direction === 0) {
          this.moveDown(toggleInitialIndex, toggleEndIndex);
        } else {
          this.moveUp(toggleInitialIndex, toggleEndIndex);
        }
      }
    }
  }

  moveDown(toggleInitialIndex, toggleEndIndex) {
    moveDown.call(this, toggleInitialIndex, toggleEndIndex);
  }

  
  moveUp(toggleInitialIndex, toggleEndIndex) {
    return moveUp.call(this, toggleInitialIndex, toggleEndIndex);
  }

  findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {
    return findIndexOfParentBlock.call(this, currentToggleFk, blockFk, toggleInitialIndex);
  }


  moveDescendants(children, finalIndex, parentInitialIndex, direction) {
    moveDescendants.call(this, children, finalIndex, parentInitialIndex, direction);
  }
  
  removeFullToggle(toggleIndex) {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { length } = children;

    for (let i = toggleIndex; i < toggleIndex + length; i += 1) {
      setTimeout(() => this.api.blocks.delete(toggleIndex));
    }
  }

  /**
   * Adds the required listeners to call the toggle shortcuts
   * on the editor.
   */
  addListeners() {
    if (!this.readOnly) {
      const redactor = document.activeElement;
      redactor.addEventListener("keyup", (e) => {
        const blockContainer = document.activeElement;
        const currentBlock = this.getCurrentBlockIndex();
        const { holder: currentBlockContainer } =
          this.getBlockByIndex(currentBlock);

        if (e.code === "Space") {
          this.createToggleWithShortcut(blockContainer);
        } else if (
          currentBlock > 0 &&
          !this.isPartOfAToggle(currentBlockContainer) &&
          e.code === "Tab"
        ) {
          this.nestBlock(currentBlockContainer);
        }
      });
    }
  }

  /**
   * Adds mutation observer to restore the item attributes
   * when the undo action is executed and they're lost.
   */
  addSupportForUndoAndRedoActions() {
    if (!this.readOnly) {
      const target = document.querySelector("div.codex-editor__redactor");

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            setTimeout(this.restoreItemAttributes.bind(this, mutation));
          }
        });
      });

      const config = { attributes: true, childList: true, characterData: true };

      observer.observe(target, config);
    }
  }

  getIndex = (target) => Array.from(target.parentNode.children).indexOf(target);

  isChild(parentID, targetFK){
    return isChild.call(this, parentID, targetFK);
  }

  /**
   * Adds drop listener to move the childs item
   * when the drag and drop action is executed.
   */
  addSupportForDragAndDropActions() {
    if (!this.readOnly) {
      if (this.wrapper === undefined) {
        setTimeout(() => this.addSupportForDragAndDropActions(), 250);
        return;
      }

      // Set status in attribute to a proper hide and show
      const toggleBlock = document.querySelector(`#${this.wrapper.id}`)
        .parentNode.parentNode;
      toggleBlock.setAttribute("status", this.data.status);

      const settingsButton = document.querySelector(
        ".ce-toolbar__settings-btn"
      );
      settingsButton.setAttribute("draggable", "true");
      settingsButton.addEventListener("dragstart", () => {
        this.startBlock = this.api.blocks.getCurrentBlockIndex();
        this.nameDragged = this.api.blocks.getBlockByIndex(
          this.startBlock
        ).name;
        this.holderDragged = this.api.blocks.getBlockByIndex(
          this.startBlock
        ).holder;
      });

      document.addEventListener("drop", (event) => {
        // Get the position when item was dropped
        const { target } = event;
        if (document.contains(target)) {
          const dropTarget = target.classList.contains("ce-block")
            ? target
            : target.closest(".ce-block");
          if (dropTarget && dropTarget !== this.holderDragged) {
            let endBlock = this.getIndex(dropTarget);

            // Control the toggle's children will be positioned down of the parent
            endBlock = this.startBlock < endBlock ? endBlock + 1 : endBlock;

            // Check if the item dropped is another toggle
            const isTargetAToggle =
              dropTarget.querySelectorAll(".toggle-block__selector").length >
                0 || dropTarget.getAttribute("foreignKey") !== null;

            setTimeout(() => {
              // Verify if the item dropped is the toggle
              if (this.nameDragged === "toggle") {
                // Verify if the toggle dropped is the same of this eventListener
                const currentToggleDropped = this.holderDragged.querySelector(
                  `#${this.wrapper.id}`
                );

                if (currentToggleDropped) {
                  // Check if the toggle dropped was not dropped in its children
                  if (
                    !this.isChild(
                      currentToggleDropped.getAttribute("id"),
                      dropTarget.getAttribute("foreignKey")
                    )
                  ) {
                    // If is a toggle we have to add the attributes to make it a part of the toggle
                    this.assignToggleItemAttributes(
                      isTargetAToggle,
                      dropTarget
                    );
                    this.moveChildren(endBlock);
                  } else {
                    // If we are dropping in the toggle children,
                    // we have to move the toggle in the original position
                    if (this.startBlock === endBlock) {
                      this.api.blocks.move(this.startBlock + 1, endBlock);
                    } else {
                      this.api.blocks.move(this.startBlock, endBlock);
                    }

                    // And remove the attributes
                    if (!isTargetAToggle) {
                      const newToggleIndex = this.getIndex(this.holderDragged);
                      this.removeAttributesFromNewBlock(newToggleIndex);
                    }
                  }
                }
              } else if (this.nameDragged) {
                // Add the dropped item as an element of the toggle
                this.assignToggleItemAttributes(isTargetAToggle, dropTarget);
              }

              // If we are dropping out of a toggle we have to remove the attributes
              if (!isTargetAToggle) {
                const newToggleIndex = this.getIndex(this.holderDragged);
                this.removeAttributesFromNewBlock(newToggleIndex);
              }
            });
          }
        }
      });
    }
  }

  assignToggleItemAttributes(isTargetAToggle, dropTarget) {
    if (isTargetAToggle) {
      const foreignKey = dropTarget.getAttribute('foreignKey')
        ?? dropTarget.querySelector('.toggle-block__selector').getAttribute('id');

      const newToggleIndex = this.getIndex(this.holderDragged);
      setAttributesToNewBlock.call(this,newToggleIndex, foreignKey);
    }
  }

  moveChildren(endBlock, fk = this.wrapper.id) {
    moveChildren.call(this, endBlock, fk);
  }

  /**
   * Restores the item attributes to nested blocks.
   *
   * @param {HTMLDivElement} mutation - Html element removed or inserted
   */
  restoreItemAttributes(mutation) {
    if (this.wrapper !== undefined) {
      const index = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(index);
      const { holder } = block;
      const currentBlockValidation = !this.isPartOfAToggle(holder);
      const { length: toggleItemsCount } = this.itemsId;
      const { length: existingToggleItemsCount } = document.querySelectorAll(
        `div[foreignKey="${this.data.fk}"]`
      );

      if (this.itemsId.includes(block.id) && currentBlockValidation) {
        this.setAttributesToNewBlock(index);
      } else if (
        mutation.addedNodes[0] &&
        mutation?.previousSibling &&
        this.isPartOfAToggle(mutation.previousSibling) &&
        !this.isPartOfAToggle(mutation.addedNodes[0]) &&
        toggleItemsCount > existingToggleItemsCount
      ) {
        const { id: addedBlockId } = mutation.addedNodes[0];
        const addedBlock = this.api.blocks.getById(addedBlockId);
        this.setAttributesToNewBlock(null, this.wrapper.id, addedBlock);
        this.itemsId[index] = block.id;
      }
    }
  }

  /**
   * Creates a toggle through the '>' char and the 'Space' key
   */
  createToggleWithShortcut(blockContainer) {
    const content = blockContainer.textContent;

    if (content[0] === ">" && !this.isPartOfAToggle(blockContainer)) {
      const blockCaller = this.api.blocks.getCurrentBlockIndex();

      this.api.blocks.insert(
        "toggle",
        { text: content.slice(2) },
        this.api,
        blockCaller,
        true
      );
      this.api.blocks.delete(blockCaller + 1);
      this.api.caret.setToBlock(blockCaller);
    }
  }

  nestBlock(blockContainer) {
    nestBlock.call(this, blockContainer);
  }

  setNestedBlockAttributes() {
    setNestedBlockAttributes.call(this);
  }

  isPartOfAToggle(block) {
    const classes = Array.from(block.classList);
    const classNamesToCheck = ['toggle-block__item', 'toggle-block__input', 'toggle-block__selector'];
    const isToggleChild = classNamesToCheck.some(
      (className) => block.getElementsByClassName(className).length !== 0,
    );
    const isToggle = classNamesToCheck.some((className) => classes.includes(className));

    return isToggle || isToggleChild;
  }

  /**
   * Adds mutation observer to reset the toggle ids
   * when a toggle is copied and pasted.
   */
  addSupportForCopyAndPasteAction() {
    if (!this.readOnly) {
      const target = document.querySelector("div.codex-editor__redactor");

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            setTimeout(resetIdToCopiedBlock.bind(this, mutation));
          }
        });
      });

      const config = { attributes: true, childList: true, characterData: true };

      observer.observe(target, config);
    }
  }

  resetIdToCopiedBlock(){
    resetIdToCopiedBlock.call(this);
  }

}
