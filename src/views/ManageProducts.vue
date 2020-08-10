<template>
  <div>
    <h1>Manage Products</h1>
    <b-card :title="`${product.id ? 'Edit' : 'Add'} Product`">
      <b-form>
        <b-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="Name" label-for="product-name">
              <b-form-input
                id="product-name"
                v-model="product.name"
                :class="{ 'border-danger': isSubmitted && !product.name }"
                required
                placeholder="Enter product name"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="Type" label-for="product-type">
              <b-form-input
                id="product-type"
                v-model="product.type"
                :class="{ 'border-danger': isSubmitted && !product.type }"
                required
                placeholder="Enter product type"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="Specification" label-for="product-spec">
              <b-form-input
                id="product-spec"
                v-model="product.spec"
                :class="{ 'border-danger': isSubmitted && !product.spec }"
                required
                placeholder="Enter product specification"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="Description" label-for="product-desc">
              <b-form-input
                id="product-desc"
                v-model="product.desc"
                placeholder="Enter product description"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <div class="d-flex flex-row-reverse align-items-center">
          <b-button variant="success" @click="onProductSave">
            {{ product.id ? "Update" : "Create" }} Product
          </b-button>
          <span class="text-danger mr-3" v-if="!isValidProduct">
            Please fill all manadatory fields
          </span>
        </div>
      </b-form>
    </b-card>
    <b-card class="mt-3" title="All Products">
      <b-form-input v-model="searchProduct" placeholder="Search Product" />
      <b-table
        class="mt-2"
        head-variant="light"
        sticky-header
        :bordered="true"
        :items="products"
        :fields="fields"
        :show-empty="true"
        :filter="searchProduct"
        empty-text="No Products Available"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            variant="primary"
            size="sm"
            class="mr-2"
            @click="onProductEdit(row.index)"
          >
            <b-icon icon="pencil" />
          </b-button>
          <b-button variant="danger" size="sm" class="mr-2">
            <b-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  name: "ManageProducts",

  data() {
    return {
      searchProduct: "",
      requiredFields: ["name", "type", "spec"],
      fields: [
        {
          key: "name",
          sortable: true
        },
        {
          key: "type",
          sortable: true
        },
        {
          key: "spec",
          label: "Specification",
          sortable: true
        },
        {
          key: "desc",
          label: "Description",
          sortable: true
        },
        "actions"
      ],
      isSubmitted: false,
      isValidProduct: true,
      product: {},
      products: []
    };
  },

  methods: {
    onProductEdit(index) {
      this.product = cloneDeep(this.products[index]);
    },
    onProductDelete(index) {
      this.products.splice(index, 1);
    },
    onProductSave() {
      this.isSubmitted = true;
      this.isValidProduct = this.requiredFields.every(
        field => !!this.product[field]
      );

      if (this.isValidProduct) {
        this.isValidProduct = true;
        if (this.product.id) {
          this.products = this.products.map(product => {
            if (product.id === this.product.id) return this.product;
            return product;
          });
        } else {
          this.products.push({ id: this.products.length + 1, ...this.product });
        }
        this.product = {};
        this.isSubmitted = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 4px #888;
}
</style>
