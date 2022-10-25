import {
  Box,
  BoxProps,
} from '@pancakeswap/uikit'

interface VideoProps extends BoxProps  {
  loop?: true,
  autoplay?: true
  src: string
}

const Video: React.FC<React.PropsWithChildren<VideoProps>> = ({ loop = true, autoplay = true, src,...props }) => {
  return <Box {...props} borderRadius="12px" overflow="hidden" >
    <video loop={loop} muted autoPlay={autoplay} playsInline width="100%">
      <source src={src} />
    </video>
  </Box>
}

export default Video