import { makeStyles } from '@material-ui/core'

export const useRestaurantStyles = makeStyles({
    container: {
        width: '100%',
        height: '300px',
        background:
            'linear-gradient(rgba(186,226,255,0.76), rgba(186,226,255,0))',
        paddingTop: '20px',
    },
    restaurantName: {
        display: 'flex',
        justifyContenct: 'center',
        alignItems: 'center',
        width: '240px',
        height: '55px',
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(164, 167, 255, 0.49)',
        justifyContent: 'center',
    },
    title: { color: '#8A88FF' },
    location: {
        width: '135px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '9px',
    },
})
