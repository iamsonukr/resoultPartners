import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (prop) => {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [blogLoading, setBlogLoading] = useState(false)

    // constants
    // const url=import.meta.env.VITE_API_URL
    const url=`https://resoultpartnersbackend.onrender.com`
    // const url = 'http://localhost:5001'

    // 1> Fetch the blogs
    const fetchBlogs = async () => {
        setBlogLoading(true)
        try {
            const response = await axios.get(`${url}/api/blog/blogs`);
            setBlogs(response.data.data);
            // setFilteredBlogs(response.data.data);

            setBlogLoading(false)
        } catch (error) {
            toast.error("Error fetching blogs:", error);
            console.log(error)
            setBlogLoading(false)
        }
    };

    // functions to get the saved name email and token from the localstorage
    const loadToken = async () => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    };

    const loadName = async () => {
        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }
    };

    const loadEmail = async () => {
        if (localStorage.getItem("userEmail")) {
            setUserEmail(localStorage.getItem("userEmail")); // Fixed here
        }
    };

    useEffect(() => {
        loadName();
        loadEmail();
        loadToken();
        fetchBlogs()
    }, [blogs]);

    const contextValue = {
        // functions
        setToken,
        setName,
        setUserEmail,

        // variables
        url,
        token,
        name,
        userEmail,
        blogs,
        blogLoading,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
