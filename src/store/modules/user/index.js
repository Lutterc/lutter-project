import { defineStore } from "pinia";
import { login as userLogin } from "@/api/user";
import { setToken, clearToken } from "@/utils/auth";

const useUserStore = defineStore("user", {
  state: () => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: "",
  }),

  actions: {
    // Login
    async login(loginForm) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
  },
});

export default useUserStore;
