<template>
  <div class="pr-4">
    <h1>Manage Products</h1>
    <b-card>
      <div class="d-flex justify-content-between">
        <b-card-title :title="`${product.id ? 'Edit' : 'Add'} Product`" />
        <div class="d-flex flex-row-reverse align-items-center">
          <b-button variant="success" @click="onProductSave">
            {{ product.id ? "Update" : "Create" }} Product
          </b-button>
          <span class="text-danger mr-3" v-if="!isValidProduct">
            Please fill all mandatory fields
          </span>
        </div>
      </div>
      <b-form>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Name" label-for="product-name">
              <b-form-input
                id="product-name"
                v-model="product.name"
                :class="{
                  'border-danger': isSubmitted && !product.name.trim()
                }"
                required
                placeholder="Enter product name"
                :disabled="!isAdmin"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Type" label-for="product-type">
              <b-form-input
                id="product-type"
                v-model="product.type"
                :class="{
                  'border-danger': isSubmitted && !product.type.trim()
                }"
                required
                placeholder="Enter product type"
                :disabled="!isAdmin"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Specification" label-for="product-spec">
              <b-form-input
                id="product-spec"
                v-model="product.specification"
                :class="{
                  'border-danger': isSubmitted && !product.specification.trim()
                }"
                required
                placeholder="Enter product specification"
                :disabled="!isAdmin"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Description" label-for="product-desc">
              <b-form-input
                id="product-desc"
                v-model="product.description"
                placeholder="Enter product description"
                :disabled="!isAdmin"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" v-if="!isAdmin">
            <b-form-group
              :label="isCAndF ? 'Price' : 'C&F Price'"
              label-for="product-cnf-price"
            >
              <b-input-group prepend="₹">
                <b-form-input
                  id="product-cnf-price"
                  v-model="cAndFPrice"
                  placeholder="Enter price"
                  :disabled="!isCAndF"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" v-if="!isAdmin && !isCAndF">
            <b-form-group label="Price" label-for="product-price">
              <b-input-group prepend="₹">
                <b-form-input
                  id="product-price"
                  v-model="dealershipPrice"
                  placeholder="Enter price"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card class="mt-3" title="All Products">
      <b-form-input v-model="searchProduct" placeholder="Search Product" />
      <b-table
        class="mt-2"
        head-variant="light"
        sticky-header
        :bordered="true"
        :fixed="true"
        :items="products"
        :fields="tableFields"
        :show-empty="true"
        :filter="searchProduct"
        empty-text="No Products Available"
      >
        <template v-slot:cell(status)="row">
          <div class="d-flex justify-content-between">
            {{ status[row.item.status] }}
            <b-button
              variant="primary"
              size="sm"
              class="mr-2"
              @click="onProductEdit(row.index)"
            >
              <b-icon icon="pencil" />
            </b-button>
          </div>
        </template>
        <template v-slot:cell(cAndFPrice)="row">
          {{ getCAndFPrice(row.item) }}
        </template>
        <template v-slot:cell(price)="row">
          <div class="d-flex justify-content-between">
            {{ isCAndF ? getCAndFPrice(row.item) : getDealerPrice(row.item) }}
            <b-button
              variant="primary"
              size="sm"
              class="mr-2"
              @click="onProductEdit(row.index)"
            >
              <b-icon icon="pencil" />
            </b-button>
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep, get } from "lodash";
import { validateObject } from "@/helpers/utils";

export default {
  name: "ManageProducts",

  data() {
    return {
      cAndFPrice: 0,
      dealershipPrice: 0,
      searchProduct: "",
      isSubmitted: false,
      isValidProduct: true,
      product: {}
    };
  },

  created() {
    this.resetData();
  },

  computed: {
    ...mapGetters([
      "userId",
      "products",
      "status",
      "isAdmin",
      "isCAndF",
      "userCAndFId",
      "userDealershipId"
    ]),
    tableFields() {
      const fields = ["name", "type", "specification", "description"];
      if (this.isAdmin) {
        return [...fields, "status"];
      }
      if (this.isCAndF) {
        return [...fields, "price"];
      }
      return [...fields, { key: "cAndFPrice", label: "C & F Price" }, "price"];
    }
  },

  methods: {
    getCAndFPrice(product) {
      const cAndFPrice = product.candfPrice.find(
        price => price.candfId === this.userCAndFId
      );
      return get(cAndFPrice, "price", 0);
    },
    getDealerPrice(product) {
      const dealerPrice = product.dealerPrice.find(
        price => price.dealerId === this.userDealershipId
      );
      return get(dealerPrice, "price", 0);
    },
    onProductEdit(index) {
      const selectedProduct = cloneDeep(this.products[index]);
      this.product = {
        ...selectedProduct,
        status: selectedProduct.status === "ACTIVE"
      };
      this.cAndFPrice = this.getCAndFPrice(selectedProduct);
      this.dealershipPrice = this.getDealerPrice(selectedProduct);
    },
    async onProductSave() {
      this.isSubmitted = true;
      this.isValidProduct = validateObject(this.product, [
        "name",
        "type",
        "specification"
      ]);
      if (!this.isValidProduct) {
        return;
      }
      const product = {
        ...this.product,
        status: this.product.status ? "ACTIVE" : "INACTIVE",
        createdBy: this.product.id ? this.product.createdBy : this.userId,
        lastmodifiedBy: this.userId
      };
      await this.$store.dispatch(
        product.id ? "updateProduct" : "createProduct",
        product
      );
      await this.$store.dispatch("fetchAllProducts");
      this.$bvToast.toast(`Product ${this.product.id ? "Updated" : "Added"}!`, {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 2000
      });
      this.resetData();
    },
    resetData() {
      this.isSubmitted = false;
      this.product = {
        name: "",
        type: "",
        specification: "",
        description: "",
        status: true
      };
    }
  }
};
</script>
