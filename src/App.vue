<template>
  <v-app light>
    <v-layout>
      <v-flex class="mb-3" xs12 md10 offset-md1>
        <v-card>
          <wog-header :editable="editable"></wog-header>
          <wog-content :editable="editable"></wog-content>
          <wog-footer></wog-footer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  import * as FB from 'firebase'

  export default {
    created() {
      var self = this;
      FB.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.editable = true;
        }
        else {
          self.editable = false;
        }
      });
    },
    data () {
      return {
        editable: false
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
