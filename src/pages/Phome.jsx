import React, { useState } from "react";
import { parts } from "../utils/parts";
const Phome = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(parts.length).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const toggle1 = () => {
    setModal1(!modal1);
  };
  const toggle2 = () => {
    setModal2(!modal2);
  };
  return (
    <div className="phome">
      {modal1 && (
        <div className="modal">
          <div className="overlay" onClick={toggle1}></div>
          <div className="content1">
            <div className="layer">
              <span>Name : Sachcham</span>
              <span>Gender : Male</span>
              <span>Blood Group : B+</span>
              <span>Height : 175 cm</span>
              <span>Weight : 275 pounds</span>
              <span>Issue Center Number : XXXXXXXXX</span>
              <span>Important Medical Conditions : Ishq se pidit</span>
              <span>Emergency Contact Number : XXXXXXXXX</span>
            </div>
          </div>
        </div>
      )}
      {modal2 && (
        <div className="modal">
          <div className="overlay" onClick={toggle2}></div>
          <div className="content2">
            <div className="fils">
              <span className="filters">Filters</span>
              <div className="all_fils">
                {parts.map(({ name }, index) => {
                  return (
                    <div className="parts-list-item">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="btn">
                <button>Proceed</button>
              </div>
            </div>
            <div className="doc"></div>
            <div className="doc"></div>
            <div className="doc"></div>
            <div className="doc"></div>
            <div className="doc"></div>
          </div>
        </div>
      )}
      <div className="container">
        <span>Welcome Feynman</span>
        <div className="buttons">
          <div className="all" onClick={toggle1}>
            Basic Health Records
          </div>
          <div className="filter" onClick={toggle2}>
            All Records
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phome;
