// @flow

import * as React from 'react'
import { Block, InlineBlock } from 'glamor/jsxstyle'
import { LoginInput, Button } from './components'
import { AUTH_ENDPOINT } from './utils/urls'

type LoginState = {
  user: string,
  password: string
}

type LoginProps = {
  setError: Function,
  signIn: Function,
  signOut: Function
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    user: '',
    password: ''
  }

  onSubmit = async (evt: Event) => {
    evt.preventDefault()

    const authRequest = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...this.state })
    })

    const auth = await authRequest.json()

    if (auth.error) {
      this.props.setError(auth.message, 'error')
    }

    if (auth.token) {
      this.props.signIn(auth.token !== undefined, auth.token)
    }
  }

  render() {
    const { user, password } = this.state
    return (
      <Block padding={16}>
        <form onSubmit={this.onSubmit}>
          <LoginInput
            placeholder="user@email.com"
            label="Username or Email"
            autoComplete="username"
            value={user}
            onChange={e => this.setState({ user: e.target.value })}
          />
          <LoginInput
            placeholder="*********"
            label="Password"
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Block paddingTop={16} textAlign="right">
            <InlineBlock>
              <Button onClick={this.onSubmit}>Login</Button>
            </InlineBlock>
          </Block>
        </form>
      </Block>
    )
  }
}

export default Login