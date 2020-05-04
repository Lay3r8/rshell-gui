import React from 'react';
import {connect} from "react-redux";

class Cli extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenOutput: '',
      previous_cmd: ''
    };

    // Bindings
    this.send = this.send.bind(this);
    this.reset = this.reset.bind(this);
  }

  send(event) {
    event.preventDefault(); // Prevent form submit
    console.log('fetching data from the api...');
    // Add the current command to the command history
    this.props.dispatch({ type: 'PREVIOUS_CMD', previous_cmd: document.getElementById('inputText').value});

    // Making a post request with the fetch API
    fetch('http://127.0.0.1:4444/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(document.getElementById('inputText').value),
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(data => {
        console.log('api response > ' + data);
        this.setState({screenOutput: JSON.parse(data).shell_output});
      })
      .catch(error => {
        console.error(error)
        this.setState({screenOutput: error});
      })
  }

  reset(event) {
    event.preventDefault(); // Prevent form submit
    this.props.dispatch({ type: 'RESET' });
    this.setState({screenOutput: ''});
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <textarea
            readOnly
            className="form-control form-control-lg "
            id="outputScreen" value={this.state.screenOutput}
            cols="80"
            rows="15"
          >
          </textarea>
          <style jsx>{`
            textarea {
                resize: none;
                font-family: Consolas, monospace;
                font-size: 1em !important;
                background-color: #343333 !important;
                color: coral !important;
              }            
            `}</style>
        </div>
        <div className="form-group row">
          <label htmlFor="inputText" className="col-sm-2 col-form-label">Your Input</label>
          <div className="col-sm-10">
            <input className="form-control" id="inputText" placeholder="Some bash command..." />
            <style jsx>{`
              input {
                  resize: none;
                  font-family: Consolas, monospace;
                  font-size: 1em !important;
                  background-color: #343333 !important;
                  color: coral !important;
              }            
            `}</style>
          </div>
        </div>
        <div className="form-group row mx-auto justify-content-center">
          <button className="btn btn-primary m-1" onClick={this.send}>SEND</button>
          <button className="btn btn-danger m-1" onClick={this.reset}>RESET</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {previous_cmd: state.previous_cmd}
}

// export default Cli;
export default connect(mapStateToProps)(Cli);
