<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Customer Registration</h1>
      <b-button class="my-2" variant="success" @click="onRegister">
        Register
      </b-button>
    </div>
    <div class="form-layout pr-4">
      <b-card title="Organisation Information">
        <b-form>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Name" label-for="org-name">
                <b-form-input
                  id="org-name"
                  v-model="organisation.name"
                  :class="{
                    'border-danger': formSubmitted && !organisation.name.trim()
                  }"
                  required
                  placeholder="Enter name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label="Landmark" label-for="org-landmark">
                <b-form-input
                  id="org-landmark"
                  v-model="organisation.landmark"
                  placeholder="Enter landmark"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Address" label-for="org-address">
                <b-form-textarea
                  id="org-address"
                  v-model="organisation.address"
                  :class="{
                    'border-danger':
                      formSubmitted && !organisation.address.trim()
                  }"
                  required
                  rows="3"
                  placeholder="Enter address"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group>
                <label>
                  Geo Location
                  <b-icon icon="joystick" @click="getCurrentLocation" />
                </label>
                <b-form-input
                  id="org-geolocation"
                  v-model="organisation.geolocation.latitude"
                  placeholder="latitude"
                  disabled
                />
                <b-form-input
                  class="mt-2"
                  id="org-geolocation"
                  v-model="organisation.geolocation.longitude"
                  placeholder="logitutde"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>

      <b-card class="mt-3" title="Owner Information">
        <b-form>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Name" label-for="owner-name">
                <b-form-input
                  id="owner-name"
                  v-model="owner.name"
                  :class="{
                    'border-danger': formSubmitted && !owner.name.trim()
                  }"
                  required
                  placeholder="Enter owner name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label="Phone" label-for="owner-phone">
                <b-form-input
                  id="owner-phone"
                  v-model="owner.phone"
                  :class="{
                    'border-danger': formSubmitted && !owner.phone.trim()
                  }"
                  required
                  placeholder="Enter owner phone"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>

      <b-card class="mt-3" title="Primary Contact">
        <b-form>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Name" label-for="primary-name">
                <b-form-input
                  id="primary-name"
                  v-model="primaryContact.name"
                  :class="{
                    'border-danger':
                      formSubmitted && !primaryContact.name.trim()
                  }"
                  required
                  placeholder="Enter primary contact's name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label="Designation" label-for="primary-designation">
                <b-form-input
                  id="primary-designation"
                  v-model="primaryContact.designation"
                  placeholder="Enter designation"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Phone" label-for="primary-phone">
                <b-form-input
                  id="primary-phone"
                  v-model="primaryContact.phone"
                  :class="{
                    'border-danger':
                      formSubmitted && !primaryContact.phone.trim()
                  }"
                  required
                  placeholder="Enter primary contact's phone"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>

      <b-card class="mt-3 mb-5" title="Requirement">
        <b-row v-if="requirements.length">
          <b-col cols="3">
            <label>Product</label>
          </b-col>
          <b-col cols="2">
            <label>Min. Qty.</label>
          </b-col>
          <b-col cols="2">
            <label>Max. Qty.</label>
          </b-col>
          <b-col cols="2">
            <label>Ordered Qty.</label>
          </b-col>
          <b-col cols="2">
            <label>Offered Price (per product)</label>
          </b-col>
          <b-col cols="1">
            <label></label>
          </b-col>
        </b-row>
        <b-row
          v-for="(requirement, index) in requirements"
          :key="index"
          class="mb-2"
        >
          <b-col cols="3">
            <b-select
              v-model="requirement.productId"
              :options="products"
              text-field="name"
              value-field="id"
              :class="{
                'border-danger': formSubmitted && !requirement.productId
              }"
            />
          </b-col>
          <b-col cols="2">
            <b-form-input
              v-model="requirement.minQty"
              min="1"
              type="number"
              :class="{
                'border-danger':
                  formSubmitted &&
                  (requirement.minQty < 1 ||
                    requirement.minQty > requirement.maxQty)
              }"
            />
          </b-col>
          <b-col cols="2">
            <b-form-input
              v-model="requirement.maxQty"
              min="1"
              type="number"
              :class="{
                'border-danger':
                  formSubmitted &&
                  (requirement.maxQty < 1 ||
                    requirement.minQty > requirement.maxQty)
              }"
            />
          </b-col>
          <b-col cols="2">
            <b-form-input
              v-model="requirement.orderedQty"
              type="number"
              min="1"
              :class="{
                'border-danger':
                  formSubmitted &&
                  (!requirement.orderedQty ||
                    requirement.orderedQty > requirement.maxQty ||
                    requirement.orderedQty < requirement.minQty)
              }"
            />
          </b-col>
          <b-col cols="2">
            <b-input-group prepend="₹">
              <b-form-input
                v-model="requirement.sellPrice"
                type="number"
                :class="{
                  'border-danger': formSubmitted && !requirement.sellPrice
                }"
              />
            </b-input-group>
          </b-col>
          <b-col cols="1">
            <b-button variant="danger" @click="onDeleteProduct(index)">
              <b-icon icon="trash" />
            </b-button>
          </b-col>
        </b-row>
        <div>
          <b-button variant="primary" @click="onAddProduct">
            Add Product
          </b-button>
          <span
            class="text-danger mr-3"
            v-if="formSubmitted && !requirements.length"
          >
            Atleast one product required
          </span>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerRegistration",

  data() {
    return {
      formSubmitted: false,
      organisation: {},
      owner: {},
      primaryContact: {},
      requirements: []
    };
  },

  computed: {
    products() {
      return this.$store.state.products;
    }
  },

  created() {
    this.resetData();
  },

  methods: {
    onAddProduct() {
      this.requirements.push({
        productId: null,
        minQty: 1,
        maxQty: 1,
        orderedQty: null,
        sellPrice: null
      });
    },
    onDeleteProduct(index) {
      this.requirements.splice(index, 1);
    },
    getCurrentLocation() {
      this.$getLocation({
        enableHighAccuracy: true
      }).then(coordinates => {
        this.organisation.geolocation = {
          latitude: coordinates.lat,
          longitude: coordinates.lng
        };
      });
    },
    verifyRequirements() {
      const isFilled = this.requirements.every(r => {
        const fields = Object.keys(r);
        return fields.every(field => !!r[field]);
      });
      if (!isFilled) return false;
      return this.requirements.every(r => {
        return (
          r.minQty > 0 &&
          r.maxQty >= r.minQty &&
          r.orderedQty > r.minQty &&
          r.orderedQty < r.maxQty
        );
      });
    },
    onRegister() {
      this.formSubmitted = true;
      const isValidOrg = this.organisation.name && this.organisation.address;
      const isValidOwner = this.owner.name && this.owner.phone;
      const isValidPrimaryContact =
        this.primaryContact.name && this.primaryContact.phone;
      const isValidRequirement =
        this.requirements.length && this.verifyRequirements();

      if (
        isValidOrg &&
        isValidOwner &&
        isValidPrimaryContact &&
        isValidRequirement
      ) {
        const formData = {
          organisation: this.organisation,
          owner: this.owner,
          primaryContact: this.primaryContact,
          requirements: this.requirements,
          executiveId: "test_id",
          dealStatus: "PROPOSED",
          createdAt: new Date().toISOString,
          updatedAt: new Date().toISOString
        };
        this.$store.dispatch("newRegistration", formData);
        this.$bvToast.toast("Customer Registered!", {
          title: "Success",
          variant: "success",
          toaster: "b-toaster-top-center",
          autoHideDelay: 2000
        });
        this.resetData();
      }
    },
    resetData() {
      this.formSubmitted = false;
      this.organisation = {
        name: "",
        address: "",
        landmark: "",
        geolocation: {}
      };
      this.owner = {
        name: "",
        phone: ""
      };
      this.primaryContact = {
        name: "",
        phone: "",
        designation: ""
      };
      this.requirements = [];
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 4px #888;
}
.b-icon {
  cursor: pointer;
}
.form-layout {
  max-height: calc(100vh - 126px);
  overflow: auto;
}
</style>
