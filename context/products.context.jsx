// import { createContext, useReducer, useEffect, useContext } from "react";
// import { getProducts } from "../api/productsApi";

// const ProductsContext = createContext();

// const initialState = {
//   laptops: [],
//   phones: [],
//   loading: true,
//   error: null,
// };

// function productsReducer(state, action) {
//   switch (action.type) {
//     case "SET_PRODUCTS":
//       return {
//         ...state,
//         laptops: action.payload.laptops,
//         phones: action.payload.phones,
//         loading: false,
//       };
//     case "SET_ERROR":
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// }

// export const ProductsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(productsReducer, initialState);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const laptops = await getProducts("laptop");
//         const phones = await getProducts("phone");
//         dispatch({ type: "SET_PRODUCTS", payload: { laptops, phones } });
//       } catch (err) {
//         dispatch({ type: "SET_ERROR", payload: err.message });
//       }
//     };

//     fetchAllProducts();
//   }, []);

//   return (
//     <ProductsContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };

// // Custom hook for easier usage
// export const useProducts = () => useContext(ProductsContext);
