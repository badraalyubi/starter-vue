<template lang="html">
  <section class="main">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form> -->

            <!-- <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown> -->

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ userFromApi.current.firstName }} </em>
              </template>
              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
              <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </section>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";

import router from '../router';
import { authenticationService, userService } from "../_services";

export default {
  setup() {
    onMounted(() => {
      console.log(currentUser2);
      userService
        .getById(currentUser2.user.id)
        .then((user) => (userFromApi.current = user));
    });

    const currentUser2 = reactive({
      user: authenticationService.currentUserValue,
    });
    const userFromApi = reactive({
      current: "",
    });

    const logout = () => {
      authenticationService.logout();
      router.push("/login");
    };

    return { currentUser2, userFromApi, logout };
  },
};
</script>

<style scoped lang="scss">
</style>
