<template>
  <div class="login-page d-flex align-items-center justify-content-end">
    <b-card>
      <b-form @submit.prevent="onLogin">
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
            autocomplete="on"
            :class="{ 'border-danger': isSubmitted && !password.trim() }"
          />
        </b-form-group>
        <div class="text-danger mb-2" v-if="!isValidCredentials">
          Invalid Credentials
        </div>
        <div class="d-flex justify-content-between">
          <b-button variant="primary" type="submit">Login</b-button>
          <b-button variant="link" @click="resetPassword">
            Forgot Password
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import apiService from "@/apiService";

export default {
  name: "Login",

  data() {
    return {
      isSubmitted: false,
      isValidCredentials: true,
      phone: "",
      password: ""
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn"])
  },

  created() {
    if (this.isLoggedIn) {
      this.$router.replace("/");
    }
  },

  methods: {
    async onLogin() {
      this.isSubmitted = true;
      this.isValidCredentials = this.phone.trim() && this.password.trim();
      if (this.isValidCredentials) {
        try {
          await this.$store.dispatch("authenticate", {
            username: this.phone,
            password: this.password
          });
          await this.$store.dispatch("loggedInUser");
          this.$router.push({ name: "Home" });
        } catch {
          this.isValidCredentials = false;
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

<style scoped lang="scss">
.login-page {
  height: 100%;
  width: 100%;
}
@media (max-width: 768px) {
  .login-page {
    justify-content: center !important;
  }
}
@media (min-width: 768px) {
  .login-page {
    padding-right: 3rem;
    .card {
      width: 20%;
    }
  }
}
</style>
