import { Box, Chip, Typography } from '@mui/material'
import React from 'react'

export const TotalView = ({total}) => {
  return (
    <>
        <Box sx={{ marginTop: 2}} display="flex" justifyContent="flex-end">
            <Chip label={total} color="success" />
        </Box>
    </>
  )
}
