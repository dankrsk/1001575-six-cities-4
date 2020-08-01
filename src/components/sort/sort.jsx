import React from 'react';
import {getSortType} from '../../utils/offers.js';
import {SortType} from '../../reducer/app/app.js';
import {ButtonsCodes} from '../../const.js';
import PropTypes from 'prop-types';

Sort.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenButtonClick: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

const getSortItems = (sortType, onSortTypeChange, onOpenButtonClick) => {
  const sortItems = [];
  const onItemClick = (type) => {
    onSortTypeChange(type);
    onOpenButtonClick();
  };

  for (const key in SortType) {
    if (Object.prototype.hasOwnProperty.call(SortType, key)) {
      sortItems.push(
          <li
            key={key}
            className={`places__option${sortType === SortType[key] ? ` places__option--active` : ``}`}
            tabIndex="0"
            onClick={() => {
              onItemClick(SortType[key]);
            }}
            onKeyDown={(evt) => {
              if (evt.keyCode === ButtonsCodes.ENTER) {
                onItemClick(SortType[key]);
              }
            }}
          >
            {getSortType(SortType[key])}
          </li>
      );
    }
  }

  return sortItems;
};

function Sort(props) {
  const {isOpen, handleOpenButtonClick: onOpenButtonClick, sortType, onSortTypeChange} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => {
          onOpenButtonClick();
        }}
        onKeyDown={(evt) => {
          if (evt.keyCode === ButtonsCodes.ENTER) {
            onOpenButtonClick();
          }
        }}
      >
        {getSortType(sortType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
        {getSortItems(sortType, onSortTypeChange, onOpenButtonClick)}
      </ul>
    </form>
  );
}

export default Sort;
