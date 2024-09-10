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

export { isAToggleItem, isAToggleRoot };
  