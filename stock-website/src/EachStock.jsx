import axios from "axios";
import React from "react";

const EachStock = (props) => {
  let eachStock = props.props;

  const handleDelete = async (stockId) => {
    const res = axios.delete("http://localhost:8000/stock-delete", {
      data: {
        stockId: stockId,
      },
    });
    console.log(res);
  };
  return (
    <div className="stock-card">
      <img style={{ width: "100px", height: "100px" }} src={eachStock.imgUrl} />
      <h1 style={{ fontSize: "16px" }}>{eachStock.name}</h1>

      <div className="stock-footer">
        <p>${eachStock.price}</p>
        <p style={{ fontSize: "10px" }}>
          Symbol:
          <span style={{ fontWeight: 700, fontSize: "15px" }}>
            {eachStock.symbol}
          </span>
        </p>
      </div>
      <button
        onClick={() => {
          handleDelete(eachStock._id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default EachStock;
