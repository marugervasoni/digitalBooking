import { TYPES } from "../actions/actionsUser";
// Estoy modificando el useReducer para tener toda la info del usuario en un solo lugar
export function reducerUser(state, action) {
  switch (action.type) {
    case TYPES.ADD_USERS: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case TYPES.LOG_USER: {
      return {
        ...state,
        infoUser: action.payload,
        log: true,
        //token: action.payload,
      };
    }
    case TYPES.VERIFIED_USER: {
      const user = state.users.find((u) => u.idGenerate === action.payload);
      const updatedUser = {
        ...user,
        isVerified: true,
      };
      const updatedUsers = state.users.map((u) =>
        u.idGenerate === action.payload ? updatedUser : u
      );
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case TYPES.ADD_FAV_USER: {
      const { payloadEmail, payloadFav } = action;
      const userIndex = state.users.findIndex((u) => u.email === payloadEmail);
      if (userIndex === -1) {
        return state;
      }
      const updatedUser = { ...state.users[userIndex] };
      if (!updatedUser.favUser.some((fav) => fav.id === payloadFav.id)) {
        updatedUser.favUser = [...updatedUser.favUser, payloadFav];
      }
      const updatedUsers = [
        ...state.users.slice(0, userIndex),
        updatedUser,
        ...state.users.slice(userIndex + 1),
      ];
      const updatedInfoUser = {
        ...state.infoUser,
        favUser: [...state.infoUser.favUser, payloadFav],
      };
      return {
        ...state,
        users: updatedUsers,
        infoUser: updatedInfoUser,
      };
    }
    case TYPES.REMOVE_FAV_USER: {
      const { payloadEmail, payloadFavId } = action;

      const userIndex = state.users.findIndex((u) => u.email === payloadEmail);
      if (userIndex === -1) {
        return state;
      }

      const updatedUser = { ...state.users[userIndex] };

      const favIndex = updatedUser.favUser.findIndex(
        (fav) => fav.id === payloadFavId
      );
      if (favIndex === -1) {
        return state;
      }

      updatedUser.favUser.splice(favIndex, 1);

      const updatedInfoUser = { ...state.infoUser };

      const infoFavIndex = updatedInfoUser.favUser.findIndex(
        (fav) => fav.id === payloadFavId
      );
      if (infoFavIndex !== -1) {
        updatedInfoUser.favUser.splice(infoFavIndex, 1);
      }

      const updatedUsers = [
        ...state.users.slice(0, userIndex),
        updatedUser,
        ...state.users.slice(userIndex + 1),
      ];

      const updatedState = {
        ...state,
        users: updatedUsers,
        infoUser: updatedInfoUser,
      };

      return updatedState;
    }
    case TYPES.LOG_OUT_USER: {
      return {
        ...state,
        infoUser: {},
        log: false,
        //token: "",
      };
    }
    default: {
      throw new Error("Hubo un error en las credenciales del usuario");
    }
  }
}
/*
dispatchUser({
  type: TYPES.ADD_FAV_USER,
  payload: {
    email: "ejemplo@gmail.com",
    product:  { id, img, category, title, location, description },
  },
});
*/
