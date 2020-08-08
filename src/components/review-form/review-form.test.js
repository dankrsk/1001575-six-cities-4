import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from '../review-form/review-form.jsx';

describe(`Snapshots for ReviewForm`, () => {
  it(`ReviewForm component`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            isSubmitButtonDisabled={true}
            handleTextInputChange={() => {}}
            handleRadioGroupChange={() => {}}
            onReviewFormSubmit={() => {}}
            offerId={1}
            isAllFieldDisabled={false}
            disableFormFields={() => {}}
            enableFormFields={() => {}}
            setError={() => {}}
            isError={false}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
