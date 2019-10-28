import React, { Component } from 'react';
//import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';


const particleOptions = {
  particles: {
    number:{
      value: 100,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
};



class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageLink: '',
      box: [],
      route: 'signin',
      isSignined: false,
      username: '',
      useremail:'',
      entries: 0
    }
  }



  calculateFaceLocation = (data) =>{
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = [];
    data.outputs[0].data.regions.forEach((region,i) =>{
      const boxInfo = region.region_info.bounding_box;
      box[i] = {leftCol: Number(boxInfo.left_col * width),
        topRow: Number(boxInfo.top_row * height),
        rightCol: Number(width - (boxInfo.right_col * width)),
        bottomRow: Number(height - (boxInfo.bottom_row * height))};
    } );    
    return box;
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});
  }

  onRouteChange = (route, name, email, entries) => {
    this.setState({route:route})
    if(route === 'home'){
      this.setState({
        input: '',
        imageLink: '',
        box: [],
        username: name,
        useremail: email,
        entries: entries        
      });
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageLink: this.state.input});
    fetch('http://localhost:3001/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        imageURL: this.state.input,
        useremail: this.state.useremail
      })
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);      
      this.setState({entries:data.entries});
      this.displayFaceBox(this.calculateFaceLocation(data.box));
    })
    .catch(err => console.log(err));
  }

  render() {    
    return (
      <div className="App">
        <Particles className='particles'
              params={particleOptions}
        />
        
        {
            this.state.route === 'home'
            ? <div>
                <Navigation onRouteChange={this.onRouteChange}/>
                <Logo />
                <Rank username={this.state.username} entries={this.state.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                <FaceRecognition img={this.state.imageLink} box={this.state.box}/>
              </div>
            : this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>                          
        }        
      </div>
    );
  }
}

export default App;
