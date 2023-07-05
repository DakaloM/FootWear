import React from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Stack sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}  width={"100%"} height={"70px"} spacing={2} direction="row">
        <CircularProgress sx={{color: "#8363ac"}} />
    </Stack>

  )
}

export default Loading