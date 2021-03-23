import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    hide: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto"
    },
    _root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    _root_paper: {
        display: 'flex',
        flexWrap: 'wrap',
        width:'100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    growXs: {
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
    container: {
        width: '100%',
        height: '200px',
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
}));
  