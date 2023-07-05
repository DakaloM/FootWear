import { publicRequest, userRequest } from "../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async(dispatch, user) => {
    dispatch(loginStart(user));
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch(e){
        dispatch(loginFailure());
    }
}
export const getProducts = async(dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }catch(e){
        dispatch(getProductFailure());
    }
}
export const deleteProducts = async(id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    }catch(e){
        dispatch(deleteProductFailure());
    }
}

export const updateProducts = async(id, product, dispatch) => {
    dispatch(updateProductStart());
    try{
        const res = await userRequest.put(`/products/${id}`);
        dispatch(updateProductSuccess(id, product));
    }catch(e){
        dispatch(updateProductFailure());
    }
}

export const addProducts = async(product, dispatch) => {
    dispatch(addProductStart());
    try{
        const res = await userRequest.post(`/products`, {product});
        dispatch(addProductSuccess(res.data));
    }catch(e){
        dispatch(addProductFailure());
    }
}
