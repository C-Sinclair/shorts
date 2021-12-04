export const isInDom = (node: Node): boolean => !!node.parentNode &&
  (node.parentNode === document || isInDom(node.parentNode));

