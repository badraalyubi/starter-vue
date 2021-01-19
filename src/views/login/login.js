import { ref, reactive, onMounted } from "@vue/composition-api";

import router from "../../router";
import { authenticationService } from "../../_services/authentication.services";

export default {
  setup(props, context) {
    // Hook Created
    
    onMounted(() => {
      // redirect to home if already logged in
      // if (authenticationService.currentUserValue) {
      //   return router.push("/dashboard");
      // }

      console.log(context.root.$route.query.returnUrl);
    
    });

    const returnUrl = "/dashboard";
    const form = reactive({
      username: "",
      password: "",
    });
    const show = ref(true);

    function onSubmit(evt) {
      evt.preventDefault();
      // this.$store.dispatch("auth/Login", this.form);
      authenticationService.login(this.form.username, this.form.password).then(
        (user) => {
          console.log(user);
          console.log(returnUrl);
          router.push(this.returnUrl);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    function onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }

    return {
      form,
      returnUrl,
      show,
      onSubmit,
      onReset
    };
  },
};
