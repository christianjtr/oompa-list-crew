<template>
  <div class="columns is-multiline is-centered content">
    <div class="column is-10 margin-bottom-30">
      <h1 class="title is-1">Find your Oompa Loompa</h1>
      <h3 class="subtitle is-3">There are more than 100k</h3>
    </div>
    <div class="column is-12" v-if="oompaList">
      <oompa-list :list="oompaList" :filter="filter"></oompa-list>
    </div>
    <div class="column is-12">
      <infinite-loading
        @infinite="infiniteHandler"
        spinner="bubbles"
        v-if="pageNumber > 1"
      >
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';

import OompaList from '@/components/Oompa.List';

export default {
  name: 'ViewOompaMainList',
  components: {
    'oompa-list': OompaList,
    InfiniteLoading
  },
  data () {
    return {
      pageNumber: 1,
      oompaList: null
    };
  },
  beforeCreate () {
    this.$store.dispatch('clearOompaList');
  },
  created () {
    this.getOompaList(this.pageNumber).then(() => {
      this.renderList();
    });
  },
  computed: {
    ...mapState(['filter'])
  },
  methods: {
    infiniteHandler ($state) {
      this.getOompaList(this.pageNumber).then(() => {
        this.renderList();
        $state.loaded();
      });
    },
    getOompaList (pageNumber) {
      return this.$store.dispatch('getOompas', { page: pageNumber });
    },
    renderList () {
      this.oompaList = this.$store.state.oompaList;
      this.pageNumber++;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  top: 6.25rem;
}
.margin-bottom-30 {
  margin-bottom: 3rem;
}
input {
  &.search-input {
    background: url(../../assets/images/ic_search.png) no-repeat scroll;
    background-size: 1.5rem 1.5rem;
    background-position: right 0.5rem center;
  }
}
</style>
