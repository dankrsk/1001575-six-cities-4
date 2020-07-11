import React from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCardId: -1,
      };
      this.handleCardAction = this.handleCardAction.bind(this);
    }

    handleCardAction(id = -1) {
      this.setState({
        activeCardId: id,
      });
    }

    render() {
      const {activeCardId} = this.state;

      return (
        <Component
          {...this.props}
          activeCardId={activeCardId}
          handleCardAction={this.handleCardAction}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
