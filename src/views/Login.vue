<template>
  <b-row class="login-page pr-5" align-v="center">
    <b-col cols="4" offset="8">
      <b-card>
        <b-form-group label="Phone" label-for="phone">
          <b-form-input
            id="phone"
            v-model="phone"
            placeholder="Enter Phone"
            :class="{ 'border-danger': isSubmitted && !phone.trim() }"
          />
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            placeholder="Enter Password"
            type="password"
            :class="{ 'border-danger': isSubmitted && !password.trim() }"
          />
        </b-form-group>
        <div class="text-danger mb-2" v-if="isLoginFailed">
          Invalid Credentials
        </div>
        <div class="d-flex justify-content-between">
          <b-button variant="primary" @click="onLogin">
            Login
          </b-button>
          <b-button variant="link" @click="resetPassword"
            >Forgot Password</b-button
          >
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import apiService from "@/apiService";

export default {
  name: "Login",

  data() {
    return {
      isSubmitted: false,
      isLoginFailed: false,
      isValidCredentials: true,
      phone: "",
      password: ""
    };
  },

  created() {
    const token = this.$cookie.get("user_auth");
    if (token) {
      this.$router.replace("/");
    }
  },

  methods: {
    async onLogin() {
      this.isSubmitted = true;
      this.isValidCredentials = this.phone.trim() && this.password.trim();
      if (this.isValidCredentials) {
        try {
          const resp = await apiService.authenticate({
            username: this.phone,
            password: this.password
          });
          this.$cookie.set("user_auth", resp.data.token, { expires: "5h" });
          await this.$store.dispatch("loggedInUser", resp.data.token);
          this.$router.push({ name: "Home" });
        } catch {
          this.isLoginFailed = true;
          this.$bvToast.toast("Authentication Error while logging in...", {
            title: "Error!",
            variant: "danger",
            toaster: "b-toaster-top-center",
            autoHideDelay: 5000
          });
        }
      }
    },
    async resetPassword() {
      try {
        await apiService.reset({
          phone: this.phone,
          newPassword: "newPassword",
          currentPassword: "currentPassword"
        });
        this.$bvToast.toast("New password sent to registered mobile number", {
          title: "Reset Password",
          variant: "success",
          toaster: "b-toaster-top-center",
          autoHideDelay: 10000
        });
      } catch {
        this.$bvToast.toast("Contact technical support...", {
          title: "User not registered!",
          variant: "danger",
          toaster: "b-toaster-top-center",
          autoHideDelay: 5000
        });
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  height: 100%;
}
</style>
