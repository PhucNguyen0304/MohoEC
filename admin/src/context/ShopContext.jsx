import { useEffect } from "react"
import { createContext, useState } from "react"
import axios from 'axios'
import { backendUrl } from '../App';

export const ShopContext = createContext()
const ShopContextProvider = (props) => {
    const [products,setProducts] = useState([])
    const [users,setUsers] = useState([])
    const fetchUsers = async () => {
        try {
          const response = await axios.get(backendUrl + "/api/user/list");
          if (response.data.success) {
            setUsers(response.data.users);
          }
        } catch (error) {
          console.log(error);
        }
      };
useEffect(()=>{
    fetchUsers()
},[]) 
const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

useEffect(()=> {
    console.log(users)
},[users])   
useEffect(()=>{
    fetchProducts()
},[]) 
    const value = {
        products,setProducts,users,setUsers,fetchUsers,fetchProducts
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider