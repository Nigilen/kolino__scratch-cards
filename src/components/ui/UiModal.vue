<script lang="ts" setup>
import { mainConfig } from '@/config/mainConfig';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  winValue: number | string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const handleModalClose = () => {
  emits('update:modelValue', false)
};

onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleModalClose);
});
</script>

<template>
  <Transition name="modal">
    <section 
      class="modal" 
      v-if="props.modelValue" 
      @click.self="handleModalClose" 
    >
      <div class="modal__content">
        <h2 class="modal__title">
          {{ mainConfig.modal.title }}
        </h2>
        <p class="modal__bonuse">
          {{ props.winValue }}
        </p>
        <button class="modal__button" type="button" @click="handleModalClose">
          {{ mainConfig.modal.button }}
        </button>
      </div>
    </section>
  </Transition>
</template>

<style lang="css" scoped>
.modal {
  container-type: inline-size;
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);

  & .modal__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1cqb;
    inline-size: min(340px, 90vmin);
    block-size: auto;
    aspect-ratio: 1.5 / 1;
    padding: 3cqmin;
    border: min(2px, 0.6cqi) solid #333;
    background-color: #f3f3f3;
    border-radius: 2cqi;
    text-align: center;
    
    & .modal__title {
      font-size: min(40px, 12cqmin);
      line-height: 0;
    }
    
    & .modal__bonuse {
      font-size: min(50px, 15cqmin);
      line-height: 0;
    }
    
    & .modal__button {
      padding: min(10px, 1cqb) min(30px, 7cqi);
      border: min(2px, 0.6cqi) solid #333;
      border-radius: 0.5cqmin;
      font-size: min(18px, 6cqmin);
      background-color: var(--accent-color);
      color: var(--secondary-color);
      transition-duration: .3s;
    
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}


.modal-enter-active, 
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from, 
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal__content, 
.modal-leave-active .modal__content {
  transition: transform 0.5s cubic-bezier(.82,.12,.39,2.75);
}

.modal-enter-from .modal__content, 
.modal-leave-to .modal__content {
  transform: scale(0);
}

</style>