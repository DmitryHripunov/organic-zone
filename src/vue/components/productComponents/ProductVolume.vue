<template>
  <div class="product-volume">
    <div class="product-volume__title">Объем:</div>
    
    <ProductVolumeList />
  </div>
</template>

<script>
import ProductVolumeList from './ProductVolumeList.vue';

export default {
  components: { ProductVolumeList },
};
</script>