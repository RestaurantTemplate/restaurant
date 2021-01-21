import { Typography } from '@material-ui/core'

export const Label = (props) => {
    const { className, children, ...rest } = props

    return (
        <Typography className={className} {...rest}>
            {children}
        </Typography>
    )
}
