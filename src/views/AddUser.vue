s<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Add User</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate">
          Create
        </b-button>
        <span class="text-danger mr-3" v-if="!isValidUserData">
          Please fill all mandatory fields
        </span>
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="User Info">
        <b-row>
          <b-col cols="12" md="9">
            <b-row>
              <b-col cols="12" md="4">
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
              <b-col cols="12" md="4">
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
              <b-col cols="12" md="4">
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
              <b-col cols="12" md="4">
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
                      <b-form-select-option :value="null" disabled>
                        Select Role
                      </b-form-select-option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4" v-if="userInfo.role !== 'ADMIN'">
                <b-form-group label="C & F" label-for="cnf">
                  <b-form-select
                    v-model="userInfo.candF"
                    :options="cAndFOptions"
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null">
                        Select C & F
                      </b-form-select-option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="12"
            md="2"
            offset-md="1"
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

      <b-card class="mt-3" title="Document">
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Type" label-for="type">
              <b-form-select v-model="document.type" :options="documentTypes">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>
                    Select Type
                  </b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Number" label-for="number">
              <b-form-input
                id="number"
                v-model="document.type"
                placeholder="Enter Number"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Attachment" label-for="attachment">
              <b-form-file id="attachment" accept="image/*" />
            </b-form-group>
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
import { mapGetters } from "vuex";
import { get } from "lodash";
import { validateObject } from "@/helpers/utils";

export default {
  name: "AddUser",

  data() {
    return {
      isValidUserData: true,
      formSubmitted: false,
      userInfo: {
        firstName: "",
        lastName: "",
        phone: "",
        role: null,
        candF: null,
        dealership: null
      },
      documentTypes: [
        "Aadhar",
        "Lease agreement",
        "Telephone/Electricity/Water Bill",
        "Self-declaration attested by a gazette officer",
        "Flat allotment/possession letter",
        "LIC policy",
        "Driving license",
        "Voter ID",
        "Passport",
        "Ration Card",
        "House registration document",
        "Bank/Credit card"
      ],
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
      },
      document: { type: null, number: "" }
    };
  },

  computed: {
    ...mapGetters(["isAdmin", "isCAndF", "roles", "allCAndF", "user"]),
    userRoles() {
      if (this.isAdmin) {
        return this.roles;
      }
      if (this.isCAndF) {
        return this.roles.filter(role => role.value !== "ADMIN");
      }
      return this.roles.filter(
        role => role.value !== "ADMIN" && role.value !== "CANDF"
      );
    },
    cAndFOptions() {
      if (this.isAdmin) {
        return this.allCAndF.map(c => ({ value: c.id, text: c.name }));
      }
      return {
        value: get(this.user, "candF.id", null),
        text: get(this.user, "candF.name", null)
      };
    }
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      const isValidUser = validateObject(this.userInfo, [
        "firstName",
        "lastName",
        "phone",
        "role"
      ]);

      const isValidAddress = validateObject(this.address, [
        "houseNo",
        "street",
        "pincode"
      ]);

      const isValidEC = validateObject(this.emergencyContact, [
        "name",
        "phone"
      ]);

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
