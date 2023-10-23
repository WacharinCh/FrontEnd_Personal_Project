
import { createContext, useEffect } from 'react';
import { useState } from 'react'
import axios from '../config/axios'
import { AddAccessToken, RemoveAccessToken, getAccessToken } from '../utils/local-storage';
export const AuthContext = createContext();



export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginErr, setisLoginErr] = useState(false);
  const [isAllProduct, setIsAllProduct] = useState([]);
  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get('/auth/me')
        .then(res => {
          setAuthUser(res.data.user);
          setIsLogin(true)
        })
        .finally(() => {
          setInitialLoading(false);
        });
    }
    else {
      setInitialLoading(false);
    }
  }, []);



  const login = async credential => {

    try {
      const res = await axios.post('/auth/login', credential)
      AddAccessToken(res.data.accessToken)
      setAuthUser(res.data.user)
      setIsLogin(true)
      return true
    } catch (err) {
      console.log(err)
      setisLoginErr(true)
      return false
    }
  }

  const register = async registerInputObject => {
    const res = await axios.post('/auth/register', registerInputObject);
    AddAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const logout = () => {
    setIsLogin(false);
    RemoveAccessToken();
    setAuthUser(null);
  };

  const createProduct = async createProductInputObject => {
    const res = await axios.post('/auth/product', createProductInputObject);
    const newProduct = res.data.product
    setIsAllProduct([newProduct, ...isAllProduct])
  };

  // const deleteProduct = async product => {
  //   console.log(product)
  //   await axios.delete('/auth/product', product);
  //   setIsAllProduct(isAllProduct.filter(e => e.id !== product.id))
  // };

  const deleteProduct = async (product) => {
    console.log(product);
    try {
      await axios.delete('/auth/product', { data: product });
      setIsAllProduct((prevProducts) => prevProducts.filter((e) => e.id !== product.id));
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };



  return <AuthContext.Provider value={{ deleteProduct, isAllProduct, setIsAllProduct, login, authUser, initialLoading, register, isLogin, isLoginErr, logout, createProduct }}>{children}</AuthContext.Provider>
}
