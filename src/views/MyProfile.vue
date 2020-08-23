<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage Profile</h1>
    </div>
    <b-row>
      <b-col cols="12" md="3">
        <b-card title="Change Password">
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
              :class="{
                'border-danger': isSubmitted && !currentPassword.trim()
              }"
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
              :class="{
                'border-danger': isSubmitted && !confirmPassword.trim()
              }"
            />
          </b-form-group>
          <div class="d-flex align-items-center">
            <b-button class="my-2" variant="success" @click="onUpdate">
              Update
            </b-button>
            <span class="text-danger ml-3" v-if="!isValidInfo">
              {{ errorMessage }}
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
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
      if (this.newPassword.trim() !== this.confirmPassword.trim()) {
        this.isValidInfo = false;
        this.errorMessage = "New password and confirm password don't match";
      } else if (this.newPassword.length < 8 || this.newPassword.length > 16) {
        this.isValidInfo = false;
        this.errorMessage = "New password should be 8 - 16 characters";
      } else {
        try {
          await this.$store.dispatch("loggedInUser", {
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
          this.resetData();
        } catch {
          this.$bvToast.toast("Please verify credentials", {
            title: "Change Password Failed",
            variant: "danger",
            toaster: "b-toaster-top-center",
            autoHideDelay: 5000
          });
        }
      }
    },
    resetData() {
      this.isSubmitted = false;
      this.isValidInfo = true;
      this.errorMessage = "";
      this.phone = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    }
  }
};
</script>
