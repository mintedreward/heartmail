import WarningIcon from '@mui/icons-material/Warning'
import Box from '@mui/material/Box'

export default function MoneyButtonInfo (props) {
  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <Box sx={{ paddingTop: '12px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box>
              <WarningIcon sx={{ height: '25px', width: '25px', marginRight: '3px', float: 'left', color: 'info.main' }} />
              {props.label}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}
