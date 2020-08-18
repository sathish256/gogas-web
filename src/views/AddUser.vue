<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Add User</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate"
          >Create</b-button
        >
        <span class="text-danger mr-3" v-if="!isValidUserData"
          >Please fill all mandatory fields</span
        >
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="User Info">
        <b-row>
          <b-col cols="12" md="6">
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group label="First Name" label-for="first-name">
                  <b-form-input
                    id="first-name"
                    v-model="userInfo.firstName"
                    :class="{
                      'border-danger':
                        formSubmitted && !userInfo.firstName.trim()
                    }"
                    required
                    placeholder="Enter first name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group label="Last Name" label-for="last-name">
                  <b-form-input
                    id="last-name"
                    v-model="userInfo.lastName"
                    required
                    :class="{
                      'border-danger':
                        formSubmitted && !userInfo.lastName.trim()
                    }"
                    placeholder="Enter last name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group label="Phone" label-for="user-phone">
                  <b-form-input
                    id="user-phone"
                    v-model="userInfo.phone"
                    required
                    :class="{
                      'border-danger': formSubmitted && !userInfo.phone.trim()
                    }"
                    placeholder="Enter phone"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group label="Role" label-for="role">
                  <b-form-select
                    required
                    v-model="userInfo.role"
                    :options="userRoles"
                    :class="{
                      'border-danger': formSubmitted && !userInfo.role
                    }"
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null" disabled
                        >Select Role</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="12"
            md="2"
            offset-md="4"
            class="d-flex flex-column justify-content-center"
          >
            <b-img
              thumbnail
              src="https://picsum.photos/250/250/?image=54"
              alt="Avatar"
            />
            <b-button variant="primary">Upload</b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mt-3" title="Address">
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="House No" label-for="House-no">
              <b-form-input
                id="house-no"
                v-model="address.houseNo"
                :class="{
                  'border-danger': formSubmitted && !address.houseNo.trim()
                }"
                required
                placeholder="Enter house #"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Street" label-for="street">
              <b-form-input
                id="street"
                v-model="address.street"
                :class="{
                  'border-danger': formSubmitted && !address.street.trim()
                }"
                required
                placeholder="Enter street"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Locality" label-for="locality">
              <b-form-input
                id="locality"
                v-model="address.locality"
                required
                placeholder="Enter locality"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="City" label-for="city">
              <b-form-input
                id="city"
                v-model="address.city"
                required
                placeholder="Enter city"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="State" label-for="state">
              <b-form-input
                id="state"
                v-model="address.state"
                required
                placeholder="Enter state"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="PIN" label-for="pin">
              <b-form-input
                id="pin"
                v-model="address.pincode"
                :class="{
                  'border-danger': formSubmitted && !address.pincode.trim()
                }"
                required
                placeholder="Enter pincode"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mt-3 mb-5" title="Emergency Contact">
        <b-form>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group label="Name" label-for="emergency-name">
                <b-form-input
                  id="emergency-name"
                  v-model="emergencyContact.name"
                  :class="{
                    'border-danger':
                      formSubmitted && !emergencyContact.name.trim()
                  }"
                  required
                  placeholder="Enter name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group label="Phone" label-for="emergency-phone">
                <b-form-input
                  id="emergency-phone"
                  v-model="emergencyContact.phone"
                  :class="{
                    'border-danger':
                      formSubmitted && !emergencyContact.phone.trim()
                  }"
                  required
                  placeholder="Enter phone"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddUser",

  data() {
    return {
      isValidUserData: true,
      formSubmitted: false,
      userInfo: { firstName: "", lastName: "", phone: "", role: null },
      userRoles: ["C & F", "Dealer", "Marketing", "Delivery"],
      address: {
        houseNo: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
      },
      emergencyContact: {
        name: "",
        phone: ""
      }
    };
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      const isValidUser =
        this.userInfo.firstName &&
        this.userInfo.lastName &&
        this.userInfo.phone &&
        this.userInfo.role;
      const isValidAddress =
        this.address.houseNo && this.address.street && this.address.pincode;
      const isValidEC =
        this.emergencyContact.name && this.emergencyContact.phone;

      this.isValidUserData = isValidUser && isValidAddress && isValidEC;
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 4px #888;
}
.form-layout {
  max-height: calc(100vh - 126px);
  overflow: auto;
}
</style>
