'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var Remarkable = _react2['default'].createClass({
  displayName: 'Remarkable',

  propTypes: {
    container: _react2['default'].PropTypes.string,
    options: _react2['default'].PropTypes.object,
    source: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      container: 'div',
      options: {}
    };
  },

  render: function render() {
    var Container = this.props.container;

    return _react2['default'].createElement(
      Container,
      null,
      this.content()
    );
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      return true;
    } else if (this.props.source) {
      return this.props.source !== nextProps.source;
    } else if (_react2['default'].Children.count(this.props.children) === 1 && _react2['default'].Children.count(nextProps.children) === 1) {
      return typeof this.props.children === 'string' && this.props.children !== nextProps.children;
    } else {
      return true;
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new _remarkable2['default'](nextProps.options);
    }
  },

  content: function content() {
    var _this = this;

    if (this.props.source) {
      return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) } });
    } else {
      return _react2['default'].Children.map(this.props.children, function (child) {
        if (typeof child === 'string') {
          return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: _this.renderMarkdown(child) } });
        } else {
          return child;
        }
      });
    }
  },

  renderMarkdown: function renderMarkdown(source) {
    if (!this.md) {
      this.md = new _remarkable2['default'](this.props.options);
    }

    return this.md.render(source);
  }

});

exports['default'] = Remarkable;
module.exports = exports['default'];