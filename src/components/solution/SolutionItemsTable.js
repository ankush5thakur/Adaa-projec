import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import React from 'react';

function SolutionItemsTable({ knapsackAlgorithm, state }) {
  //@todo - fix this to get cells to highlight
  function getCellToHighLight(index) {
    //should only be one item per row.
    // let item = state.solutionItems.filter(itemToUse => itemToUse.row === index)
    // return item[0] ? item[0].column : null;
    return null;
  }
  return (

    knapsackAlgorithm.solutionTable.map((row, index) => {
      const indexOffset = index - 1;
      const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
      return <SolutionTableRow
        key={item ? item.name : " "}
        cellKey={item ? item.name + "Cell" : "Cell"}
        row={row}
        item={item}
        currentCell={getCellToHighLight(index)}
        phase={true}
      />
    })
  );
}

SolutionItemsTable.propTypes = {
  knapsackAlgorithm: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired
    })).isRequired,
    capacity: PropTypes.number.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    solutionItems: PropTypes.array
  }).isRequired
};

export default SolutionItemsTable;