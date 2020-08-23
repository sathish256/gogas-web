<template>
  <div>
    <div class="d-flex justify-content-between pr-4">
      <h1>Add User</h1>
      <div class="d-flex flex-row-reverse align-items-center">
        <b-button class="my-2" variant="success" @click="onCreate"
          >Create</b-button
        >
        <span class="text-danger mr-3" v-if="!isValidUserData"
          >Please fill all mandatory fields</span
        >
      </div>
    </div>
    <div class="form-layout pr-4">
      <b-card title="User Info">
        <b-row>
          <b-col cols="12" md="9">
            <b-row>
              <b-col cols="12" md="4">
                <b-form-group label="First Name" label-for="first-name">
                  <b-form-input
                    id="first-name"
                    v-model="userInfo.firstName"
                    :class="{
                      'border-danger':
                        formSubmitted && !userInfo.firstName.trim()
                    }"
                    required
                    placeholder="Enter first name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group label="Last Name" label-for="last-name">
                  <b-form-input
                    id="last-name"
                    v-model="userInfo.lastName"
                    required
                    :class="{
                      'border-danger':
                        formSubmitted && !userInfo.lastName.trim()
                    }"
                    placeholder="Enter last name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group label="Phone" label-for="user-phone">
                  <b-form-input
                    id="user-phone"
                    v-model="userInfo.phone"
                    required
                    :class="{
                      'border-danger': formSubmitted && !userInfo.phone.trim()
                    }"
                    placeholder="Enter phone"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group label="Role" label-for="role">
                  <b-form-select
                    required
                    v-model="userInfo.role"
                    :options="userRoles"
                    :class="{
                      'border-danger': formSubmitted && !userInfo.role
                    }"
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null" disabled
                        >Select role</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                md="4"
                v-if="userInfo.role && userInfo.role !== 'ADMIN'"
              >
                <b-form-group label="C & F" label-for="cnf">
                  <b-form-select
                    v-model="userInfo.candF"
                    :options="cAndFOptions"
                    :class="{
                      'border-danger': formSubmitted && !userInfo.candF
                    }"
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null"
                        >Select C & F</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                md="4"
                v-if="
                  userInfo.role &&
                    userInfo.role !== 'ADMIN' &&
                    userInfo.role !== 'CANDF'
                "
              >
                <b-form-group label="Dealership" label-for="dealership">
                  <b-form-select
                    v-model="userInfo.dealership"
                    :options="dealershipOptions"
                    :class="{
                      'border-danger': formSubmitted && !userInfo.dealership
                    }"
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null"
                        >Select dealership</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="12"
            md="2"
            offset-md="1"
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <b-img
              thumbnail
              :src="imageUrl"
              alt="Avatar"
              v-if="imageUrl"
              width="100"
              height="100"
            />
            <b-avatar v-else rounded size="6rem" />
            <b-button class="pp-btn" variant="primary" @click="onUploadImage"
              >Upload</b-button
            >
            <input
              type="file"
              style="display: none"
              ref="imageUpload"
              accept="image/*"
              @change="onImageSelected"
            />
            <p class="text-danger mt-2">{{ errorMessage }}</p>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mt-3" title="Identity Proof">
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Document Type" label-for="type">
              <b-form-select v-model="document.type" :options="documentTypes">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled
                    >Select document</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Document Number" label-for="number">
              <b-form-input
                id="number"
                v-model="document.name"
                placeholder="Enter document #"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group
              class="mb-0"
              label="Attachment"
              label-for="attachment"
            >
              <b-form-file
                id="attachment"
                accept="image/*, application/pdf"
                @change="onDocumentSelected"
              />
            </b-form-group>
            <span class="text-danger position-absolute">
              {{ documentErrorMessage }}
            </span>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mt-3" title="Address">
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="House No" label-for="House-no">
              <b-form-input
                id="house-no"
                v-model="address.houseNo"
                :class="{
                  'border-danger': formSubmitted && !address.houseNo.trim()
                }"
                required
                placeholder="Enter house #"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Street" label-for="street">
              <b-form-input
                id="street"
                v-model="address.street"
                :class="{
                  'border-danger': formSubmitted && !address.street.trim()
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
      <b-card class="mt-3 mb-5" title="Emergency Contact">
        <b-form>
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group label="Name" label-for="emergency-name">
                <b-form-input
                  id="emergency-name"
                  v-model="emergencyContact.name"
                  :class="{
                    'border-danger':
                      formSubmitted && !emergencyContact.name.trim()
                  }"
                  required
                  placeholder="Enter name"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group label="Phone" label-for="emergency-phone">
                <b-form-input
                  id="emergency-phone"
                  v-model="emergencyContact.phone"
                  :class="{
                    'border-danger':
                      formSubmitted && !emergencyContact.phone.trim()
                  }"
                  required
                  placeholder="Enter phone"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validateObject } from "@/helpers/utils";

