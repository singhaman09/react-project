
const initialState ={
    employee:[], 
    isFetching: false, 
    errorMessage: null 
}


export const  getEmployeereducer=(state=initialState , action)=>{
    switch(action.type){
        case 'GET_EMPLOYEE_STARTED':{
            return{
                ...state,
                 isFetching:true
            }
        }
        case 'GET_EMPLOYEE_SUCCESS':{
            return{
                ...state,
                employee: action.payload,
                 isFetching:false, 
                 
            }
        }
        case 'GET_EMPLOYEE_FAILURE':{
            return{
                ...state,
                 isFetching:false, 
                 errorMessage:action.payload
                 
            }
        }
    }

}




