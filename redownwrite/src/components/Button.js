// @flow

import styled from 'styled-components'

export default styled.button`
  display: block;
  font-size: 14px;
  background-color: var(--color-6);
  transition: background-color 250ms ease-in-out;
  color: #282828;
  font-weight: 700;
  border: 0;
  padding: 0.25rem 1.125rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.037), 0 4px 8px rgba(0, 0, 0, 0.07);
  &:hover {
    background-color: var(--color-7);
  }

  &:[disabled] {
    filter: grayscale(100%);
  }
`
