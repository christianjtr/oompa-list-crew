<template>
  <div>
    <router-link
      :to="{ path: '/oompas/' + item.id, params: { id: item.id } }"
      title="Hi!"
      exact
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3 is-marginless">
            <img :src="item.image" alt="Oompa Loompa Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content has-text-left">
            <p class="title is-4 margin-bottom-20 truncate">{{ fullName }}</p>
            <p class="subtitle is-7 is-italic">{{ item.gender }}</p>
            <p class="subtitle is-7 is-italic">{{ item.profession }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'OompaItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      oompa: null
    };
  },
  computed: {
    fullName () {
      return this.item.first_name + ' ' + this.item.last_name;
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  &.margin-bottom-20 {
    margin-bottom: 2rem !important;
  }
}
.card:hover {
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out;
  -webkit-transition: opacity 0.3s ease-in-out;
  .card-content {
    .content {
      p:first-child {
        color: #00d1b2;
      }
    }
  }
}
p.truncate {
  width: 100%;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>
