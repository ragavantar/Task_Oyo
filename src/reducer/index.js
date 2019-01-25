const reducer = (state=[], action) => {
if(action.type==='UPDATE'){
    console.log('in reducre, action :', action.payload)
return [...action.payload]
}
}

export default reducer;