import Axios from "../../axios";

const name = "auth";
const state = {
  token: localStorage.getItem("userToken"),
};

const getters = {};

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
};

const actions = {
  Login(_, payload) {
    return new Promise((resolve, reject) => {
      try {
        let login = new FormData();
        login.append("email", payload.email);
        login.append("password", payload.password);

        Axios.request({
          url: 'auth/login',
          method: 'post',
          data: login
        }).then(res => {
          localStorage.setItem('token', res.data.token)
          resolve(res.data)
        })
      } catch (error) {
        const err = error.response;
        reject({ err });
      }
    });
  },
};

export default {
  namespaced: true,
  name,
  state,
  mutations,
  actions,
  getters,
};
