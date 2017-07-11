import React, { Component } from 'react'
import { Block } from 'glamor/jsxstyle'
import PostList from './components/PostList'
import Loading from './components/Loading'
import EmptyPosts from './components/EmptyPosts'

export default class extends Component {
  static displayName = 'Main View'

  state = {
    posts: [],
    loaded: false
  }

  componentWillMount () {
    fetch('/posts')
      .then(res => res.json())
      .then(posts => this.setState({ posts, loaded: true }))
      .catch(err => this.setState({ loaded: false }, console.error(err)))
  }

  render () {
    const { loaded, posts } = this.state
    return (
      <Block padding={16} height='100%'>
        {
          loaded
          ? (posts.length > 0 ? <PostList posts={posts} /> : <EmptyPosts />)
          : (<Loading size={100} />)
        }
      </Block>
    )
  }
}
