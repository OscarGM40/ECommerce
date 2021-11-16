
import { useState } from "react";
import app from "../../../helpers/firebase";
import { createProductCall } from "../../../redux/apiCalls";
import "./newProduct.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // fijate como cuando tenga varios tipos de controles en un formulario debo usar varios estados
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  // fijate que los name deben ser los del Modelo!
  const handleChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  const handleMultipleSizes = (e) => {
    e.preventDefault();
    // un select multiple siempre debo tratarlo con e.target.selectedOptions
    //fijate que en JS podria hacer document.getelement().selectedOptions apuntando al <select></select>
    const options = e.target.selectedOptions;
    // simplemente tengo que mapear por los valores tras meter las selectedOptions a un array
    const values = Array.from(options).map(option => option.value); //ojo con el orden
    setSizes(values);
  }

  const handleMultipleColors = (e) => {
    e.preventDefault();
    const options = e.target.selectedOptions;
    const values = Array.from(options).map(option => option.value); 
    setColors(values);
  }

  const handleCategories = (e) => {
    // recuerda que split minimo devuelve un Array vacio
    setCategories(e.target.value.split(','));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // recuerda que cada file necesita algo que lo haga unique
    const fileName = new Date().getTime() + file.name;
    // hay que pasarle el storage que definí y tengo en app
    const uploadTask = app.ref(`/items/${fileName}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% completed.`);
      },
      (err) => console.log(err),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          const product = { ...inputs, img: url, categories, size: sizes,color: colors};
          createProductCall(product, dispatch);
          setTimeout(history.push("/products"), 500)
        });
      }
    );
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="addProductForm">
        <div className="addProductItem">
          <label>Product Image</label>
          <input
            type="file"
            id="file"
            name="img"
            required
            placeholder="Enter image..."
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            name="title"
            required
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description..."
            name="desc"
            required
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Price($)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            name="price"
            required
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>In Stock</label>
          <select
            name="inStock"
            required
            onChange={handleChange}
            defaultValue={""}
          >
            <option
              value=""
              disabled
            >Choose Option...</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Sizes</label>
          <select
            name="size"
            required
            onChange={handleMultipleSizes}
            defaultValue={[]}
            multiple
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Colors</label>
          <select
            name="color"
            required
            onChange={handleMultipleColors}
            defaultValue={[]}
            multiple
          >
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans,skirts..."
            name="categories"
            required
            onChange={handleCategories}
          />
        </div>

        <button
          type="submit"
          className="addProductButton" >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
