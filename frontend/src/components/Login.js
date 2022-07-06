import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    auth
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        if (data.token) {
          this.setState(
            {
              email: "",
              password: "",
            },
            () => {
              this.props.handleLogin();
              this.props.history.push("/");
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="logister">
        <div className="logister__main">
          <h1 className="logister__title">Log In</h1>
          <form className="logister__form" onSubmit={this.handleSubmit}>
            <input
              className="logister__form-input"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              className="logister__form-input"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <div className="logister__button-container">
              <button className="logister__link">Log In</button>
            </div>
          </form>
          <div className="logister__switch">
            <p>
              Not a member yet?{" "}
              <Link to="register" className="logister__switch-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
