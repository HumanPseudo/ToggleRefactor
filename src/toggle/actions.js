/**
 * Returns true if the div element is a toggle child, otherwise, returns false
 * @param {HTMLDivElement} holder
 * @returns {boolean}
 */
function isAToggleItem(holder) {
    return holder.classList.contains('toggle-block__item');
}

/**
 * Returns true if the div element is a toggle root, otherwise, returns false
 * @param {HTMLDivElement} holder
 * @returns {boolean}
 */
function isAToggleRoot(holder) {
    return holder.classList.contains('toggle-block__root')|| Boolean(holder.querySelector('.toggle-block__selector'));
}

/**
 * Sets the focus at the end of the toggle root when
 * a nested block is deleted through the backspace key.
 */
function setFocusToggleRootAtTheEnd() {
    const toggle = document.activeElement;
    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(toggle);
    range.collapse(false);
    selection.addRange(range);
    toggle.focus();
}

/**
 * Converts the toggle status to its opposite.
 * If the toggle status is open, then now will be closed and
 * the icon will reset to rotation. Otherwise, will be open
 * and the icon will be rotated 90 degrees to the left.
 *
 * @returns {string} icon - toggle icon
 */

function resolveToggleAction() {

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

function assignToggleItemAttributes(isTargetAToggle, dropTarget) {
  if (isTargetAToggle) {
    const foreignKey = dropTarget.getAttribute('foreignKey')
      ?? dropTarget.querySelector('.toggle-block__selector').getAttribute('id')

    const newToggleIndex = this.getIndex(this.holderDragged);
    setAttributesToNewBlock.call(this, newToggleIndex, foreignKey);
  }
}

/**
 * Returns the toggle's root index, given the index of one of its children
 *
 * @param {number} entryIndex - block index
 * @param {String} fk - The block's foreign key
 * @returns {number} The Toggle's root index
 */
function findToggleRootIndex(entryIndex, fk) {
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
 * Highlight the blocks that belongs to the Toggle
 * @param {string} fk - The id of the root Toggle
 */
function highlightToggleItems(fk) {
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


/**
 * Validates if a block contains one of the classes to be
 * part of a toggle. If It has it returns 'true' (It's part
 * of a toggle), otherwise returns 'false' (It's another
 * type of block)
 *
 * @param {HTMLDivElement} block - Block to be validated
 * @returns {boolean}
 */

function isPartOfAToggle(block) {
  const classes = Array.from(block.classList);
  const classNamesToCheck = ['toggle-block__item', 'toggle-block__input', 'toggle-block__selector'];
  const isToggleChild = classNamesToCheck.some(
    (className) => block.getElementsByClassName(className).length !== 0,
  );
  const isToggle = classNamesToCheck.some((className) => classes.includes(className));

  return isToggle || isToggleChild;
}


export { isAToggleItem, isAToggleRoot, setFocusToggleRootAtTheEnd, resolveToggleAction, assignToggleItemAttributes, findToggleRootIndex ,highlightToggleItems, isPartOfAToggle};
  