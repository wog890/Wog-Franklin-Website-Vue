<template>
  <v-app light>
    <v-layout>
      <v-flex class="mb-3" xs12 md10 offset-md1>
        <v-card>
          <wog-header></wog-header>
          <wog-content></wog-content>
          <wog-footer></wog-footer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
