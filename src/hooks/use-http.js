import { useState,useCallback } from "react";

const useHttp = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [httpError,setHttpError] = useState(null);

  const sendRequest = useCallback(async (requestConfig,applyData = undefined) => {
    console.log(`sendRequest`)
    try {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(requestConfig.url,{
        method: requestConfig.method ?requestConfig.method: 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
        headers: requestConfig.headers ? requestConfig.headers: {} 
      });

      if(!response.ok) {
        throw new Error('Request failed!');
      }

      const resposeData = await response.json();
      if(applyData) {
        applyData(resposeData);
      }
    } catch (error) {
      setHttpError(error.message || 'Something went wrong!');
      throw error;
    } finally {
      setIsLoading(false);
    }
  },[])

  return {
    isLoading,
    httpError,
    sendRequest
  }
}

export default useHttp;