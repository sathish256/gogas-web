<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage CnF</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate"
          >Create</b-button
        >
        <span class="text-danger mr-3" v-if="!isValidCnfData"
          >Please fill all mandatory fields</span
        >
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="Cnf Info">
        <b-row>
          <b-col cols="12" md="12">
            <b-row>
              <b-col cols="12" md="3">
                <b-form-group label="Name" label-for="name">
                  <b-form-input
                    id="name"
                    v-model="cnfInfo.name"
                    :class="{
                      'border-danger': formSubmitted && !cnfInfo.name.trim()
                    }"
                    required
                    placeholder="Enter name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Phone" label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="cnfInfo.phone"
                    required
                    :class="{
                      'border-danger': formSubmitted && !cnfInfo.phone.trim()
                    }"
                    placeholder="center owner number"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Owner Name" label-for="owner-name">
                  <b-form-input
                    id="owner-name"
                    v-model="cnfInfo.ownerName"
                    required
                    :class="{
                      'border-danger':
                        formSubmitted && !cnfInfo.ownerName.trim()
                    }"
                    placeholder="owner name"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group label="Owner Phone" label-for="owner-phone">
                  <b-form-input
                    id="owner-phone"
                    v-model="cnfInfo.ownerPhone"
                    :class="{
                      'border-danger': formSubmitted && !cnfInfo.ownerPhone
                    }"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <div class="mt-3">
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
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { validateObject } from "@/helpers/utils";

export default {
  name: "ManageCnF",

  data() {
    return {
      isValidCnfData: true,
      formSubmitted: false,
      cnfInfo: {
        name: "",
        phone: "",
        ownerName: "",
        ownerPhone: ""
      },
      address: {
        houseNo: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
      }
    };
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      const isValidCnf = validateObject(this.cnfInfo, [
        "centerName",
        "centerOwnerNumber",
        "centerContactNumber",
        "ownerName",
        "emailId"
      ]);

      const isValidAddress = validateObject(this.address, [
        "houseNo",
        "street",
        "pincode"
      ]);

      this.isValidCnfData = isValidCnf && isValidAddress;
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
