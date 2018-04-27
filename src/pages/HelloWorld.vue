<template>
    <div class="hello">
        <img src="../assets/logo.png" />
        <h1>{{ msg }} World</h1>
        <h2>Essential Links</h2>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapState({
      msg (state) {
        return state.msg
      }
    })
  },
  methods: {
    ...mapActions(['helloWorld'])
  },
  mounted () {
    this.helloWorld({name: 'hello'})
  }
}
</script>

<style scoped>
h1, h2 {
    font-weight: normal;
}
</style>
