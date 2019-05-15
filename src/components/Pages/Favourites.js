import React, { cloneElement } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../firebase'
import '../CSS/Favourites.css';




class Favourites extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {

            // List of all quests
            questList: null,

            // List of quests favourited by the user
            list: null,

            // Boolean set to true until user is logged in and list updated
            loading: true,

            // current user
            globalUser: null,

            // an array of quests favourited by the user
            favouriteArray: [],
        };
    }

    componentDidMount() {
      this.setState({ loading: true });

      // grab list of all quests in firebase and save to questList
      this.firebase.questsAll().once("value", snapshot => {
        console.log(snapshot.val());
        this.setState({ 
          questList: snapshot.val(),
        });
      });

      this.firebase.auth.onAuthStateChanged(user => {
        if (user) {
          this.globalUser = user;

          this.firebase.favourites(user.uid).once("value", snapshot => {
            console.log(snapshot.val());
            this.setState({ 
              list: snapshot.val(),
              loading: false,
            });
            this.updateArray();
          });
        } else {
          //not logged in
        }

      });
    }

    // updates user Favourite Quests array
    updateArray() {
      let array= [];
      for (var quest in this.state.list) {
        console.log(quest);
        let questID = this.state.list[quest].questID;
        let savedDate = this.state.list[quest].savedDate;
        let currentQuest = {
          questID: questID,
          savedDate: savedDate
        };
        console.log("adding quest");
        array.push(currentQuest);
      }
      this.setState({
        favouriteArray: array,
      });
    }

    // deletes the quest associated with the delete button that called this
    deleteQuest(event) {
            console.log("quest to be deleted " + event.currentTarget.value);
            this.firebase.favourites(this.globalUser.uid).child(event.currentTarget.value).remove();

            this.firebase.favourites(this.globalUser.uid).once("value", snapshot => {
              console.log(snapshot.val());
              this.setState({ 
                list: snapshot.val(),  
              });

              this.updateArray();

    });
  }

    createList = () => {
      // Array of favourited quests in JSX syntax
      let favouriteList = []

      // if favourites quests list is empty render a blank list
      if(this.state.favouriteArray.length === 0) {
        console.log("no favourites");
        return <div>No Quests Favourited</div>
      }

      // if favourites quests list is not empty

      // iterate through every quest in favouriteArray and create a JSX list for the quest
      for (let i = 0; i < this.state.favouriteArray.length; i++) {
        console.log(i +" length " + this.state.favouriteArray.length);
        if (this.state.favouriteArray[i] != undefined) {

          let questName = JSON.stringify(this.state.questList[this.state.favouriteArray[i].questID].name);
          questName = questName.substring(1, questName.length -1);

          let questDescription = JSON.stringify(this.state.questList[this.state.favouriteArray[i].questID].description);
          questDescription = questDescription.substring(1, questDescription.length -1);

          // let questImageLink = JSON.stringify(this.state.questList[this.state.list[i].questID].imgLink);
          // questImageLink = questImageLink.substring(1, questImageLink.length -1);

          let savedDate = JSON.stringify(this.state.favouriteArray[i].savedDate);
          savedDate = savedDate.substring(1, savedDate.length -1);

          console.log("quest" + this.state.questList[this.state.favouriteArray[i].questID].name);
          favouriteList.push(
            <div className = "questContainer">
              <div className = "questTop">
                <div className = "questName">{questName}</div>
                <div className = "savedDate">
                  Saved: {savedDate}
                </div>
              </div>
              <div className = "questBottom">
              <div className = "questDescription">
                {questDescription}
              </div>
              <div className = "questButtons">
                <button className="delete" value = {this.state.favouriteArray[i].questID} onClick={this.deleteQuest.bind(this)
                  }>Delete
                </button>
                <img src="../../red_x.png" />
        
              </div>

              </div>
 
            </div>
          
          )
        }
      }
      return favouriteList;
      
    }


    render() {
        let content;
        if (!this.state.loading) {

          console.log("rendering");
          content = <div> {this.createList()} </div>;
          
        } else {
          content = 
          <div>
          </div>;
        }
        return <div>{content}</div>;
    }
}


export default Favourites;

