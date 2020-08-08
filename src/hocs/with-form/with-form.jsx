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
      this.setState({
        isSubmitButtonDisabled: !(this._isRadioGroupChecked && this._isTextValid),
      });
    }

    handleTextInputChange(evt) {
      this._isTextValid = !evt.target.validationMessage;
      this._checkValidation();
    }

    handleRadioGroupChange(evt) {
      this._isRadioGroupChecked = !evt.target.validationMessage;
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
