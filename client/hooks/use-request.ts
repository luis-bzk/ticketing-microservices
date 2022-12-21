import { useState } from "react";
import axios from "axios";
import { IError } from "../interfaces";

type validApiMethods = "get" | "post" | "put" | "delete";

interface PropsRequest {
  url: string;
  method: validApiMethods;
  body: {};
  onSuccess: () => void;
}

export const useRequest = ({ url, method, body, onSuccess }: PropsRequest) => {
  const [errorMessages, setErrorMessages] = useState<Array<IError>>([]);

  const doRequest = async () => {
    try {
      const { data } = await axios[method](url, body);

      if (onSuccess) {
        onSuccess();
      }

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
