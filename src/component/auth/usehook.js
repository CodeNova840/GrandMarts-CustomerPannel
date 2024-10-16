// auth/login
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


  const RegisterUser = async (body) => {
    try {
      const response = await AuthAPI.userRegister(body)
      return response;
    } catch (error) {
      console.error(error)
    }
  }
  const loginUser = async (body) => {
    try {
      const response = await AuthAPI.userlogin(body)
      return response;
    } catch (error) {
      console.error(error)
    }
  }

    return {

      RegisterUser,
      loginUser,
        }

    }

    export default useHook;
