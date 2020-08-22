<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage Dealership</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate">
          Create
        </b-button>
        <span class="text-danger mr-3" v-if="!isValidDealershipData">
          Please fill all mandatory fields
        </span>
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="Dealer Ship">
        <b-row>
          <b-col cols="12" md="12">
            <b-row>
              <b-col cols="12" md="3">
                <b-form-group label="Name" label-for="name">
                  <b-form-input
                    id="name"
                    v-model="dealerInfo.name"
                    :class="{
                      'border-danger': formSubmitted && !dealerInfo.name.trim()
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
                    v-model="dealerInfo.phone"
                    required
                    :class="{
                      'border-danger': formSubmitted && !dealerInfo.phone.trim()
                    }"
                    placeholder="Enter Phone"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Owner Name" label-for="owner-name">
                  <b-form-input
                    id="owner-name"
                    v-model="dealerInfo.ownerName"
                    required
                    :class="{
                      'border-danger':
                        formSubmitted && !dealerInfo.ownerName.trim()
                    }"
                    placeholder="Enter owner name"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group label="Owner Phone" label-for="owner-phone">
                  <b-form-input
                    id="owner-phone"
                    v-model="dealerInfo.ownerPhone"
                    :class="{
                      'border-danger':
                        formSubmitted && !dealerInfo.ownerPhone.trim()
                    }"
                    placeholder="Enter Owner Phone"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <div class="mt-3">
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group label="Office No" label-for="office-no">
                <b-form-input
                  id="office-no"
                  v-model="address.houseNo"
                  :class="{
                    'border-danger': formSubmitted && !address.houseNo.trim()
                  }"
                  required
                  placeholder="Enter Office #"
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
  name: "ManageDelearship",

  data() {
    return {
      isValidDealershipData: true,
      formSubmitted: false,
      dealerInfo: {
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
      const isValidDealership = validateObject(this.dealerInfo, [
        "name",
        "phone",
        "ownerName",
        "ownerPhone"
      ]);

      const isValidAddress = validateObject(this.address, [
        "houseNo",
        "street",
        "pincode"
      ]);

      this.isValidDealershipData = isValidDealership && isValidAddress;
    }
  }
};
</script>
