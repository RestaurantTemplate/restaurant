import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    backgroundBlack: {
        backgroundColor:'black',
    },
    backgroundGray: {
        backgroundColor:'#808080',
    },
    paddingText: {
        paddingLeft:'10px',
        paddingRight:'10px',
    },
    paddingAllText: {
        paddingLeft:'10px',
        paddingRight:'10px',
        paddingBottom:'10px',
        paddingTop:'10px',
        borderRadius: '25px',
        backgroundColor:'#00ced1',
        color:'#FFFFFF'
    },
    backgroundAquamarine: {
        paddingLeft:'10px',
        paddingRight:'10px',
        backgroundColor:'#00bfff',
    },
}));
  