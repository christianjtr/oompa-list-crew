<template>
  <div class="columns is-multiline is-centered">
    <div v-for="(item, index) in filteredList" :key="index" class="column is-3">
      <oompa :item="item"></oompa>
    </div>
    <div class="column is-12" v-if="filteredList.length === 0">
      <h3 class="title is-3 info">No Oompa's found... :(</h3>
    </div>
  </div>
</template>

<script>
import OompaItem from '@/components/Oompa.Item';

export default {
  name: 'OompaList',
  components: {
    oompa: OompaItem
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      required: false
    }
  },
  computed: {
    filteredList () {
      if (this.filter) {
        return this.list.filter(
          (oompa) =>
            oompa.first_name.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            oompa.last_name.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0 ||
            oompa.profession.toLowerCase().indexOf(this.filter.toLowerCase()) >=
              0
        );
      }
      return this.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  color: #00d1b2 !important;
}
</style>
