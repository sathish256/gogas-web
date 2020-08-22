<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage C&F</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate">
          Create
        </b-button>
        <span class="text-danger mr-3" v-if="!isValidCnfData">
          Please fill all mandatory fields
        </span>
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="C&F Info">
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
                    placeholder="Enter Phone"
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
                    placeholder="Enter owner name"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group label="Owner Phone" label-for="owner-phone">
                  <b-form-input
                    id="owner-phone"
                    v-model="cnfInfo.ownerPhone"
                    :class="{
                      'border-danger':
                        formSubmitted && !cnfInfo.ownerPhone.trim()
                    }"
                    placeholder="Enter Owner Phone"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Office No" label-for="office-no">
              <b-form-input
                id="office-no"
                v-model="address.doorNo"
                :class="{
                  'border-danger': formSubmitted && !address.doorNo.trim()
                }"
                required
                placeholder="Enter Office #"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Street" label-for="streetName">
              <b-form-input
                id="streetName"
                v-model="address.streetName"
                :class="{
                  'border-danger': formSubmitted && !address.streetName.trim()
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validateObject } from "@/helpers/utils";

export default {
  name: "ManageCnF",

  data() {
    return {
      isValidCnfData: true,
      formSubmitted: false,
      cnfInfo: {},
      address: {}
    };
  },

  computed: {
    ...mapGetters(["userUid"])
  },

  created() {
    this.resetData();
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      const isValidCnf = validateObject(this.cnfInfo, [
        "name",
        "phone",
        "ownerName",
        "ownerPhone"
      ]);

      const isValidAddress = validateObject(this.address, [
        "doorNo",
        "streetName",
        "pincode"
      ]);

      this.isValidCnfData = isValidCnf && isValidAddress;

      const cAndF = {
        ...this.cnfInfo,
        address: this.address,
        createdby: this.userUid,
        lastmodifiedby: this.userUid,
        state: "ACTIVE"
      };
      await this.$store.dispatch("createCAndF", cAndF);
      await this.$store.dispatch("fetchAllCAndF");
      this.$bvToast.toast("Created C&F!", {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 2000
      });
      this.resetData();
    },
    resetData() {
      this.formSubmitted = false;
      this.cnfInfo = { name: "", phone: "", ownerName: "", ownerPhone: "" };
      this.address = {
        doorNo: "",
        streetName: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
      };
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
