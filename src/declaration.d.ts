declare namespace JSX {
  interface IntrinsicElements {
    'pretix-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { event: string; 'skip-ssl-check'?: boolean };
  }
}
