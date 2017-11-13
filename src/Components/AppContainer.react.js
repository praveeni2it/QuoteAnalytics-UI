import React from "react";

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
