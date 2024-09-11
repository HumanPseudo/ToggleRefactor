 /**
   * Extracts a nested block from a toggle
   * with 'shift + tab' combination
   *
   * @param {number} entryIndex - Block's index that will be extracted
   */
  
export function extractBlock(entryIndex) {
    const block = this.getBlockByIndex(entryIndex);
    const { holder } = block;

    if (this.isAToggleItem(holder)) {
      const fk = holder.getAttribute("foreignKey");
      const parentIndex = this.findToggleRootIndex(entryIndex, fk);
      if (parentIndex >= 0) {
        const items = this.getDescendantsNumber(fk);
        const destiny = parentIndex + items;

        if (items > 1) {
          this.api.blocks.move(destiny, entryIndex);
        }

        setTimeout(() => this.removeAttributesFromNewBlock(destiny), 200);
      }
    }
    this.api.caret.setToBlock(entryIndex);
    this.api.toolbar.close();
  }
 
 /**
   * Returns the index of the root of the toggle which is at the same level of the toggle that it
   * is expected to be moved
   *
   * fk of the toggle that is going to be moved
   * @param {string} currentToggleFk
   * @param {string} blockFk // fk of block which is above of the current toggle root
   * @param {number} toggleInitialIndex // index of the root of the current toggle root
   * @returns
   */
  
  export function findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {
    const NestedToggleChildren = this.getDescendantsNumber(blockFk);
    const parentBlockIndex = toggleInitialIndex - (NestedToggleChildren + 1);
    const parentBlock = this.getBlockByIndex(parentBlockIndex).holder;
    if (parentBlock.hasAttribute("foreignKey")) {
      const parentBlockFk = parentBlock.getAttribute("foreignKey");
      if (parentBlockFk !== currentToggleFk) {
        const beforeBlock = this.getBlockByIndex(parentBlockIndex - 1).holder;
        if (beforeBlock.hasAttribute("foreignKey")) {
          const fk = beforeBlock.getAttribute("foreignKey");
          if (fk !== parentBlockFk) {
            return this.findIndexOfParentBlock(
              currentToggleFk,
              fk,
              parentBlockIndex
            );
          }
        }
      }
    }
    return parentBlockIndex;
  }