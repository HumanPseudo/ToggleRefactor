 /**
   * When a nested block is removed, the 'items' attribute
   * is updated, subtracting from it an unit.
   * @param {string} id - block identifier
   */
 export function removeBlock(holder, id, cursorPosition) {
    if (cursorPosition === 0) {
      const position = this.itemsId.indexOf(id);
      this.itemsId.splice(position, 1);
    }
  }