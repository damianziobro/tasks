import React, {Component} from 'react';

class Register extends Component {
    state = {
        inputs: {
            username: '',
            email: '',
            password: ''
            }
    }

    changeHandler = (event) => {
        const inputs = {...this.state.inputs};
        inputs[event.target.name] = event.target.value;
        this.setState({inputs});
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.setState({
            inputs: {
                username: '',
                email: '',
                password: ''
            }
        });
    }

    render () {
        return (
            <form onSubmit={this.submitHandler}>
                <input name="username" type="text" placeholder="Nazwa uzytkownika" value={this.state.inputs.username} onChange={this.changeHandler}/>
                <input name="email" type="email" placeholder="E-mail" value={this.state.inputs.email} onChange={this.changeHandler}/>
                <input name="password" type="password" placeholder="Hasło" value={this.state.inputs.password} onChange={this.changeHandler}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Register;