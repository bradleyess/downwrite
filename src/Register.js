// @flow

import React, { Component } from 'react'
import { Block, InlineBlock } from 'glamor/jsxstyle'
import { Cookies } from 'react-cookie'
import { LoginInput as Input, Button } from './components'
import { USER_ENDPOINT } from './utils/urls'

type RegisterType = {
	username: string,
	password: string,
	email: string
}

const creds = {
	username: 'test',
	email: 'test@test.com',
	password: 'test'
}

class Register extends Component<
	{ setAuth: Function, cookies: typeof Cookies },
	RegisterType
> {
	state = {
		username: '',
		password: '',
		email: ''
	}

	componentWillMount() {
		this.setState({ ...creds })
	}

	onSubmit = async (evt: Event) => {
		evt.preventDefault()

		const { setAuth, cookies } = this.props
		const response = await fetch(USER_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...this.state })
		})

		const user = await response.json()

		if (user.userID) {
			cookies.set('token', user.id_token)
			cookies.set('id', user.userID)
		}

		setAuth(user.id_token !== undefined)
	}

	render() {
		const { username, password, email } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<Input
					label="Username"
					value={username}
					onChange={(e: Event) => this.setState({ username: e.target.value })}
				/>

				<Input
					label="Email"
					value={email}
					onChange={(e: Event) => this.setState({ email: e.target.value })}
				/>

				<Input
					label="Password"
					value={password}
					type="password"
					onChange={(e: Event) => this.setState({ password: e.target.value })}
				/>

				<Block paddingTop={16} textAlign="right">
					<InlineBlock>
						<Button css={{ display: 'inline-block' }} onClick={this.onSubmit}>
							Register
						</Button>
					</InlineBlock>
				</Block>
			</form>
		)
	}
}

export default Register
