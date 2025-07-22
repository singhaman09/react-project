export const getUsersStarted=()=> {
    return({
        type: "GET_EMPLOYEE_STARTED"
    })
}

export const getUsersSuccess=(users)=> {
    return({
        type: "GET_EMPLOYEE_SUCCESS",
        payload: users
    })
}

export const getUsersFailure=(errorMessage)=> {
    return({
        type: "GET_EMPLOYEE_FAILURE", 
        payload: errorMessage
    })
}

