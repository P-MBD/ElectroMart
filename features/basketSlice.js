import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'basket',
  initialState:{
        items:[],
        totalPrice:0,
  },
  reducers: {
    addToBasket:(state, action) => {
        const{id, image,name , price }= action.payload
        const itemIndex = state.items.findIndex((item)=>item.id === id)
        if(itemIndex!== -1){
            state.items[itemIndex].quantity += 1
        }else{
            state.items.push({id, image, name, price, quantity:1})
        }
        state.totalPrice += price
    },
    removeFromBasket:(state, action)=>{},
    updateQuantity:(state,action)=> {},
    updateTotalPrice:(state, action)=> {},
    clearBasket:(state) => {}
  },
})

// Action creators are generated for each case reducer function
export const {addToBasket,removeFromBasket,updateQuantity, updateTotalPrice, clearBasket} = basketSlice.actions
export default basketSlice.reducer;