export const reducer = (state, action) => {

    switch (action.type) {

        case "USER_LOGIN": {

            if (action.payload?.firstName
                && action.payload?.lastName
                && action.payload?.isAdmin
                && action.payload?.email
                && action.payload?._id

            ) {

                const role = (action.payload?.isAdmin) ? "admin" : "student";
                const user = {
                    firstName: action.payload?.firstName,
                    lastName: action.payload?.lastName,
                    isAdmin: action.payload?.isAdmin,
                    profilePic: action.payload?.profilePic,
                    coverPicture: action.payload?.coverPicture,
                    email: action.payload?.email,
                    _id: action.payload?._id
                }

                return { ...state, isLogin: true, role: role, user: user }
            }

        }
        case "USER_LOGOUT": {
            return { ...state, isLogin: false, role: null, user: {} }
        }
        case "CHANGE_THEME": {
            return { ...state, darkTheme: !state.darkTheme }
        }
        case "CHANGE_NAME": {
            console.log("changing name");

            if (typeof action.payload === 'string'
                && action.payload.trim().length < 20
                && action.payload.trim().length > 3) {
                return { ...state, name: action.payload }
            } else {
                return state
            }
        }

        default: {
            return state
        }
    }
}