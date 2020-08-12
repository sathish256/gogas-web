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
            Please fill all manadatory fields
          </span>
        </div>
      </div>
      <b-form>
        <b-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group label="Name" label-for="product-name">
              <b-form-input
                id="product-name"
                v-model="product.name"
                :class="{
                  'border-danger': isSubmitted && !product.name.trim()
                }"
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
                :class="{
                  'border-danger': isSubmitted && !product.type.trim()
                }"
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
                :class="{
                  'border-danger': isSubmitted && !product.spec.trim()
                }"
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
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            @click="onProductDelete(row.index)"
          >
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
      product: {}
    };
  },

  created() {
    this.resetData();
  },

  computed: {
    products() {
      return this.$store.state.products;
    }
  },

  methods: {
    onProductEdit(index) {
      this.product = cloneDeep(this.products[index]);
    },
    onProductDelete(index) {
      this.$store.dispatch("deleteProduct", index);
    },
    async onProductSave() {
      this.isSubmitted = true;
      this.isValidProduct = this.requiredFields.every(
        field => !!this.product[field].trim()
      );
      if (!this.isValidProduct) {
        return;
      }
      if (this.product.id) {
        await this.$store.dispatch("updateProduct", this.product);
      } else {
        await this.$store.dispatch("addProduct", this.product);
      }
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
        spec: "",
        desc: ""
      };
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 4px #888;
}
</style>
