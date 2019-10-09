import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import DrawerToggleButton from './components/SideDrawer/DrawerToggleButton';
import SideDrawer from './components/SideDrawer/SideDrawer';
import StudyScreen from './components/StudyScreen/StudyScreen';
import SearchScreen from './components/SearchScreen/SearchScreen';

//firebase
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database'; 


class App extends React.Component {

  constructor(props){
    super(props)

    // if you don't include the "if statement" an error might occur!
    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
  }

    this.state = {
      cards: [],
      sideDrawerOpen: false,
    }
  }

  componentDidMount(){

    //uncomment below to to set data to hardcoded JSON data
    // this.setState({
    //   cards: data["flashcards"],
    // })

    //retrieving the data from firebase
    const database = firebase.database()
    database.ref('flashcards').on("value", (snapshot) => {
      // console.log(snapshot.val())
      const firebaseData = snapshot.val()

      this.setState({
        cards: firebaseData
      })
    })
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  render() {
    // let searchScreen = <SearchScreen cards={this.state.cards}/>
    return (
      <Router>
        <div className="App">
          <DrawerToggleButton click={this.drawerToggleClickHandler}/>
          <SideDrawer show={this.state.sideDrawerOpen}/>

          <Route 
            path="/" 
            exact 
            render={(props) => <StudyScreen {...props} cards={this.state.cards} />}
            // component={StudyScreen}
          />
          <Route 
            path="/search" 
            render={(props) => <SearchScreen {...props} cards={this.state.cards} />}
            // component={SearchScreen} 
          />
          {/* <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} /> */}
          {/* <StudyScreen/> */}
          {/* <SearchScreen cards={this.state.cards}/> */}

        </div>
      </Router>
    );
  };
  
}

export default App;
