import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isModalWindowOpen: false,
      success: false,
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

  handleSubmit = (e) => {
    console.log("diana");
    e.preventDefault();
    auth
      .register(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          isModalWindowOpen: true,
          success: true,
        });
      })
      .catch(() => this.setState({ isModalWindowOpen: true, success: false }));
  };

  closeModalWindow = () => {
    this.setState({ isModalWindowOpen: false });
    if (this.state.success) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="logister">
        <div className="logister__main">
          <h1 className="logister__title">Sign Up</h1>
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
              <button className="logister__link">Sign up</button>
            </div>
          </form>

          <div className="logister__switch">
            <p>
              Already a member?{" "}
              <Link to="/login" className="logister__switch-link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
        <InfoTooltip
          isOpen={this.state.isModalWindowOpen}
          success={this.state.success}
          onClose={this.closeModalWindow}
        />
      </div>
    );
  }
}

export default withRouter(Register);
