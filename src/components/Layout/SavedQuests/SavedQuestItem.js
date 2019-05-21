import React from "react";

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import BrushIcon from '@material-ui/icons/Brush';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import NearMeIcon from '@material-ui/icons/NearMe';
import StyleIcon from '@material-ui/icons/Style';
import Tooltip from '@material-ui/core/Tooltip';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import CardActions from '@material-ui/core/CardActions';
import 'typeface-roboto';

import '../../CSS/QuestPage.css'

class SavedQuestItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: "test",
        };
    }

    componentDidMount() {
    }

    handleSave = (e) => {
        e.stopPropagation();
    }

    handleChip = (e) => {
        e.stopPropagation();
    }

    render() {
        const data = this.props.questData;
        const questImage = data['imgLink'];
        const questName = data['name'];

        //Pull relevant card summary data
        const questLocation = data['location'];
        const questCost = data['cost'];
        const questEcoRating = data['ecoRating'];
        const questAbout = data['description'];
        const cats = Object.entries(data['categories']);

        const icons = {
            Fitness: {
                icon: <FitnessCenterIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#0277bdCC"
            },
            Creative: {
                icon: <BrushIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#fbc02dAA"
            },
            Nature: {
                icon: <FilterHdrIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#66bb6aCC"
            },
            Culture: {
                icon: <FitnessCenterIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#8e24aaCC"
            },
            Food: {
                icon: <FastFoodIcon style={{ color: 'white', fontSize: '15px' }} />,
                color: "#8d6e63CC"
            },
            Romantic: {
                icon: <FavoriteIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
            Volunteer: {
                icon: <FavoriteIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
            Games: {
                icon: <FavoriteIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
        };

        return (
            <div>
                <ExpansionPanel elevation={1} style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url("${questImage}")`,
                    backgroundPosition: 'center',
                    backgroundSize: '150% auto', color: 'white', marginBottom: '1.5em',
                }}>
                    <ExpansionPanelSummary classes={{ content: "noMargin", root: 'noMargin' }}>
                        <Grid container justify='space-between' style={{ padding: '0' }}>
                            <Grid item container xs={9}>
                                <Grid item xs={12} style={{ margin: '.5em 0 0 1em' }}>
                                    <span style={{ fontWeight: 'bold' }}>{questName}</span>
                                </Grid>
                                <Grid item xs={12} style={{ margin: '0 0 0 1em' }}>
                                    <span style={{ fontSize: '0.8em', color: '#FFFFFFCC' }}>5 km away</span>
                                </Grid>
                                <Grid item xs={12} style={{ margin: '.5em .5em .5em 0' }}>
                                    {cats.map(x => (
                                        <Tooltip key={x[0]} disableHoverListener enterTouchDelay={200} title={x[0]} placement="top">
                                            <Chip
                                                style={{ height: '22px', marginLeft: '1em', color: 'white', borderColor: 'white', background: `${icons[x[0]]['color']}` }}
                                                icon={icons[x[0]]['icon']}
                                                label={x[1]}
                                                onClick={this.handleChip}
                                            />
                                        </Tooltip>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item container xs={3} md={2} alignItems='center' justify='center'>
                                <Grid item xs={12}>
                                    <Fab style={{ backgroundColor: '#EEEEEE' }} size="medium" onClick={this.handleSave}>
                                        <DoneIcon style={{ fontSize: '200%', color: 'green' }} />
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ background: 'white', color: 'black', padding: '0' }}>
                        <Grid container justify="flex-end">
                            <Grid item xs={12}>
                                <List component="ul" style={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NearMeIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="1499 Arbutus Street, Vancouver"
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                    </ListItem>
                                    <Divider light />
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyleIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Culture, Fitness"
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                    </ListItem>
                                    <Divider light />
                                    <ListItem>
                                        <ListItemIcon>
                                            <ShareIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Share on Facebook"
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item style={{padding: '4px 4px'}}>
                                <Button size="small" color="default">
                                    Learn More
                                </Button>
                                <Button size="small" color="secondary">
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>)
    }
}

export default SavedQuestItem;