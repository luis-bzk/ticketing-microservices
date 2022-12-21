import { useState } from "react";
import axios from "axios";
import { IError } from "../interfaces";

type validApiMethods = "get" | "post" | "put" | "delete";

interface PropsRequest {
  url: string;
  method: validApiMethods;
  body: {};
}

export const useRequest = ({ url, method, body }: PropsRequest) => {
  const [errorMessages, setErrorMessages] = useState<Array<IError>>([]);

  const doRequest = async () => {
    try {
      const { data } = await axios[method](url, body);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessages(error.response?.data.errors);
      }

      setTimeout(() => {
        setErrorMessages([]);
      }, 5000);
    }
  };

  return { doRequest, errorMessages };
};
