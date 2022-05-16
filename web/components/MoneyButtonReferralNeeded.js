import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle'
import Box from '@mui/material/Box'

export default function MoneyButtonReferralNeeded (props) {
  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <Box sx={{ paddingTop: '12px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box>
              <SupervisedUserCircle sx={{ height: '25px', width: '25px', marginRight: '3px', float: 'left', color: 'primary.main' }} />
              {props.label}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}
