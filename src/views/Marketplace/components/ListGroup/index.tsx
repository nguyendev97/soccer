import React from 'react'
import styled from 'styled-components'
import { BoxProps } from '@pancakeswap/uikit'

interface DataProps extends BoxProps {
  data?: any
  className?: any
}

const ListGroupComponent: React.FC<React.PropsWithChildren<DataProps>> = ({ data, className }) => {
  const UlItem = styled.ul`
    list-style: none;
    margin-top: 24px;
    &.hozizon {
      display: flex;
    }
  `
  const ListItem = styled.li`
    margin-bottom: 16px;
  `
  const LinkItem = styled.a`
    font-weight: 400;
    color: #ccd3ff;
    font-size: 16px;
    text-decoration: none;
  `
  return (
    <UlItem className={className ?? className}>
      {data &&
        data.map((item) => {
          return (
            <ListItem>
              <LinkItem href={item.href}>{item.name}</LinkItem>
            </ListItem>
          )
        })}
    </UlItem>
  )
}
export default ListGroupComponent
