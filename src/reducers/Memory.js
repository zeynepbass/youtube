const INITIAL_STATE={
    yaziListesi:[],
    


};
 const Memory = (state=INITIAL_STATE,action)=>{
    switch (action.type) {

    case 'yaziListesi':
          return {...state,yaziListesi:action.payload}

   
    default:
        return state;
   }
}
export default Memory