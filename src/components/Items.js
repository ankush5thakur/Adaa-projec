import PropTypes from 'prop-types';
import React from 'react';
import AddItem from './AddItem';

function Items({ items, setItems }) {
  
  const [showAddRow, setShowAddRow] = React.useState(false);
  const maxNumberOfItems = 10;


  function handleAddButton(event) {
    setShowAddRow(true);
  }

  function handleDelete(item) {
    const filtered = items.filter(i => i !== item)
    setItems(filtered);
  }

  function shouldDisplayButton() {
     return items.length >= maxNumberOfItems

  }

  return (
    <div>
      <div className="table">
        <div className="tr" role="row">
          <span className="td" role="cell">Item Name</span>
          <span className="td" role="cell">Value</span>
          <span className="td" role="cell">Weight</span>
        </div>
        {items.map(item => (
          <div className="tr" role="row" key={item.name}>
            <span className="td" role="cell">{item.name}</span>
            <span className="td" role="cell">{item.value}</span>
            <span className="td" role="cell">{item.weight}</span>
            <span className="td" role="cell">
              <button type="button" onClick={() => handleDelete(item)}>-</button>
            </span>
          </div>
        ))}
        {showAddRow ?
          <AddItem
            items = {items}
            setItems = {setItems}
            setShowAddRow = {setShowAddRow}
          />
          : null
        }
        {shouldDisplayButton() ?
          <button type="button" disabled>+</button> :
          <button type="button" onClick={handleAddButton}>+</button>
        }
      </div>
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    weight: PropTypes.number,
  })),
};

export default Items;