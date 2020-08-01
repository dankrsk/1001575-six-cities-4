import React from 'react';

const withForm = (Component) => {
  class WithForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this._isRadioGroupChecked = false;
      this._isTextValid = false;

      this.state = {
        isSubmitButtonDisabled: true,
        isAllFieldDisabled: false,
        isError: false,
      };
      this.handleTextInputChange = this.handleTextInputChange.bind(this);
      this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
      this.enableFormFields = this.enableFormFields.bind(this);
      this.disableFormFields = this.disableFormFields.bind(this);
      this.setError = this.setError.bind(this);
    }

    _checkValidation() {
      if (this._isRadioGroupChecked && this._isTextValid) {
        this.setState({
          isSubmitButtonDisabled: false,
        });
      } else {
        this.setState({
          isSubmitButtonDisabled: true,
        });
      }
    }

    handleTextInputChange(evt) {
      if (!evt.target.validationMessage) {
        this._isTextValid = true;
      } else {
        this._isTextValid = false;
      }
      this._checkValidation();
    }

    handleRadioGroupChange(evt) {
      if (!evt.target.validationMessage) {
        this._isRadioGroupChecked = true;
      } else {
        this._isRadioGroupChecked = false;
      }
      this._checkValidation();
    }

    disableFormFields() {
      this.setState({
        isAllFieldDisabled: true,
      });
    }

    enableFormFields() {
      this.setState({
        isAllFieldDisabled: false,
      });
    }

    setError(value) {
      this.setState({
        isError: value,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isSubmitButtonDisabled={this.state.isSubmitButtonDisabled}
          isAllFieldDisabled={this.state.isAllFieldDisabled}
          disableFormFields={this.disableFormFields}
          enableFormFields={this.enableFormFields}
          handleTextInputChange={this.handleTextInputChange}
          handleRadioGroupChange={this.handleRadioGroupChange}
          isError={this.state.isError}
          setError={this.setError}
        />
      );
    }
  }

  return WithForm;
};

export default withForm;
