import { FC } from "react";
import { IError } from "../interfaces";

interface Props {
  errors: Array<IError>;
}

export const Errors: FC<Props> = ({ errors }) => {
  return (
    <div className='alert alert-danger mb-3'>
      <h4>Ooops....</h4>

      <ul className='my-0'>
        {errors.map((error) => {
          return <li key={error.message}>{error.message}</li>;
        })}
      </ul>
    </div>
  );
};
