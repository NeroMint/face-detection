import React from 'react';
import {connect} from 'react-redux';

import {setEmailSignIn, setPassSignIn} from '../../actions';

const mapStateToProps = (state) => {
    return {
            userEmail: state.signin.userEmail,
            userPass: state.signin.userPass
           }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onEmailChange : (event) => dispatch(setEmailSignIn(event.target.value)),
        onPasswordChange: (event) => dispatch(setPassSignIn(event.target.value))
    }
}



class Signin extends React.Component {
    
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         email:'',
    //         password:''
    //     };
    // }   
    
    // onEmailChange = (event) => {
    //     this.setState({email:event.target.value});
    // }

    // onPasswordChange = (event) => {
    //     this.setState({password:event.target.value});
    // }

    onSubmit = () => {
        const {userEmail, userPass} = this.props;
        fetch('http://localhost:3001/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: userEmail,
                password: userPass
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data !== 'wrong credential'){
                this.props.onRouteChange('home', data.name, userEmail, data.entries);
            }            
        });
    }

    render(){
        const {onRouteChange} = this.props;
        const {onEmailChange, onPasswordChange} = this.props;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={this.onSubmit} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                        />
                        </div>
                        <div className="b ph3 pv2 bg-transparent grow pointer f6 dib">
                            <p onClick={() => onRouteChange('register')}>Sign up</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);