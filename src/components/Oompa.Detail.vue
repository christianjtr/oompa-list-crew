<template>
  <section>
    <article class="columns is-centered">
      <template v-if="oompa.first_name">
        <div class="column is-2 has-text-left">
          <router-link to="/" title="Back to crew list" class="title is-5 info">
            Back to crew list
          </router-link>
        </div>
        <div class="column is-10 is-paddingless">
          <section class="columns">
            <div class="column is-6">
              <figure class="image">
                <img :src="oompa.image" alt="Oompa Loompa Image" />
              </figure>
            </div>
            <div class="column">
              <div class="content has-text-left">
                <p class="title is-4 margin-bottom-20">{{ fullName }}</p>
                <p class="subtitle is-7 is-italic">{{ oompa.gender }}</p>
                <p class="subtitle is-7 is-italic">{{ oompa.profession }}</p>
                <br />
                <p class="line-height-1-6" v-html="oompa.description"></p>
              </div>
            </div>
          </section>
        </div>
      </template>
      <div class="column is-10 is-paddingless" v-else>
        <h3 class="title is-3 info">I'am not an Oompa... :(</h3>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "OompaDetail",
  props: {
    oompa: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    fullName() {
      return this.oompa.first_name + " " + this.oompa.last_name;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
p {
  &.line-height-1-6 {
    line-height: 1.6 !important;
  }
  &.margin-bottom-20 {
    margin-bottom: 2rem !important;
  }
}
.info {
  color: #00d1b2 !important;
}
</style>
