import React from 'react';
import {connect} from "react-redux";

class CmdHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previous_cmd: ''
    };

    // Bindings
    this.reset = this.reset.bind(this);
  }

  reset(e) {
    e.preventDefault();   // Prevent form submit
    this.setState({previous_cmd: ''});
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <textarea
            readOnly
            className="form-control form-control-lg "
            id="historyScreen" value={this.props.previous_cmd}
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
      </form>
    );
  }
}

// Exporting the connected Counter
// export default CmdHistory;
function mapStateToProps(state) {
  return {previous_cmd: state.previous_cmd}
}

// export default Cli;
export default connect(mapStateToProps)(CmdHistory);