import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'; 
//Whenever app gets booted up it runs all the reducers once so initial state is null
const INITIAL_STATE = {
	isSignedIn: false,
	token: null,
	message: "",
	email: "",
};  

//NEW API V2 Login
const authReducer=(state=INITIAL_STATE,action)=>{
	switch(action.type) {
		case "SIGN_IN":
			return {...state, isSignedIn: true, email: action.payload.email,token: action.payload.request.data.loginUser.token};
		case "SIGN_OUT":
			// return {...state,isSignedIn:false, userId:null,token:null,message:"",dStatus:""};
			if(state.isSignedIn){
				storage.removeItem('persist:auth');
				state=undefined;
				return (state=INITIAL_STATE);
			}
		case "CLEAR_SIGN_IN":
			// return {...state,isSignedIn:false, userId:null,token:null,message:"",dStatus:""};
			if("state.isSignedIn"){
				storage.removeItem('persist:auth');
				state=undefined;
				return (state=INITIAL_STATE);
			}
		default:
			return state;
	}
};

const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: []
};

export default persistReducer(persistConfig, authReducer);