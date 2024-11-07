export function isInThePast(history) {
    return history.index < history.nodes.length - 1
}