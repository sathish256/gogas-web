<template>
  <div>
    <h1>All Registrations</h1>
    <b-card>
      <b-form-input
        v-model="searchRegistrations"
        placeholder="Search by Organisation, Owner or Deal Status"
      />
      <b-table
        class="mt-2"
        head-variant="light"
        sticky-header="500px"
        :bordered="true"
        :fixed="true"
        :items="registrations"
        :fields="fields"
        :show-empty="true"
        :filter="searchRegistrations"
        empty-text="No Registrations Available"
      >
        <template v-slot:cell(dealStatus)="row">
          <div
            v-if="row.index !== editRow"
            class="d-flex justify-content-between"
          >
            {{ row.item.dealStatus }}
            <b-button
              variant="primary"
              size="sm"
              icon
              @click="editDealStatus(row.index)"
            >
              <b-icon icon="pencil" />
            </b-button>
          </div>
          <div v-else class="d-flex justify-content-between">
            <b-form-select
              v-model="row.item.dealStatus"
              :options="dealStatuses"
            />
            <b-button
              variant="success"
              class="ml-3"
              size="sm"
              icon
              @click="updateDealStatus(row.index)"
            >
              <b-icon icon="check2" />
            </b-button>
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "AllRegistrations",

  data() {
    return {
      searchRegistrations: "",
      fields: [
        {
          key: "organisation.name",
          label: "Organisation",
          sortable: true
        },
        {
          key: "owner.name",
          label: "Owner Name",
          sortable: true
        },
        {
          key: "owner.phone",
          label: "Owner Phone",
          sortable: true
        },
        {
          key: "dealStatus",
          sortable: true
        }
      ],
      editRow: null,
      dealStatuses: ["PROPOSED", "ACCEPTED", "CANCELLED"]
    };
  },

  computed: {
    registrations() {
      return this.$store.state.registrations;
    }
  },

  methods: {
    editDealStatus(index) {
      this.editRow = index;
    },
    updateDealStatus(index) {
      console.log(index);
      // await this.$store.dispatch(
      //   "updateRegistration",
      //   this.registrations[index]
      // );
      // this.$bvToast.toast("Updated Deal Status!", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-top-center",
      //   autoHideDelay: 2000
      // });
      // this.editRow = null;
    }
  }
};
</script>
