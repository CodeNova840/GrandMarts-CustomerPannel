import { AuthAPI } from '../../libs/http-service/api/authapi';
import toastr from 'toastr';
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };

const useHook = () => {
  const getCategories = async () => {
    try {
      const response = await AuthAPI.getCategory()
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  const getproductlistbyid=async(id,params)=>{
    try{
      const response=await AuthAPI.getProductBysubcategoryId(id,params);
      return response
    }catch(error){
      console.error("error getting product list",error)
    }
  }
    return {

      getCategories,
      getproductlistbyid,
        }

    }

    export default useHook;
