'use strict';

import React from 'react';
import Markdown from 'remarkable';

var Remarkable = React.createClass({
  propTypes: {
    container: React.PropTypes.string,
    options: React.PropTypes.object,
    source: React.PropTypes.string,
    children: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      container: 'div',
      options: {},
    };
  },

  render() {
    var Container = this.props.container;

    return (
      <Container>
        {this.content()}
      </Container>
    );
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      return true;
    }
    else if (this.props.source) {
      return this.props.source !== nextProps.source;
    }
    else if (React.Children.count(this.props.children) === 1 && React.Children.count(nextProps.children) === 1) {
      return (typeof this.props.children === 'string') && this.props.children !== nextProps.children;
    }
    else {
      return true;
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new Markdown(nextProps.options);
    }
  },

  content() {
    if (this.props.source) {
      return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(this.props.source) }} />;
    }
    else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {
          return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(child) }} />;
        }
        else {
          return child;
        }
      });
    }
  },

  renderMarkdown(source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);
    }

    return this.md.render(source);
  }

});

export default Remarkable;
