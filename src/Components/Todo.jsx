import React, { useState } from "react";
import "./Todo.css";
import { PiPlusBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(['sintu']);

  // Add Item
  const addItem = () => {
    if (!inputData) {
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  // Delete Item
  const deleteItem = (id) => {
    console.log(id);
    const updateditems = items.filter((ele, ind) => {
      return ind !== id;
    });
    setItems(updateditems);
  };

  // Delete All Items
  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="container">
        <div className="main-div">

          <figure>
            <img
              src="https://img.freepik.com/free-vector/orange-blue-background-list_23-2149020601.jpg?w=740&t=st=1705145939~exp=1705146539~hmac=ea7d32ed253dc1fc500914f7a4850c7418ec6ab48fded770ac9cb52c5236f310"
              alt="todologo"
              style={{ height: "70px", width: "80px", marginLeft: "30%"}}
            />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItem">
            <input
              type="text"
              placeholder="Add Item..."
              id="textbox"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <PiPlusBold id="add-icon" title="Add Item" onClick={addItem} />
          </div>

          <div className="show-item">
            {items.map((ele, ind) => {
              return (
                <div className="item" key={ind}>
                  <h3>{ele}</h3>
                  <span>
                    <RiDeleteBin6Line
                      id="delete-icon"
                      title="Delete Item"
                      onClick={() => deleteItem(ind)}
                    />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="clear">
            <button className="btn bg-primary --bs-emphasis-color-rgb" onClick={removeAll}>
              Clear All Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
