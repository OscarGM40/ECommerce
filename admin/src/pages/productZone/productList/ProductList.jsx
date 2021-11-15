import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProductCall, getProductsCall } from "../../../redux/apiCalls";

const ProductList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsCall(dispatch)
  }, [dispatch])

  // recuerda que es state.name.properties luego es state.product.products igual que será state.user.user o state.user.currentUser.Fijate que no lo traigo por destructuring!!
  const products = useSelector((state) => state.product.products);

  const handleDelete = (id) => {
    console.log(id, 'deleteid')
    deleteProductCall(id, dispatch);
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "size", headerName: "Sizes", width: 150, renderCell: (params) => {
        return (
          params.row.size.map((size) => <span key={size} className="productSize">{size}</span>)
        )
      }
    },
    {
      field: "color", headerName: "Colors", width: 260, renderCell: (params) => {
        return (params.row.color.map((c) => <span key={c} className="productColor">{c}</span>))
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/product/" + params.row._id, product: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductList;
