import { AuthAPI } from '../../libs/http-service/api/authapi';
import axios from 'axios';
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
const apiClient = axios.create({
  baseURL: process.env.BSECURE_API_URL, // Set base URL from environment variables
});


const useHook = () => {
  const postStripe = async (body) => {
    try {
      const response = await AuthAPI.stripePost(body)
      return response;
    } catch (error) {
      console.error(error)
    }
  }
  const postCOD = async (body) => {
    try {
      const response = await AuthAPI.codPost(body)
      return response;
    } catch (error) {
      console.error(error)
    }
  }
  const postBsecureSession = async (formData) => {
    try {
      // Make a POST request to the endpoint using the configured base URL
      const response = await apiClient.post('/api/payment/initiate', formData);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error posting Bsecure session:', error);
      throw error; // Propagate the error
    }
  };
  

  return {

    postCOD, postStripe, postBsecureSession,

  }

}

export default useHook;
