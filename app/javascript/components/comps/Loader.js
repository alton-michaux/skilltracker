import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppContext } from '../AppContext'

const Loader = () => {
  const state = useAppContext()

  const loaderStyle = {
    width: '500px',
    margin: 'auto',
    top: '40vh',
    zIndex: 1,
    display: state?.isLoading ? 'block' : 'none'
  }

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress style={loaderStyle} />
    </Box>
  )
}

export default Loader
