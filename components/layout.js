import React from 'react';
import Cli from "./cli";
import CmdHistory from "./cmd_history";

class Layout extends React.Component {
  render() {
    return (
        <div className='align-middle row'>
          <Cli className="col-sm-8"/>
          <CmdHistory className="col-sm-4" previous_cmd={this.props.previous_cmd}/>
        </div>
    );
  }
}

export default Layout;
