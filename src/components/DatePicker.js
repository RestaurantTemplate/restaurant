import * as React from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export const DatePicker = ({ label, selectedDate, onDateChange }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={label}
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={onDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}
