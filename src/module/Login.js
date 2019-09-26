import axios from "axios";
import baseURL from "../baseURL";

export default async (email, password, props) => {
  let { data } = await axios.post(baseURL + "/auth/login", {
    email: email,
    password: password
  });

  if (data.success) {
    const { jwt } = data.data;
    await sessionStorage.setItem("token", jwt);

    let { data: getInfoUseJWT } = await axios.get(baseURL + "/auth/me", {
      headers: {
        Authorization: `JWT ${jwt}`
      }
    });
    if (getInfoUseJWT.success) {
      await props.getUserData();
      return true;
    } else {
      alert(getInfoUseJWT.message);
      return false;
    }
  } else {
    return false;
  }
};
