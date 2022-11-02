import React from 'react'
import { Box, ContainerProps } from 'components/Pancake-uikit'



const Container: React.FC<ContainerProps> = ({ children, ...props }) => (
  <Box px={['16px', '10px']} paddingBottom="1.5rem" mx="auto" maxWidth="1380px"  {...props}>
    {children}
  </Box>
)

export default Container
