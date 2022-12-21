import { useState, FormEvent } from "react";
import { NextPage } from "next";

import { useRequest } from "../../hooks";
import { Errors } from "../../components";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { doRequest, errorMessages } = useRequest({
    url: "/api/users/sign-up",
    method: "post",
    body: { email, password },
    onSuccess: () => router.push("/"),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div className='p-3'>
      <form onSubmit={handleSubmit}>
        <h1 className='mb-3'>Signup</h1>

        <div className='form-group mb-3'>
          <label className='form-label'>Email address</label>
          <input value={email} className='form-control' onChange={(e) => setEmail(e.target.value)}></input>
        </div>

        <div className='form-group mb-3'>
          <label className='form-label'>Password</label>
          <input
            value={password}
            type={"password"}
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        {errorMessages.length > 0 && <Errors errors={errorMessages} />}

        <button type='submit' className='btn btn-primary'>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
