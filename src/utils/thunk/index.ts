export default function TotalCreateAsyncThunk () {
    return function Async (val:any) {             
            return async function (arg,thunk){
            
                    try{
                       const response = await Async(arg);
                       return response      
                    }
                    catch (err){
                        return thunk.rejectWithValue(err);
                    }
            }
    }   
}