import {getRequest, postRequest} from "../methods/methods";

export const AuthAPI = {
  // admin api usage
  getCategory:async(body)=>await getRequest('api/admin/categories',body),
  getBanner:async(body)=>await getRequest('api/admin/banner-image',body),
// this below is in homepage
  getProductBysubcategoryId:async(id,params)=>await getRequest(`api/admin/products/${id}/products`,params),
  getsingleprofuct:async(id)=>await getRequest(`api/admin/products/${id}`),
  getProductByCategoryId:async(id,params)=>await getRequest(`api/admin/products/${id}/category-products`,params),

  // sub catagory product listing component
  getProductByCategoryIdAdditional:async(id,params)=>await getRequest(`api/admin/products/${id}/productsBySearch`,params),



  // user api usage
  userRegister:async(body)=>postRequest('/api/auth/register',body),
  userlogin:async(body)=>postRequest('/api/auth/login',body),


  // stripe
  stripePost:async(body)=>postRequest(`/api/payment/stripe`,body),
  codPost:async(body)=>postRequest(`/api/order/cod`,body),


};
