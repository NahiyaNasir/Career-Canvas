import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Providers/AuthProvider";
import useAxiosPublic from "./AxiosHooks/useAxiosPublic";

const usePremium = () => {
    const { user } = useContext(AuthContext)
    const axios = useAxiosPublic()
    const [ premium, setPremium] = useState([])
    useEffect(() => {
        if (!user) return;
        const response = axios.get(`/api/PrimiumUser/${user.uid}`);
        response.then(res => {
            if (!res.data) {
                throw new Error("User is not a premium member.");
            }
            setPremium(res.data)
        })
            .catch(err => {
                console.error(err.message);
            });
    }, [user , axios]);
    return {premium};
};

export default usePremium;