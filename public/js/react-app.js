(function(){
  const { createElement } = window.React;
  const { createRoot } = window.ReactDOM;

  const mount = document.getElementById('react-root');
  if (!mount) return;

  const TraceBorderButtonDemo = () => {
    const [count, setCount] = React.useState(0);

    return createElement(
      'div',
      { className: 'trace-demo' },
      createElement(
        'h2',
        { className: 'trace-demo__title' },
        'React Trace Border Demo'
      ),
      createElement(
        'div',
        { className: 'trace-demo__grid' },
        createElement(
          'button',
          {
            className: 'trace-border-btn',
            onClick: () => setCount((c) => c + 1)
          },
          createElement('span', { className: 'trace-border-label' }, 'Count ', count)
        ),
        createElement(
          'button',
          {
            className: 'trace-border-btn',
            style: {
              '--trace-color': '#f97316',
              '--trace-speed': '1.2s',
              '--trace-radius': '0.65rem'
            },
            onClick: () => setCount(0)
          },
          createElement('span', { className: 'trace-border-label' }, 'Reset')
        )
      )
    );
  };

  const root = createRoot(mount);
  root.render(createElement(TraceBorderButtonDemo));
})();
