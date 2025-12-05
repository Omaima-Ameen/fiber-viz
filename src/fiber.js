// fiber.js

export function getFiber(dom) {
  if (!dom) return null;
  const key = Object.keys(dom).find(k => k.startsWith("__reactFiber$"));
  return key ? dom[key] : null;
}

// Make RAW summary VERY SMALL → no freezing
export function getRawSummary(fiber) {
  if (!fiber) return "No fiber found.";

  return {
    tag: fiber.tag,
    key: fiber.key,
    type: fiber.type ? fiber.type.name || fiber.type : "unknown",
    hasChild: !!fiber.child,
    hasSibling: !!fiber.sibling,
    props: fiber.memoizedProps ? Object.keys(fiber.memoizedProps) : []
  };
}

// Safe shallow serialize (depth 1)
export function serializeFiber(fiber) {
  if (!fiber) return "No fiber found.";

  return {
    type: typeof fiber.type === "function" ? fiber.type.name : fiber.type,
    tag: fiber.tag,
    key: fiber.key || null,
    child: fiber.child ? { type: fiber.child.type, tag: fiber.child.tag } : null,
    sibling: fiber.sibling ? { type: fiber.sibling.type, tag: fiber.sibling.tag } : null,
  };
}
