import React from 'react';

import Button from './Button';
import LatestLinkList from './LatestLinkList';

import './App.css';

const App = props => (
  <div className="App">
    <div className="App-header">
      <div className="App-logo">Shooooort</div>
      <div className="App-headText">The link shortener with a long name</div>
    </div>
    <div className="App-form">
      <input
        className="App-input"
        disabled={props.loading}
        value={props.url}
        placeholder="Paste the link you want to shorten here"
        onChange={props.onUrlChange}
      />
      <Button
        disabled={props.url.trim() === ''}
        loading={props.loading}
        onClick={props.onShorten}
      >
        Shorten this link
      </Button>
    </div>
    <div className="App-history">
      <div className="App-historyTitle">
        Previously shortened by you
        {' '}
        <a
          href="javascript:"
          className="App-clearHistory"
          onClick={props.onClearHistory}
        >
          Clear history
        </a>
      </div>
      <LatestLinkList links={props.links} newCode={props.newCode} />
    </div>
  </div>
);

export default App;
