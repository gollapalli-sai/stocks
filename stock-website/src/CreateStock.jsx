import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateStock = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log(name, symbol, price, imgUrl);

      const res = await axios.post("http://localhost:8000/stock-create", {
        name: name,
        symbol: symbol,
        price: price,
        imgUrl: imgUrl,
      });
      if (res?.status === 201) {
        toast.success("Stock Created Successfully");
        navigate("/home");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "800px",
        margin: "0 auto",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Stock form</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          placeholder="Enter the stock name"
        />
        <input
          onChange={(event) => {
            setSymbol(event.target.value);
          }}
          type="text"
          placeholder="Enter the stock symbol"
        />
        <input
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          type="number"
          placeholder="Price of the stock"
        />
        <input
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
          type="text"
          placeholder="Past your stock image url"
        />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default CreateStock;
