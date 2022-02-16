<template>
  <div>
    <LogInMain
      :currentLogIn.sync="changeCurrentLogIn"
      :phoneNumber.sync="phoneNumber"
      ref="logInMain"
    />

    <LogInPromo
      :currentLogIn.sync="changeCurrentLogIn"
      :phoneNumber.sync="phoneNumber"
      @code-repeat="$refs.logInMain.setPromo()"
    />
  </div>
</template>

<script>
  import LogInMain from './LogInMain.vue';
  import LogInPromo from './LogInPromo.vue';

  export default {
    components: { LogInMain, LogInPromo },
    data() {
      return {
        currentLogIn: 'LogInMain',
        phoneNumber: '',
      }
    },

    computed: {
      changeCurrentLogIn: {
        get() {
          return this.currentLogIn;
        },
        set(value) {
          this.currentLogIn = value;
        },
      },

    }
  };
</script>
