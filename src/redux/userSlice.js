// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userData: JSON.parse(localStorage.getItem("user")) || null
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.userData = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload)); // 🔥 SAVE USER
//     },
//   },
// });

// export const { loginSuccess } = userSlice.actions;
// export default userSlice.reducer;
