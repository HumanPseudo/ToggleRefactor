/**
   * Removes all properties of a nested block.
   *
   * @param {number} destiny - block position
   */
export function removeAttributesFromNewBlock(destiny) {
    const newBlock = this.api.blocks.getBlockByIndex(destiny);
    const { holder } = newBlock;

    if (!this.itemsId.includes(newBlock.id)) {
      const i = this.itemsId.indexOf(newBlock.id);
      this.itemsId.splice(i, 1);
    }

    holder.removeAttribute("foreignKey");
    holder.removeAttribute("id");
    holder.onkeydown = {};
    holder.onkeyup = {};
    holder.classList.remove("toggle-block__item");
  }