import "./App.css";
import React, { useReducer, useState } from "react";
import SetupScreen from "./components/SetupScreen";
import { capacityDefaults } from "./models/ValueDefaults";
import SolutionController from "./components/solution/SolutionController";
import Item from "./models/Item";
import KnapsackAlgorithm from "./models/KnapsackAlgorithm";
import hero from "./assets/hero.png";
import AppContext from "./AppContext";

const actionTypes = {
  calculate: 1,
  reset: 2,
};

const tipJarLink = "https://ko-fi.com/W7W4CXVBZ";

function App() {
  const initItems = [
    new Item("item 1", 4, 2),
    new Item("item 2", 3, 1),
    new Item("item 3", 5, 3),
  ];

  const initialState = {
    capacity: capacityDefaults.defaultValue,
    items: initItems,
    knapsack: null,
    showEntryForm: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showHeaderMenuItems, setShowHeaderMenuItems] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  function reducer(state, action) {
    switch (action.type) {
      case actionTypes.calculate:
        scrollToTop();
        return {
          ...state,
          items: action.items,
          capacity: action.capacityValue,
          knapsack: new KnapsackAlgorithm(action.items, action.capacityValue),
          showEntryForm: false,
        };
      case actionTypes.reset:
        scrollToTop();
        return {
          ...state,
          showEntryForm: true,
        };
      default:
        throw new Error();
    }
  }

  function menuBtnClick() {
    setShowHeaderMenuItems(!showHeaderMenuItems);
  }

  return (
    <div>
      <div className="sm:bg-gradient-to-br sm:from-gray-900 sm:to-black bg-black">
        <header>
          <nav className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 flex flex-wrap px-4 py-2 md:py-0 border border-green-600 items-center justify-between w-full">
            <div className="justify-self-start logo navbar-font text-white font-bold">
              <a href="/" className="text-white">
                Ankush & Abhishek
              </a>
            </div>
          </nav>
        </header>
        <div className="rounded">
          <div className="flex justify-center gap-x-2">
            <div className="ml-4 md:ml-0 px-2 md:py-4 md:px-4">
              <img
                className="object-contain h-48"
                src={hero}
                alt="Drawing of an orange backpack with yellow straps."
              />
            </div>
            <div className="self-center text-4xl md:text-6xl text-green-300 font-extrabold drop-shadow-lg">
              Knapsack Algorithm Visualization
            </div>
          </div>
          <div className="p-8">
            {" "}
            {/* Increased padding for more space */}
            <div className="border bg-gray-800 border-green-400 p-8 md:max-w-4xl 2xl:max-w-6xl md:mx-auto rounded-lg text-white">
              <AppContext.Provider value={{ appDispatch: dispatch }}>
                {state.showEntryForm ? (
                  <SetupScreen items={state.items} capacity={state.capacity} />
                ) : (
                  <div>
                    <SolutionController knapsackAlgorithm={state.knapsack} />
                  </div>
                )}
              </AppContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export { actionTypes };
