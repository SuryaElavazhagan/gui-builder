export function drawOver(element: HTMLElement, target: HTMLElement) {
  const { top, left, height, width } = target.getBoundingClientRect();
  element.style.position = 'absolute';
  element.style.left = `${left + window.scrollX}px`;
  element.style.top = `${top + window.scrollY}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}