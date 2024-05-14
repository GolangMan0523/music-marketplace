export function highlightCode(el: HTMLElement) {
  import('@common/text-editor/highlight/highlight').then(({hljs}) => {
    el.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block as HTMLElement);
    });
  });
}
