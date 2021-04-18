/**
 * Helper to reassign names on a found node
 *
 * @param {*} node The found node
 * @param {*} name The target name that you are renaming to
 * @returns
 */
export const assignName = ({ node }, name) =>
  Object.assign({}, node, {
    name,
  });
