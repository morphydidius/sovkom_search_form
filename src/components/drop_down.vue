<template>
  <div class="dropdown" :style="dropDownStyles">
    <select :style="selectStyles" @change="setItem" :name="type">
      <option v-for="(item, index) in items" :key="index" v-html="item"></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropDownList',
  props: {
    items: {
      type: Array
    },
    width: {},
    theme: {
      type: String,
      default: 'white'
    },
    position: {
      type: String
    },
    spaceleft: {
      type: String
    },
    type: {
      type: String
    }
  },
  computed: {
    dropDownStyles() {
      return {
        maxWidth: this.width ? `${this.width}px` : 'auto'
      }
    },
    selectStyles() {
      const themeColor = this.theme === 'blue' ? '#e6f2fe' : '#fff';
      return {
        backgroundColor: themeColor,
        borderTopLeftRadius: this.position && this.position === 'left' ? '3px' : 0,
        borderBottomLeftRadius: this.position && this.position === 'left' ? '3px' : 0,
        borderTopRightRadius: this.position && this.position === 'right' ? '3px' : 0,
        borderBottomRightRadius: this.position && this.position === 'right' ? '3px' : 0,
        marginLeft: this.spaceleft ? `${this.spaceleft}px` : 0
      }
    }
  },
  methods: {
    setItem(e) {
      this.$emit('set_item', { type: this.type, value: e.target.value });
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  height: 44px;
  margin-left: 1px;
  position: relative;

  select {
    width: 100%;
    height: 44px;
    padding: 10px 20px;
    color: #333;
    font: 18px/23px 'PT Sans';
    border: none;
    outline: none;
    appearance: none;
    background: url('~images/triangle.svg') no-repeat right 20px top 20px / 10px auto;

    &::-ms-expand {
      display: none;
    }

    @media (max-width: 768px) {
      font: 14px/19px 'PT Sans';
      padding: 10px;
    }
  }
}

option {
  padding: 10px 20px;
}
</style>
