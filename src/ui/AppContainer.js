import React from 'react';

import * as api from '../api';
import * as history from '../history';
import App from './App';

export default class AppContainer extends React.Component {
  state = {
    url: 'https://twitter.com',
    loading: false,
    newCode: null,
    links: history.getAll(),
  };

  shortenPromise = null;
  highlightTimer = 0;

  render() {
    const links = this.state.links.map(link => ({
      ...link,
      new: this.state.link && this.state.link.shortcode === link.shortcode,
    }));

    return (
      <App
        url={this.state.url}
        loading={this.state.loading}
        newCode={this.state.newCode}
        links={links}
        onUrlChange={this.onUrlChange}
        onShorten={this.onShorten}
        onClearHistory={this.onClearHistory}
      />
    );
  }

  componentDidMount() {
    this.updateStats();
  }

  onUrlChange = event => {
    this.setState({url: event.target.value});
  };

  onShorten = event => {
    const {url} = this.state;

    clearTimeout(this.highlightTimer);
    this.setState({loading: true, newCode: null});

    api
      .shorten(url)
      .then(
        data => this.handleShortenSuccess(data, url),
        this.handleShortenError,
      );
  };

  handleShortenSuccess = (data, url) => {
    let links = history.getAll();
    const link = {
      url,
      shortcode: data.shortcode,
      redirectCount: 0,
      lastSeenDate: new Date().toISOString(),
    };
    links.push(link);
    links = links.slice(-5);
    history.save(links);

    this.setState({
      url: '',
      loading: false,
      newCode: data.shortcode,
      links,
    });
    this.highlightTimer = setTimeout(
      () => {
        this.setState({newCode: false});
      },
      4000,
    );
  };

  handleShortenError = err => {
    this.setState({
      loading: false,
      newCode: null,
    });
    alert('Request failed'); // TODO: Better message and UX.
  };

  onClearHistory = () => {
    const links = [];
    this.setState({links});
    history.save(links);
  };

  updateStats() {
    const codes = this.state.links.map(link => link.shortcode);
    api.statsAll(codes).then(updates => {
      const links = this.state.links.map(link => {
        const update = updates[link.shortcode];
        if (update) {
          return {
            ...link,
            ...update,
          };
        }
        return link;
      });
      this.setState({links});
      history.save(links);
    });
  }
}
