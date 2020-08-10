<template>
  <div>
    <h1>Customer Registration</h1>
    <b-card title="Organisation Information">
      <b-form>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Name" label-for="org-name">
              <b-form-input
                id="org-name"
                v-model="organisation.name"
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
                required
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
                required
                placeholder="Enter primary contact's phone"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CustomerRegistration",

  data() {
    return {
      organisation: {
        geolocation: {}
      },
      owner: {},
      primaryContact: {}
    };
  },

  methods: {
    getCurrentLocation() {
      this.$getLocation({
        enableHighAccuracy: true
      }).then(coordinates => {
        this.organisation.geolocation = {
          latitude: coordinates.lat,
          longitude: coordinates.lng
        };
      });
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
</style>
