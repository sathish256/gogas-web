<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Manage Dealership</h1>
      <b-button
        class="my-2"
        variant="primary"
        @click="addOrEdit = true"
        v-if="!addOrEdit"
        >Add New Dealership</b-button
      >
    </div>
    <div class="form-layout pr-4">
      <b-card v-if="addOrEdit">
        <div class="d-flex justify-content-between">
          <b-card-title>Dealership</b-card-title>
          <div class="d-flex flex-row-reverse align-items-center">
            <b-button class="my-2" variant="outline-danger" @click="resetData"
              >Cancel</b-button
            >
            <b-button class="my-2 mr-3" variant="success" @click="onCreate">{{
              dealerInfo.id ? "Update" : "Create"
            }}</b-button>
            <span class="text-danger mr-3" v-if="!isValidDealershipData"
              >Please fill all mandatory fields</span
            >
          </div>
        </div>
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
                placeholder="Enter phone"
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
                  'border-danger': formSubmitted && !dealerInfo.ownerName.trim()
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
                placeholder="Enter owner phone"
              />
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
            <b-form-group label="Street" label-for="street">
              <b-form-input
                id="street"
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
            <b-form-group label="C & F" label-for="cAndF">
              <b-form-input
                v-if="isCAndF"
                id="cAndF"
                :value="selectedCAndF.name"
              />
              <b-form-select
                v-else
                id="cAndF"
                :class="{
                  'border-danger': formSubmitted && !dealerInfo.cAndFId
                }"
                v-model="dealerInfo.cAndFId"
                :options="allCAndF"
                value-field="id"
                text-field="name"
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled
                    >Select C & F</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Status" label-for="status">
              <b-form-checkbox
                id="status"
                v-model="dealerInfo.status"
                switch
                size="lg"
                :state="dealerInfo.status"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="primary" @click="openAllocationModal"
          >Product Allocation</b-button
        >
      </b-card>
    </div>
    <div>
      <b-card class="mt-3" title="All Dealerships">
        <b-table
          class="mt-3"
          head-variant="light"
          sticky-header
          :bordered="true"
          :fixed="true"
          :items="allDealership"
          :fields="tableFields"
          :show-empty="true"
          empty-text="No lists Available"
        >
          <template v-slot:cell(name)="row">{{ row.item.name }}</template>
          <template v-slot:cell(address)="row">
            {{ row.item.address.doorNo }}, {{ row.item.address.streetName }},
            {{ row.item.address.locality }}, {{ row.item.address.city }},
            {{ row.item.address.pincode }}
          </template>
          <template v-slot:cell(status)="row">
            <div class="d-flex justify-content-between">
              {{ status[row.item.status] }}
              <button
                vatiant="primary"
                size="sm"
                class="mr-2"
                @click="onEdit(row.index)"
              >
                <b-icon icon="pencil" />
              </button>
            </div>
          </template>
        </b-table>
      </b-card>
    </div>
    <b-modal id="allocation-modal" centered title="Product Allocation">
      <b-row v-if="manageAllocation.length > 0">
        <b-col cols="6">Product</b-col>
        <b-col cols="4">Quantity</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row
        v-for="(allocation, index) in manageAllocation"
        :key="index"
        class="mb-2"
      >
        <b-col cols="6">
          <b-form-select
            v-model="allocation.productId"
            :options="products"
            text-field="name"
            value-field="id"
            :class="{
              'border-danger': !validAllocations && !allocation.productId
            }"
          />
        </b-col>
        <b-col cols="4">
          <b-form-input
            v-model="allocation.quantity"
            type="number"
            min="1"
            :class="{
              'border-danger':
                !validAllocations &&
                (!allocation.quantity || allocation.quantity < 1)
            }"
          />
        </b-col>
        <b-col cols="2">
          <b-button variant="danger" @click="onDeleteProduct(index)">
            <b-icon icon="trash" />
          </b-button>
        </b-col>
      </b-row>
      <b-button size="sm" variant="link" @click="onAddProduct"
        >Add Product</b-button
      >
      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="success" @click="saveAllocation">Save</b-button>
        <b-button variant="outline-danger" @click="cancel">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
