<template>
  <div class="level header is-flex">
    <div class="level-item">
      <router-link to="/" title="Home!" exact>
        <figure class="image is-48x48">
          <img :src="getLogoImage" alt="Image Logo" class="image-logo" />
        </figure>
      </router-link>
      <h1 class="title is-4 title-style" style="">Oompa Loompa's Crew</h1>
    </div>
    <div class="level-item force-align-right">
      <div class="field">
        <div class="control">
          <input
            class="input search-input"
            type="text"
            placeholder="Search"
            maxlength="30"
            v-model="searchFilter"
            v-focus="true"
            title="Search"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { focus } from "vue-focus";

export default {
  name: "LayoutHeader",
  directives: {
    focus,
  },
  computed: {
    ...mapState(["filter"]),
    getLogoImage() {
      return require("@/assets/images/logo-umpa-loompa.png"); // eslint-disable-line global-require
    },
    searchFilter: {
      get() {
        return this.filter;
      },
      set(value) {
        this.setOompaFilter({ filter: value });
      },
    },
  },
  methods: {
    ...mapActions(["setOompaFilter"]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #cccccc;
  position: fixed;
  top: 0px;
  z-index: 1;
  display: flex;
  width: 100%;
  .level-item {
    padding: 0.5rem;
    justify-content: flex-start !important;
  }
}
.image-logo {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  cursor: pointer;
}
.title-style {
  color: #171717;
  margin-left: 1rem;
}
.force-align-right {
  position: absolute;
  right: 0.3125rem;
}
</style>
