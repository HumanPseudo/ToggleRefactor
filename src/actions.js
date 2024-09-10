import toggleIcon from '../assets/toggleIcon.svg';

/**
 * Icon and title for displaying at the Toolbox
 * @returns {{title: string, icon: string}}
 */
function toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIcon,
    };
}

/**
 * Disables the creation of new EditorJS blocks by pressing
 * 'enter' when in a toggle block.
 */
function enableLineBreaks() {
    return true;
}

/**
 * Notify core that the read-only mode is supported
 *
 * @returns {boolean}
 */
function readOnlySupported() {
    return true;
}

// Export the functions

export { toolbox, enableLineBreaks, readOnlySupported };
