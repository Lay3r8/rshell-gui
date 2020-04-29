import React from 'react';
import { connect } from 'react-redux';

// Redux layer
function mapStateToProps(state) {
  return {
    content: state.content
  };
}

class RshellGui extends React.Component {

  constructor(props) {
    super(props);
    this.state = {content: ''};

    // Bindings
    this.send = this.send.bind(this);
    this.reset = this.reset.bind(this);
  }

  send(e) {
    e.preventDefault(); // Prevent form submit
    this.props.dispatch({ type: 'SEND', content: document.getElementById('inputText').value });

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
        console.log('data = ' + data);
        document.getElementById('outputScreen').value = JSON.parse(data).shell_output;
      })
      .catch(error => {
        console.error(error)
        document.getElementById('outputScreen').value = error;
      })
  }

  reset(e) {
    e.preventDefault(); // Prevent form submit
    this.props.dispatch({ type: 'RES' });
    document.getElementById('inputText').value = '';
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <textarea
            readOnly
            className="form-control form-control-lg"
            id="outputScreen" value={this.props.content}
            cols="80"
            rows="15"
          >
          </textarea>
        </div>
        <div className="form-group row">
          <label htmlFor="inputText" className="col-sm-2 col-form-label">Your Input</label>
          <div className="col-sm-10">
            <input className="form-control" id="inputText" placeholder="Some bash command..." />
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

// Exporting the connected Counter
export default connect(mapStateToProps)(RshellGui);
