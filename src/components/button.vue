<template>
  <button
    :class="[{
      'primary': type === 'primary',
      'add': type === 'add'
    }]"
    :type="btnType"
    :style="btnStyles"
    @click="btnClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    action: {
      type: String
    },
    width: {
      type: String
    },
    shrink: {
      type: String
    },
    space_right: {},
    space_left: {},
    space_top: {},
    position: {
      type: String
    }
  },
  computed: {
    btnStyles() {
      return {
        width: this.width ? `${this.width}px` : '100%',
        flexShrink: this.shrink ? this.shrink : '1',
        marginRight: this.space_right ? `${this.space_right}px` : '0',
        marginLeft: this.space_left ? `${this.space_left}px` : '0',
        marginTop: this.space_top ? `${this.space_top}px` : '0',
        borderTopLeftRadius: this.position && this.position === 'right' ? 0 : '3px',
        borderBottomLeftRadius: this.position && this.position === 'right' ? 0 : '3px'
      }
    },
    btnType() {
      return this.action && this.action === 'submit' ? 'submit' : 'button';
    }
  },
  methods: {
    btnClick(e) {
      e.preventDefault();
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  box-sizing: border-box;
  min-width: 130px;
  width: 100%;
  border: none;
  font: 18px/18px 'PT Sans';
  border-radius: 3px;
  padding: 12px;
  outline: none;

  @media (max-width: 768px) {
    font: 14px/16px 'PT Sans';
  }
}
.primary {
  color: #fff;
  background-color: #5e9969;
}
.add {
  border: 1px solid #506981;
  color: #506981;
  background-color: transparent;
}
</style>
