import { createSlice } from "@reduxjs/toolkit";


const moiveSlice = createSlice({
    name: "moive",
    initialState: {
      moives: {
        allMoives: null,
        isFetching: false,
        error: false,
       
      },
      
      msg: "",
      success: null,
    },
    reducers:{
        // get All moives
        getMoivesStart: (state)=>{
            state.moives.isFetching = true;
        },
        getMoivesSuccsess: (state,action)=>{
            state.moives.isFetching = false;
            state.moives.allMoives = action.payload.moives;

        },
        getMoivesFailed: (state)=>{
            state.moives.error = true;
        },
    }



});
export const{
    getMoivesStart, getMoivesSuccsess, getMoivesFailed
} = moiveSlice.actions;
export default moiveSlice.reducer;