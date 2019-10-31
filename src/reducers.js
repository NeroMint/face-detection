import { INSERT_IMAGE_LINK, 
         INSERT_EMAIL, 
        INSERT_PASS, 
        INSERT_NAME_REGISTER, 
        INSERT_EMAIL_REGISTER, 
        INSERT_PASS_REGISTER} from "./constants";

const initialState = {imageLink: '',
                      userEmail: '' ,
                      userPass: '',
                      registerName : '',
                      registerEmail: '',
                      registerPass: ''   
                    };

export const detectFaces = (state = initialState, action = {}) => {
    switch (action.type){
        case INSERT_IMAGE_LINK:
            return Object.assign({},state, {imageLink : action.payload});
        default:
            return state;
    }        
}

export const signin = (state = initialState, action = {}) => {
    switch (action.type){
        case INSERT_EMAIL:
            return Object.assign({}, state, {userEmail: action.payload});
        case INSERT_PASS:
            return Object.assign({},state, {userPass: action.payload});
        default:
            return state;
    }
}


export const register = (state = initialState, action = {}) => {
    //console.log('reducers',action.payload);
    switch (action.type){
        case INSERT_NAME_REGISTER:
            return Object.assign({}, state, {registerName: action.payload});
        case INSERT_EMAIL_REGISTER:
            return Object.assign({},state, {registerEmail: action.payload});
        case INSERT_PASS_REGISTER:
            return Object.assign({},state, {registerPass: action.payload});
        default:
            return state;
    }
}