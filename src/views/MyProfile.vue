<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage Profile</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onUpdate">
          Update
        </b-button>
        <span class="text-danger mr-3" v-if="!isValidInfo">
          {{ errorMessage }}
        </span>
      </div>
    </div>
    <b-card>
      <b-form-group label="Phone" label-for="phone">
        <b-form-input
          id="phone"
          v-model="phone"
          placeholder="Enter phone"
          :class="{ 'border-danger': isSubmitted && !phone.trim() }"
        />
      </b-form-group>
      <b-form-group label="Current Password" label-for="current-password">
        <b-form-input
          id="current-password"
          v-model="currentPassword"
          placeholder="Enter current password"
          type="password"
          :class="{ 'border-danger': isSubmitted && !currentPassword.trim() }"
        />
      </b-form-group>
      <b-form-group label="New Password" label-for="new-password">
        <b-form-input
          id="new-password"
          v-model="newPassword"
          placeholder="Enter new Password (8 - 16 characters)"
          type="password"
          :class="{ 'border-danger': isSubmitted && !newPassword.trim() }"
        />
      </b-form-group>
      <b-form-group label="Confirm Password" label-for="confirm-password">
        <b-form-input
          id="confirm-password"
          v-model="confirmPassword"
          placeholder="Enter Password (8 - 16 characters)"
          type="password"
          :class="{ 'border-danger': isSubmitted && !confirmPassword.trim() }"
        />
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import apiService from "@/apiService";

export default {
  name: "MyProfile",

  data() {
    return {
      isSubmitted: false,
      isValidInfo: true,
      errorMessage: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },

  methods: {
    async onUpdate() {
      this.isSubmitted = true;
      this.isValidInfo =
        this.phone.trim() &&
        this.currentPassword.trim() &&
        this.newPassword.trim();
      if (!this.isValidInfo) {
        this.errorMessage = "Please enter valid credentials";
        return;
      }
      if (this.newPassword.trim() === this.confirmPassword.trim()) {
        try {
          const token = this.$cookie.get("user_auth");
          await apiService.updatePassword(token, {
            phone: this.phone,
            newPassword: this.newPassword,
            currentPassword: this.currentPassword
          });
          this.$bvToast.toast("New password has been updated", {
            title: "Change Password",
            variant: "success",
            toaster: "b-toaster-top-center",
            autoHideDelay: 10000
          });
        } catch {
          this.$bvToast.toast("Please verify credentials", {
            title: "Change Password Failed",
            variant: "danger",
            toaster: "b-toaster-top-center",
            autoHideDelay: 5000
          });
        }
      } else {
        this.isValidInfo = false;
        this.errorMessage = "New password and confirm password should be same";
      }
    }
  }
};
</script>
