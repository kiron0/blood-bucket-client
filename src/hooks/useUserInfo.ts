import { useEffect, useState } from "react";
import { BASE_API } from "../config";
import auth from "../auth/Firebase/Firebase.config";

const useUserInfo = () => {
          const [userInfo, setUserInfo] = useState({} as any);
          const [loading, setLoading] = useState(false);

          useEffect(() => {
                    setLoading(true);
                    fetch(`${BASE_API}/users?uid=${auth?.currentUser?.uid}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    })
                              .then((res) => res.json())
                              .then((data) => {
                                        setUserInfo(data[0]);
                                        setLoading(false);
                              });
          }, []);
          return [userInfo, loading];
};

export default useUserInfo;