import { validateObject } from "@/helpers/utils";

export default {
  name: "ManageDealership",

  data() {
    return {
      tableFields: [
        "name",
        "address",
        { key: "owner", label: " Owner Details" },
        "status"
      ],
      addOrEdit: false,
      dealerAllocation: [],
      manageAllocation: [],
      validAllocations: true,
      isValidDealershipData: true,
      formSubmitted: false,
      dealerInfo: {},
      address: {}
    };
  },

  created() {
    this.resetData();
  },

  computed: {
    ...mapGetters([
      "isAdmin",
      "isCAndF",
      "userId",
      "allCAndF",
      "allDealership",
      "userCAndFId",
      "products",
      "status"
    ]),
    selectedCAndF() {
      return this.allCAndF.find(cAndF => cAndF.id === this.userCAndFId);
    }
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      const isValidDealership = validateObject(this.dealerInfo, [
        "name",
        "phone",
        "ownerName",
        "ownerPhone",
        "cAndFId"
      ]);
      const isValidAddress = validateObject(this.address, [
        "doorNo",
        "streetName",
        "pincode"
      ]);
      this.isValidDealershipData = isValidDealership && isValidAddress;
      if (!this.isValidDealershipData) {
        return;
      }
      const dealership = {
        ...this.dealerInfo,
        address: this.address,
        dealerAllocation: this.dealerAllocation,
        candfId: this.isAdmin ? this.dealerInfo.cAndFId : this.userCAndFId,
        createdBy: this.dealerInfo.id ? this.dealerInfo.createdBy : this.userId,
        lastmodifiedBy: this.userId,
        status: this.dealerInfo.status ? "ACTIVE" : "INACTIVE"
      };
      await this.$store.dispatch(
        dealership.id ? "updateDealership" : "createDealership",
        dealership
      );
      await this.$store.dispatch("fetchAllDealership");
      this.$bvToast.toast(
        `${dealership.id ? "Update" : "Created"} Dealership!`,
        {
          title: "Success",
          variant: "success",
          toaster: "b-toaster-top-center",
          autoHideDelay: 2000
        }
      );
      this.resetData();
    },
    openAllocationModal() {
      this.$bvModal.show("allocation-modal");
      this.manageAllocation = cloneDeep(this.dealerAllocation);
    },
    onAddProduct() {
      this.manageAllocation.push({ productId: null, quantity: 1 });
    },
    onDeleteProduct(index) {
      this.manageAllocation.splice(index, 1);
    },
    saveAllocation() {
      this.validAllocations = this.dealerAllocation.every(
        allocation => !!allocation.productId && allocation.quantity > 0
      );
      if (this.validAllocations) {
        this.dealerAllocation = cloneDeep(this.manageAllocation);
        this.$bvModal.hide("allocation-modal");
      }
    },
    onEdit(index) {
      this.addOrEdit = true;
      const selectedDealer = cloneDeep(this.allDealership[index]);
      this.dealerInfo = {
        id: selectedDealer.id,
        name: selectedDealer.name ? selectedDealer.name : "",
        phone: selectedDealer.phone ? selectedDealer.phone : "",
        ownerPhone: selectedDealer.ownerPhone ? selectedDealer.ownerPhone : "",
        ownerName: selectedDealer.ownerName ? selectedDealer.ownerName : "",

        status: selectedDealer.status === "ACTIVE"
      };

      this.address = selectedDealer.address;
    },
    resetData() {
      this.addOrEdit = false;
      this.dealerAllocation = [];
      this.manageAllocation = [];
      this.formSubmitted = false;
      this.dealerInfo = {
        name: "",
        phone: "",
        ownerName: "",
        ownerPhone: "",
        cAndFId: null,
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
