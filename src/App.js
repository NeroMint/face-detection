import React, { Component } from 'react';
import Clarifai from 'clarifai';
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

const app = new Clarifai.App({
  apiKey: '911b27c66c7c4b67925fbb6d3f2e2396'
 });

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageLink: '',
      box: [],
      route: 'signin',
      isSignined: false
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

  onRouteChange = (route) => {
    this.setState({route:route})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageLink: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( data => this.displayFaceBox(this.calculateFaceLocation(data)))
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
                <Rank />
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
