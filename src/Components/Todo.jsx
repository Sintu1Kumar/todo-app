import React, { useEffect, useState } from "react";
import "./Todo.css";
import { PiPlusBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

// to get the data from localStorage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editedItem, setEditedItem] = useState(null);

  // Add Item
  const addItem = () => {
    if (!inputData) {
      alert("Please Fill Data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((ele) => {
          if (ele.id === editedItem) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditedItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  // Delete Item
  const deleteItem = (id) => {
    console.log(id);
    const updateditems = items.filter((ele) => {
      return ele.id !== id;
    });
    setItems(updateditems);
  };

  // Edit Item
  const editItem = (id) => {
    let newEditItem = items.find((ele) => {
      return ele.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditedItem(id);
  };

  // Delete All Items
  const removeAll = () => {
    setItems([]);
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="main-div">
          <figure>
            <img
              src="https://img.freepik.com/free-vector/orange-blue-background-list_23-2149020601.jpg?w=740&t=st=1705145939~exp=1705146539~hmac=ea7d32ed253dc1fc500914f7a4850c7418ec6ab48fded770ac9cb52c5236f310"
              alt="todologo"
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
            {toggleSubmit ? (
              <PiPlusBold
                className="add-icon"
                title="Add Item"
                onClick={addItem}
              />
            ) : (
              <FaEdit
                className="add-icon"
                title="Edit Item"
                onClick={addItem}
              />
            )}
          </div>

          <div className="show-item">
            {items.map((ele) => {
              return (
                <div className="item" key={ele.id}>
                  <h3>{ele.name}</h3>
                  <span className="show-icon">
                    <FaEdit
                      id="edit-icon"
                      title="Edit Item"
                      className="icon"
                      onClick={() => editItem(ele.id)}
                    />
                    <RiDeleteBin6Line
                      id="delete-icon"
                      title="Delete Item"
                      className="icon"
                      onClick={() => deleteItem(ele.id)}
                    />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="clear">
            <button className="btn bg-primary" onClick={removeAll}>
              Clear All Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
