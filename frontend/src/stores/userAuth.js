import {create} from 'zustand'
import axios from 'axios';

export const userAuth=create(set=>({
    currentUser:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    login:async(userCredWithRole)=>{
        const {role,...userCredObj}=userCredWithRole;
        try{
            //set loading true
            set({loading:true,error:null});
            //make api calls
            let res=await axios.post("http://localhost:4000/common-api/login",userCredObj,{withCredentials:true});
            console.log("res is",res);
            set({
                loading:false,
                error:null,
                isAuthenticated:true,
                currentUser:res.data.payload,
            });
        }catch(err){
            console.log("err is",err);
            set({
                loading:false,
                error:err,
                currentUser:null,
                isAuthenticated:false,
            })
        }
    },
    logout:async()=>{
                try{
            //set loading true
            set({loading:true,error:null});
            //make api calls
            let res=await axios.post("http://localhost:4000/common-api/logout",{},{withCredentials:true});
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
            });   
        }catch(err){
            console.log("err is",err);
            set({
                loading:false,
                error:err,
                currentUser:null,
                isAuthenticated:true,
            })
        }
    

    },
    // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  }

}))