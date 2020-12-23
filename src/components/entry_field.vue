<template>
  <div class="entry-wrapper" :style="wrapperStyles">
    <input
      :class="[
        'entry',
        {
          'with-qualific': qualific
        }
      ]"
      type="text"
      :name="type"
      :style="inputStyles"
      :placeholder="placeholder"
    >
    <div
      v-if="qualific"
      class="entry-qualific"
      v-html="qualific"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'EntryField',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    width: {},
    theme: {
      type: String,
      default: 'white'
    },
    qualific: {
      type: String
    },
    spaceLeft: {
      type: String
    },
    position: {
      type: String
    },
    type: {
      type: String
    }
  },
  computed: {
    inputStyles() {
      const themeColor = this.theme === 'blue' ? '#e6f2fe' : '#fff';
      return {
        backgroundColor: themeColor,
        marginLeft: this.spaceLeft ? `${this.spaceLeft}px` : 0,
        borderTopLeftRadius: this.position && this.position === 'left' ? '3px' : 0,
        borderBottomLeftRadius: this.position && this.position === 'left' ? '3px' : 0
      }
    },
    wrapperStyles() {
      return {
        maxWidth: this.width ? `${this.width}px` : 'auto'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.entry {
  padding: 12px 20px;
  height: 44px;
  color: #333;
  font: 18px/18px 'PT Sans';
  border: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font: 14px/16px 'PT Sans';
    padding: 10px;
  }

  &::placeholder {
    color: rgba(121, 133, 144, .6);
  }

  &.with-qualific {
    padding-left: 40px;

    @media (max-width: 768px) {
      padding-left: 26px;
    }
  }

  &-wrapper {
    width: 100%;
    position: relative;
  }

  &-qualific {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: #98a3af;
    font: 16px/16px 'PT Sans';

    @media (max-width: 768px) {
      font-size: 14px;
      left: 8px;
    }
  }
}
</style>
