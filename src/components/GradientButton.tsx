import styled from 'styled-components'
import { Button, ButtonProps } from '@pancakeswap/uikit'

const StyledGradientButton = styled(Button)`
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border-radius: 10px;
  padding: 10px 50px;
  font-weight: 700;
  height: 44px;
`

interface StyledGradientButtonProps extends ButtonProps {
  onClick?: () => void
}

const GradientButton: React.FC<React.PropsWithChildren<StyledGradientButtonProps>> = ({ onClick, ...props }) => {
  const handleClick = () => {
    onClick()
  }

  return <StyledGradientButton {...props} onClick={handleClick} />
}

export default GradientButton
