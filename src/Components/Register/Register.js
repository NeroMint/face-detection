import React from 'react';
import {connect} from 'react-redux';
import {setNameRegister, setEmailRegister, setPassRegister} from '../../actions';


const mapStateToProps = (state) => {
    //console.log('mapStateToProps',state);
    return{
        name: state.register.registerName,
        email: state.register.registerEmail,
        pass: state.register.registerPass
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onNameChange: (event) => dispatch(setNameRegister(event.target.value)),
        onEmailChange: (event) => dispatch(setEmailRegister(event.target.value)),
        onPasswordChange: (event) => dispatch(setPassRegister(event.target.value))
    }
}


class Register extends React.Component {
    
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         name:'',
    //         email:'',
    //         password:''
    //     };
    // }

    // onNameChange = (event) => {
    //     this.setState({name:event.target.value});
    // }

    // onEmailChange = (event) => {
    //     this.setState({email:event.target.value});
    // }

    // onPasswordChange = (event) => {
    //     this.setState({password:event.target.value});
    // }

    onSubmit = () => {
        const{name, email, pass} = this.props;
        //console.log(this.props);
        fetch('http://localhost:3001/register',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: pass
            })      
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            //Todo alert error when the register iformation is invalid, e.g., duplicated email
            this.props.onRouteChange('home', name, email, 0);
        });
    }

    render(){
        //console.log('render', this.props);
        const {onNameChange, onEmailChange, onPasswordChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
                            <input 
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="username"  
                                id="username"/>
                        </div>
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={this.onSubmit} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"
                        />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);