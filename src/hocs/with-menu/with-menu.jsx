import React from 'react';

const withMenu = (Component) => {
  class WithMenu extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this.handleOpenButtonClick = this.handleOpenButtonClick.bind(this);
    }

    handleOpenButtonClick() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isOpen={this.state.isOpen}
          handleOpenButtonClick={this.handleOpenButtonClick}
        />
      );
    }
  }

  return WithMenu;
};

export default withMenu;
