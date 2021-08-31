'use strict'
let React = require('react')

let PagePost = React.createClass({
  propTypes: {
    bodyHTML: React.PropTypes.string,
    title: React.PropTypes.string,
    date: React.PropTypes.string,
    author: React.PropTypes.string,
    label: React.PropTypes.string
  },

  render: function () {
    return (
      <article className='post'>
        <h2>{this.props.title}</h2>
        <div className='post-author'>By {this.props.author} on {this.props.date} | {this.props.label}</div>
        <div className='post-body' dangerouslySetInnerHTML={{__html: this.props.bodyHTML}}/>
      </article>
    )
  }
})

module.exports = PagePost
