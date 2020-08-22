<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage C & F</h1>
      <b-button
        class="my-2"
        variant="primary"
        @click="addOrEdit = true"
        v-if="!addOrEdit"
      >
        Add New C & F
      </b-button>
      <div v-if="addOrEdit" class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate">
          {{ cnfInfo.id ? "Update" : "Create" }}
        </b-button>
        <span class="text-danger mr-3" v-if="!isValidCnfData">
          Please fill all mandatory fields
        </span>
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card v-if="addOrEdit" title="C & F Info">
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
                  'border-danger': formSubmitted && !cnfInfo.ownerName.trim()
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
                  'border-danger': formSubmitted && !cnfInfo.ownerPhone.trim()
                }"
                placeholder="Enter Owner Phone"
              ></b-form-input>
            </b-form-group>
          </b-col>
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
          <b-col cols="12" md="3">
            <b-form-group label="Status" label-for="status">
              <b-form-checkbox
                id="status"
                v-model="cnfInfo.status"
                switch
                size="lg"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mt-3" title="All C & F">
        <b-table
          class="mt-3"
          head-variant="light"
          sticky-header
          :bordered="true"
          :fixed="true"
          :items="allCAndF"
          :fields="tableFields"
          :show-empty="true"
          empty-text="No C & F Available"
        >
          <template v-slot:cell(owner)="row">
            {{ row.item.ownerName }} ({{ row.item.ownerPhone }})
          </template>
          <template v-slot:cell(address)="row">
            {{ row.item.address.doorNo }}, {{ row.item.address.streetName }},
            {{ row.item.address.locality }}, {{ row.item.address.city }} -
            {{ row.item.address.pincode }}
          </template>
          <template v-slot:cell(status)="row">
            <div class="d-flex justify-content-between">
              {{ status[[row.item.status]] }}
              <b-button
                variant="primary"
                size="sm"
                class="mr-2"
                @click="onEdit(row.index)"
              >
                <b-icon icon="pencil" />
              </b-button>
            </div>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
import { validateObject } from "@/helpers/utils";

export default {
  name: "ManageCnF",

  data() {
    return {
      tableFields: [
        "name",
        "address",
        { key: "owner", label: "Owner Details" },
        "status"
      ],
      isValidCnfData: true,
      formSubmitted: false,
      addOrEdit: false,
      cnfInfo: {},
      address: {}
    };
  },

  computed: {
    ...mapGetters(["userUid", "allCAndF", "status"])
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
      if (!this.isValidCnfData) {
        return;
      }
      const cAndF = {
        ...this.cnfInfo,
        address: this.address,
        createdBy: this.cnfInfo.id ? this.userUid : this.cnfInfo.createdBy,
        lastmodifiedBy: this.userUid,
        status: this.cnfInfo.status ? "ACTIVE" : "INACTIVE"
      };
      await this.$store.dispatch(
        cAndF.id ? "updateCAndF" : "createCAndF",
        cAndF
      );
      await this.$store.dispatch("fetchAllCAndF");
      this.$bvToast.toast(`${cAndF.id ? "Update" : "Created"} C&F!`, {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 2000
      });
      this.resetData();
    },
    onEdit(index) {
      this.addOrEdit = true;
      const selectedCAndF = cloneDeep(this.allCAndF[index]);
      this.cnfInfo = {
        id: selectedCAndF.id,
        name: selectedCAndF.name ? selectedCAndF.name : "",
        phone: selectedCAndF.phone ? selectedCAndF.phone : "",
        ownerPhone: selectedCAndF.ownerPhone ? selectedCAndF.ownerPhone : "",
        ownerName: selectedCAndF.ownerName ? selectedCAndF.ownerName : "",
        status: selectedCAndF.status === "ACTIVE"
      };
      this.address = selectedCAndF.address;
    },
    resetData() {
      this.formSubmitted = false;
      this.cnfInfo = {
        name: "",
        phone: "",
        ownerName: "",
        ownerPhone: "",
        status: true
      };
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
