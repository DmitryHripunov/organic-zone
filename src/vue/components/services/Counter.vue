<template>
  <div class="counter">
    <button 
      type="button" 
      class="counter__decrement"
      @click="decrement"
      
    >
      -
    </button>

    <input
      min="1"
      max="99"
      type="number"
      class="counter__field"
      v-model.number="count"
    />

    <button 
      type="button" 
      class="counter__increment"
      @click="increment"
      
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  props: ['qty'],
  computed: {
    count: {
      get() {
        return this.qty
      },
      set(value) {
        if (value < 1 || value > 99) return;
        this.$emit('update:qty', value);
      },
    },
  },

  methods: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
  },
};
</script>