export default {
  name: "AddUser",

  data() {
    return {
      imageUrl: "",
      identityDocument: null,
      profileImage: null,
      isValidUserData: true,
      formSubmitted: false,
      errorMessage: "",
      documentErrorMessage: "",
      userInfo: {},
      documentTypes: ["Aadhar", "Driving License", "Voter ID", "Passport"],
      address: {},
      emergencyContact: {},
      document: {}
    };
  },

  created() {
    this.resetData();
  },

  computed: {
    ...mapGetters([
      "isAdmin",
      "isCAndF",
      "roles",
      "allCAndF",
      "user",
      "userId",
      "userCAndFId",
      "userDealershipId",
      "allDealership"
    ]),
    userRoles() {
      if (this.isAdmin) {
        return this.roles;
      }
      if (this.isCAndF) {
        return this.roles.filter(role => role.value !== "ADMIN");
      }
      return this.roles.filter(
        role => role.value !== "ADMIN" && role.value !== "CANDF"
      );
    },
    cAndFOptions() {
      if (this.isAdmin) {
        return this.allCAndF.map(c => ({ value: c.id, text: c.name }));
      }
      return this.allCAndF
        .filter(c => c.id === this.userCAndFId)
        .map(c => ({ value: c.id, text: c.name }));
    },
    dealershipOptions() {
      if (this.isAdmin) {
        return this.allDealership.map(d => ({ value: d.id, text: d.name }));
      }
      if (this.isCAndF) {
        return this.allDealership
          .filter(d => d.candfId === this.userCAndFId)
          .map(d => ({ value: d.id, text: d.name }));
      }
      return this.allDealership
        .filter(d => d.id === this.userDealershipId)
        .map(d => ({ value: d.id, text: d.name }));
    }
  },

  methods: {
    async onCreate() {
      this.formSubmitted = true;
      let isValidUser = validateObject(this.userInfo, [
        "firstName",
        "lastName",
        "phone",
        "role"
      ]);
      if (this.userInfo.role !== "ADMIN") {
        isValidUser = !!this.userInfo.candF;
      }
      if (this.userInfo.role !== "ADMIN" && this.userInfo.role !== "CANDF") {
        isValidUser = !!this.userInfo.dealership;
      }
      const isValidAddress = validateObject(this.address, [
        "houseNo",
        "street",
        "pincode"
      ]);
      const isValidEC = validateObject(this.emergencyContact, [
        "name",
        "phone"
      ]);
      this.isValidUserData = isValidUser && isValidAddress && isValidEC;
      if (!this.isValidUserData) {
        return;
      }
      let userInfo = {
        ...this.userInfo,
        address: this.address,
        candfId: this.userInfo.candF,
        dealershipId: this.userInfo.dealership,
        identityProof: this.document,
        status: "ACTIVE",
        profileImage: null,
        createdBy: this.userId,
        lastmodifiedBy: this.userId
      };
      try {
        if (this.profileImage) {
          const fileData = await this.$store.dispatch("saveToFirestore", {
            file: this.profileImage,
            type: "profile_pic"
          });
          userInfo.profileImage = await this.$store.dispatch(
            "getDownloadUrl",
            fileData.metadata.fullPath
          );
        }
        if (this.identityDocument) {
          const fileData = await this.$store.dispatch("saveToFirestore", {
            file: this.identityDocument,
            type: "identity_proof"
          });
          userInfo.identityProof.filepath = await this.$store.dispatch(
            "getDownloadUrl",
            fileData.metadata.fullPath
          );
        }
        await this.$store.dispatch("createUser", userInfo);
        this.$bvToast.toast(
          "User registered and password sent to user's mobile number",
          {
            title: "Created User!",
            variant: "success",
            toaster: "b-toaster-top-center",
            autoHideDelay: 10000
          }
        );
        this.resetData();
      } catch {
        this.$bvToast.toast("Contact technical support...", {
          title: "User create registered!",
          variant: "danger",
          toaster: "b-toaster-top-center",
          autoHideDelay: 5000
        });
      }
    },
    onUploadImage() {
      this.$refs.imageUpload.click();
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const fileType = file.type.split("/")[0];
      if (file.name.lastIndexOf(".") <= 0 || fileType !== "image") {
        this.errorMessage = "Please upload a valid file";
        return;
      }
      this.errorMessage = "";
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.profileImage = file;
    },
    onDocumentSelected(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const fileType = file.type;
      if (
        file.name.lastIndexOf(".") <= 0 ||
        (!fileType.includes("image") && !fileType.includes("pdf"))
      ) {
        this.documentErrorMessage = "Please upload a valid file";
        return;
      }
      this.documentErrorMessage = "";
      this.identityDocument = file;
    },
    resetData() {
      this.imageUrl = "";
      this.identityDocument = null;
      this.profileImage = null;
      this.isValidUserData = true;
      this.formSubmitted = false;
      this.errorMessage = "";
      this.documentErrorMessage = "";
      this.userInfo = {
        firstName: "",
        lastName: "",
        phone: "",
        role: null,
        candF: null,
        dealership: null
      };
      this.address = {
        houseNo: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
      };
      this.emergencyContact = {
        name: "",
        phone: ""
      };
      this.document = { type: null, name: "", filepath: "" };
    }
  }
};
</script>

<style scoped>
.pp-btn {
  width: 6rem;
}
</style>
