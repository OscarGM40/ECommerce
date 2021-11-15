import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import Chart from "../../../components/chart/Chart";
import { axiosWithJwtInstance } from "../../../helpers/axiosInstance";
import app from "../../../helpers/firebase";
import { updateProductCall } from "../../../redux/apiCalls";
import "./product.css";


// TODO arreglar CSS.
// TODO crear lógica para el update through new Product

const Product = () => {

  const location = useLocation()
  const history = useHistory();
  const productId = location.pathname.split("/")[2];

  const [productStats, setProductStats] = useState([]);
  const dispatch = useDispatch();
  // fijate como cuando tenga varios tipos de controles en un formulario debo usar varios estados
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], [])

  const product = useSelector((state) => state.product.products.filter(p => p._id === productId)[0])

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  const handleMultipleChange = (e) => {
    e.preventDefault();
    const options = e.target.selectedOptions;
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



  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axiosWithJwtInstance.get("/orders/income?pid" + productId);
        // res.data.sort((a,b) => a.createdAt - b.createdAt);
        res.data.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total }
          ]))
      } catch (error) {
        console.log(error)
      }
    }
    getStats();
  }, [MONTHS, productId])


  const handleUpdate = (e) => {
    e.preventDefault();
    // recuerda que cada file necesita algo que lo haga unique
    if (file) {
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
            const prod = { ...inputs, img: url, categories, size: sizes,color: colors};
            console.log(prod, 'product')
            updateProductCall(product._id, prod, dispatch);
            setTimeout(history.push("/products"), 500)
            window.location.reload();
          });
        }
      );
    } else {
      // NOTE: realmente puedo dejar required aún menos campos,pero de momento dejo todos menos la foto
      const prod = { ...inputs, categories, size: sizes,color: colors};
      console.log(prod, 'product')
      updateProductCall(product._id, prod, dispatch);
      setTimeout(history.push("/products"), 500)
      window.location.reload();
    }
  }

  // console.log(inputs)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productStats} dataKey="Sales" title="Sales Performance" style={{ margin: 0 }} />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product?.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Desc:</span>
              <span className="productInfoValue">{product?.desc}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product?.price}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">
                {product?.inStock ? 'true' : 'false'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={handleUpdate} className="productForm">

          <div className="productFormLeft">

            <label>Product Name</label>
            <input
              type="text"
              placeholder={product?.title}
              name="title"
              required
              onChange={handleChange}
            />

            <label>Product Description</label>
            <input
              type="text"
              placeholder={product?.desc}
              name="desc"
              required
              onChange={handleChange}
            />

            <label>Price</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder={product?.price}
              // defaultValue="0.0"
              name="price"
              required
              onChange={handleChange}
            />

            <label>In Stock(before: {product?.inStock ? "true" : "false"} )</label>
            <select
              name="inStock"
              required
              onChange={handleChange}
              defaultValue={""}
            >
              <option
                value=""
                disabled
              // defaultValue="Choose One..."
              // selected 
              >Choose Option...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label>Sizes</label>
            <select
              name="size"
              required
              onChange={handleMultipleChange}
              defaultValue={[]}
              multiple
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

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

            <label>Categories</label>
            <input
              type="text"
              placeholder="jeans,skirts..."
              name="categories"
              required
              onChange={handleCategories}
            />
          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.img} alt="" className="productUploadImg" />
              <label htmlFor="file"
                style={{ cursor: "pointer" }}>
                <Publish />
              </label>
              <input
                type="file"
                className="productInputFile"
                id="file"
                name="img"
                // required
                placeholder="Enter image..."
                onChange={(e) => setFile(e.target.files[0])}
              // style={{ display: "none" }}
              />
            </div>
            <button className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
