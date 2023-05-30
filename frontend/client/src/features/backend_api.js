import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addProduct = createAsyncThunk(
    'cartProduct',
    async ({ owner, cart, qty, product, final_price }, thunkAPI) => {
        const body = JSON.stringify({
            owner,
            cart,
            qty,
            product,
            final_price,
        })

        try{
            const res = await fetch('/cartProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();

            if (res.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// export const addCart = createAsyncThunk(
//     'cart',
//     async ({ owner, products, total_products, in_order, for_anonymous_user }, thunkAPI) => {
//         const body = JSON.stringify({
//             owner,
//             products,
//             total_products,
//             in_order,
//             for_anonymous_user,
//         })

//         try{
//             const res = await fetch('/cart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body,
//             })

//             const data = await res.json();

//             if (res.status === 201) {
//                 return data;
//             } else {
//                 return thunkAPI.rejectWithValue(data);
//             }
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data);
//         }
//     }
// );