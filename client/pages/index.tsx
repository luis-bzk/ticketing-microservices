import { NextPage } from "next";
import { GetServerSideProps } from "next";
import axios from "axios";

import { IUser } from "../interfaces";

interface Props {
  currentUser: IUser;
}

const HomePage: NextPage<Props> = ({ currentUser }) => {
  // const getCurrentUser = async () => {
  //   const response = await axios.get("/api/users/current-user"); // your fetch function here
  //   console.log(response);
  // };
  // getCurrentUser();
  console.log(currentUser);
  return (
    <div>
      <h1>Aqui en el home perros</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user"
  ); // your fetch function here
  console.log(response);

  return {
    props: {
      currentUser: response?.data || null,
    },
  };
};

/**
 * http://NAME_SERVICE.NAMESPACE.svc.cluster.local
 * http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
 */
export default HomePage;
