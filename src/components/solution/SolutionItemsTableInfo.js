import React from 'react';
import { KnapsackAlgorithmPropType, SolutionItemsPropType } from './helpers/PropTypesHelper'
import { getItemCellId } from './helpers/TableHelper';
import PropTypes from 'prop-types';
import ItemsToUsePseudoCode from './pseudocode/ItemsToUsePseudoCode';
import SolutionItems from './SolutionItems'
import { solutionTableActionTypes as types } from './SolutionController';
import ItemToUse from '../../models/ItemToUse';

function SolutionItemsTableInfo({ knapsackAlgorithm, state, dispatch }) {
  const [gridItems, setGridItems] = React.useState([]);

  React.useEffect(() => {
    const usedBackground = "lightgreen";
    const notUsedBackground = "lightgrey";
    gridItems.forEach((item) => {
      document.getElementById(item.gridId).style.background = item.isSolutionItem ? usedBackground : notUsedBackground;
    });

  }, [gridItems]);

  function handleFindItemsButtonClick() {
    let payload = { currentCapacity: knapsackAlgorithm.capacity, solutionIndex: state.solutionIndex}
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      payload: payload,
    });
  }

  function buildPsuedo() {
    return (
      <div>
        <input type="button" className="btnBlue" value="Step" disabled={state.solutionIndex <= 0} onClick={handleButtonClick} />
        <div className="pseudoCode">
          <p>current capacity is: {state.currentCapacity}</p>
          <p>current item Index is: {state.solutionIndex}</p>
          <div>
            {state.solutionIndex > 0 ?
              <ItemsToUsePseudoCode
                previousItem={knapsackAlgorithm.items[state.solutionIndex - 1]}
                index={state.solutionIndex}
                currentCapacity={state.currentCapacity}
                knapsackAlgorithm={knapsackAlgorithm}
              />
              :
              null
            }
            <SolutionItems
              solutionItems={state.solutionItems}
            />
          </div>
        </div>
      </div>)
  }

  function handleButtonClick() {
    let currentCapacity = state.currentCapacity
    let newItem = null;
    if (knapsackAlgorithm.solutionTable[state.solutionIndex][state.currentCapacity] !== knapsackAlgorithm.solutionTable[state.solutionIndex - 1][state.currentCapacity]) {
      newItem = new ItemToUse(knapsackAlgorithm.items[state.solutionIndex - 1], state.solutionIndex, state.currentCapacity);
      currentCapacity -= knapsackAlgorithm.items[state.solutionIndex - 1].weight
    }

    let payload = { currentCapacity: currentCapacity, solutionIndex: state.solutionIndex - 1 }
    if (newItem) {
      payload = {
        ...payload,
        newItem: newItem
      }
    }

    setGridItems([...gridItems, { gridId: getItemCellId(knapsackAlgorithm.items[state.solutionIndex - 1], state.currentCapacity), isSolutionItem: newItem ? true : false }])

    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      payload: payload
    });

  }

  return (
    <div className="tableInfo">
      {state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS ?
        <input type="button" className="btnBlue" value="Find Solution Items" onClick={handleFindItemsButtonClick} />
        :
        buildPsuedo()
      }
    </div>
  )
}

SolutionItemsTableInfo.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    solutionItems: SolutionItemsPropType.isRequired,
    solutionIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SolutionItemsTableInfo;


