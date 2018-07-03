// @flow
import React, { Fragment, Component } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import { type ContentState } from 'draft-js'
import 'universal-fetch'
import DeleteModal from '../components/delete-modal'
import PostList from '../components/post-list'
import Loading from '../components/loading'
import EmptyPosts from '../components/empty-posts'
import InvalidToken from '../components/invalid-token'
import { getToken, createHeader } from '../utils/responseHandler'
import { POST_ENDPOINT } from '../utils/urls'

export type Post = {
  title: string,
  id: string,
  dateAdded: Date,
  dateModified: Date,
  public: boolean,
  content: ContentState
}

export type PostError = {
  error: string,
  message: string,
  statusCode: number
}

type Res = PostError | Array<Post>

type DashboardPr = {
  entries: Array<Post>,
  user: string,
  token: string,
  closeNav: Function
}

type DashboardState = {
  entries: Res,
  loaded: boolean,
  selectedPost: ?Post | {},
  modalOpen: boolean,
  error: string
}

const ListContainer = styled.div`
  padding: 16px 8px;
  height: 100%;
`

export default class Dashboard extends Component<DashboardPr, DashboardState> {
  static displayName = 'Dashboard'

  static defaultProps = {
    entries: []
  }

  static async getInitialProps({ req, query }) {
    const { token } = getToken(req, query)

    const config = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      mode: 'cors'
    }

    const entries = await fetch(POST_ENDPOINT, config).then(res => res.json())

    return {
      entries
    }
  }

  state = {
    entries: this.props.entries,
    loaded: this.props.entries.length > 0,
    modalOpen: false,
    selectedPost: {},
    error: ''
  }

  getPosts = async (close: ?boolean) => {
    const { token } = this.props
    const config = createHeader('GET', token)

    const response = await fetch(POST_ENDPOINT, config)
    const posts: Res = await response.json()

    if (Array.isArray(posts) || response.ok) {
      return this.setState({
        entries: orderBy(posts, ['dateAdded'], ['desc']),
        selectedPost: {},
        loaded: true,
        modalOpen: !close
      })
    } else if (typeof posts === 'object') {
      return this.setState({ error: posts.message, loaded: true, selectedPost: {} })
    }
  }

  componentDidMount() {
    if (isEmpty(this.state.entries)) {
      this.getPosts()
    }
  }

  closeUIModal = () => this.setState({ modalOpen: false })

  onDelete = async (post: Post) => {
    const { token } = this.props
    const config = createHeader('DELETE', token)

    const response = await fetch(`${POST_ENDPOINT}/${post.id}`, config)

    if (response.ok) {
      return await this.getPosts(true)
    }
  }

  cancelDelete = () => this.setState({ selectedPost: {}, modalOpen: false })

  confirmDelete = (post: Post | {}) =>
    this.setState({ selectedPost: post, modalOpen: true })

  // TODO: refactor to have selected post, deletion to be handled by a lower level component
  // should be opened at this level and be handed a token and post to delete
  render() {
    const { modalOpen, loaded, entries, error, selectedPost } = this.state
    return (
      <Fragment>
        <Head>
          <title>{entries.length} Entries | Downwrite</title>
        </Head>
        {modalOpen &&
          !isEmpty(selectedPost) && (
            <DeleteModal
              title={selectedPost.title}
              onDelete={() => this.onDelete(selectedPost)}
              onCancelDelete={this.cancelDelete}
              closeModal={this.closeUIModal}
            />
          )}
        <ListContainer>
          {loaded ? (
            Array.isArray(entries) && entries.length > 0 ? (
              <PostList onDelete={this.confirmDelete} posts={entries} />
            ) : error.length > 0 ? (
              <InvalidToken error={error} />
            ) : (
              <EmptyPosts />
            )
          ) : (
            <Loading size={100} />
          )}
        </ListContainer>
      </Fragment>
    )
  }
}