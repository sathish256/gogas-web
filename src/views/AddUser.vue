<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Add User</h1>
      <b-button class="my-2" variant="success">Create</b-button>
    </div>
    <div class="from-layout pr-4">
      <b-card title="User Info">
        <b-form>
          <b-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="First Name" label-for="first-name">
                <b-form-input
                  id="first-name"
                  required
                  placeholder="Enter name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Last Name" label-for="last-name">
                <b-form-input
                  id="last-name"
                  required
                  placeholder="Enter Last Name"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="3" lg="5">
              <div>
                <b-avatar src size="6rem"></b-avatar>
              </div>
            </b-col>
          </b-row>
          <div>
            <b-button variant="success">Upload Image</b-button>
          </div>

          <b-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Phone" label-for="phone">
                <b-form-input
                  id="phone"
                  required
                  placeholder="Enter phone number"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Role" label-for="role">
                <b-form-select
                  required
                  placeholder="selectRole"
                  v-model="role"
                  :options="options"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
      <b-card class="mt-3" title="Address">
        <b-form>
          <b-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="House No" label-for="House-no">
                <b-form-input
                  id="house-no"
                  required
                  placeholder="Enter House no"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Street" label-for="street">
                <b-form-input id="street" required placeholder="Enter Street" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Locality" label-for="locality">
                <b-form-input
                  id="locality"
                  required
                  placeholder="Enter Locality"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="City" label-for="city">
                <b-form-input id="city" required placeholder="Enter City" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="State" label-for="state">
                <b-form-input id="state" required placeholder="Enter State" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="PIN" label-for="pin">
                <b-form-input id="pin" required placeholder="Enter Pin" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
      <b-card class="mt-3 mb-5" title="Emergency Contact">
        <b-form>
          <b-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Name" label-for="name">
                <b-form-input id="name" required placeholder="Enter Name" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group label="Phone" label-for="phone">
                <b-form-input id="phone" required placeholder="Enter Phone" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddUser",

  data() {
    return {
      role: null,
      options: [
        { value: "a", text: "C & F" },
        { value: "b", text: "Dealer" },
        { value: "c", text: "Marketing" },
        { value: "d", text: "Delivery" }
      ]
    };
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
