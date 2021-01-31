<template>
  <div class="oompa-detail">
    <div v-if="oompa">
      <oompa-detail :oompa="oompa"></oompa-detail>
    </div>
  </div>
</template>

<script>
import OompaDetail from '@/components/Oompa.Detail';

export default {
  name: 'ViewOompaDetail',
  components: {
    'oompa-detail': OompaDetail
  },
  created () {
    this.getOompa().then(() => {
      this.oompa = this.$store.state.oompa;
    });
  },
  watch: {
    $route: 'getOompa'
  },
  data () {
    return {
      oompa: null
    };
  },
  methods: {
    getOompa () {
      return this.$store.dispatch('getOompaById', {
        id: this.$route.params.id
      });
    }
  },
  beforeDestroy () {
    this.oompa = null;
  }
};
</script>

<style lang="scss" scoped>
.oompa-detail {
  position: relative;
  top: 6.25rem;
}
</style>
