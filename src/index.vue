<template>
  <div class="form">
    <div class="form__wrapper">
      <form ref="form">
        <div class="form__main">
          <div
            v-if="isMainSearchModeOn"
            class="form__main__mainsearch"
          >
            <DropDown :items="cities" type="city" position="left" />
            <DropDown :items="deals" type="deal" />
            <DropDown :items="estate" type="estate" />
          </div>
          <div
            v-else
            class="form__main__namesearch"
          >
            <EntryField
              type="estate_name"
              placeholder="Введите название объекта (бизнес-объекта, торгового центра, новостройки, логопарка)"
              position="left"
            ></EntryField>
          </div>
          <Button type="primary" action="submit" width=130 position="right" @click="search">Найти</Button>
        </div>
        <div class="form__add-fields">
          <div
            v-if="isPriceFieldVisible"
            class="form__price"
          >
            <EntryField type="min_rate" theme="blue" width=180 qualific="От" position="left" />
            <EntryField type="max_rate" theme="blue" width=180 spaceLeft="1" qualific="До" />
            <DropDown :items="currency" type="currency" width=180 theme="blue" position="right" spaceleft="1" />
          </div>
          <Button
            v-if="!isAreaFieldVisible && isPriceFieldVisible"
            width=330
            type="add"
            space_top="28"
            @click="addArea"
          >Добавить метраж</Button>
          <Button
            v-if="!isPriceFieldVisible && isAreaFieldVisible"
            width=550
            type="add"
            space_top="28"
            space_right="20"
            @click="addPrice"
          >Добавить цену</Button>
          <div
            v-if="isAreaFieldVisible"
            class="form__area"
          >
            <EntryField type="min_quadrature" theme="blue" qualific="От" position="left" />
            <EntryField type="max_quadrature" theme="blue" spaceLeft="1" qualific="До" />
            <div class="quadrature">м<sup>2</sup></div>
          </div>
        </div>
      </form>
    </div>
    <div class="form__switches">
      <div class="form__switches__search">
        <div :class="['form__switches__main', { 'active': isMainSearchModeOn }]" @click="switchSearchMode('main')">Основной поиск</div>
        <input type="checkbox" id="switch" ref="mode" class="form__switches__switcher">
        <label for="switch" @click="switchSearchMode"></label>
        <div :class="['form__switches__name', { 'active': !isMainSearchModeOn }]" @click="switchSearchMode('name')">Искать по названию</div>
      </div>
      <div class="form__switches__add">
        <div :class="['form__switches__add__price', { 'active': isPriceFieldVisible }]" @click="switchPriceView">
          <span></span>Цена
        </div>
        <div :class="['form__switches__add__area', { 'active': isAreaFieldVisible }]" @click="switchAreaView">
          <span></span>Метраж
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch';
import { mapState } from 'vuex';
import DropDown from './components/drop_down';
import EntryField from './components/entry_field';
import Button from './components/button';

export default {
  name: 'Form',
  data() {
    return {
      isMainSearchModeOn: true,
      isPriceFieldVisible: false,
      isAreaFieldVisible: false
    };
  },
  mounted() {},
  components: {
    DropDown,
    EntryField,
    Button
  },
  computed: {
    ...mapState(['cities', 'deals', 'estate', 'currency'])
  },
  methods: {
    async search() {
      const elements = Array.from(this.$refs.form.elements);
      const sendInfo = elements.reduce((acc, { name, value }) => {
        if (name && value) {
          acc[name] = value;
        }
        return acc;
      }, {});
      await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: JSON.stringify(sendInfo),
        headers: {'Content-Type': 'application/json'}
      })
      .then(() => console.log('ok', sendInfo))
      .catch((e) => console.log(e))
    },
    switchSearchMode(mode) {
      switch(mode) {
        case 'main':
          if (!this.isMainSearchModeOn) {
            this.$refs.mode.click();
          }
          this.isMainSearchModeOn = true;
          break;
        case 'name':
          if (this.isMainSearchModeOn) {
            this.$refs.mode.click();
          }
          this.isMainSearchModeOn = false;
          break;
        default:
          this.isMainSearchModeOn = !this.isMainSearchModeOn;
      }
    },
    switchPriceView() {
      this.isPriceFieldVisible = !this.isPriceFieldVisible;
    },
    switchAreaView() {
      this.isAreaFieldVisible = !this.isAreaFieldVisible;
    },
    addPrice() {
      this.isPriceFieldVisible = true;
    },
    addArea() {
      this.isAreaFieldVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.form {
  padding-top: 40px;
  margin: 0 auto;
  min-width: 600px;
  max-width: 940px;
  width: 100%;
  font-family: 'PT Sans';

  &__wrapper {
    padding: 35px 24px 28px;
    background: linear-gradient(to right, #83b3e5, #a8d5e9);
    display: flex;

    form {
      width: 100%;
    }
  }

  &__main {
    display: flex;

    &__mainsearch {
      display: flex;
      width: 100%;
    }

    &__namesearch {
      width: 100%;
    }
  }

  &__add-fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__area, &__price {
    margin-top: 28px;
    display: flex;
    width: 100%;
  }

  &__area {
    width: 330px;
  }

  &__price {
    width: 550px;
    margin-right: 20px;
  }

  &__switches {
    background-color: #e6f2fe;
    padding: 18px 20px 14px 40px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 18px 22px;
    }

    &__search {
      display: flex;
    }

    &__switcher {
      display: none;
    }

    &__switcher + label {
      width: 40px;
      height: 22px;
      flex-shrink: 0;
      background-color: #5e9969;
      border-radius: 11px;
      margin: 0 20px;
      position: relative;
      display: block;

      &::after {
        position: absolute;
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #fff;
        top: 50%;
        transform: translateY(-50%);
        transition: .2s;
        left: 2px;
      }
    }

    &__switcher:checked + label {
      &::after {
        left: calc(100% - 20px);
        transition: .2s;
      }
    }

    &__add {
      display: flex;

      & > div {
        display: flex;
        align-items: center;
        margin-left: 24px;
        cursor: pointer;
        font: 16px/19px 'PT Sans';

        @media (max-width: 768px) {
          font-size: 14px;
        }

        span {
          width: 18px;
          height: 18px;
          border: 2px solid #4f6882;
          border-radius: 50%;
          display: block;
          position: relative;
          margin-right: 10px;

          &::before, &::after {
            position: absolute;
            content: '';
            width: 12px;
            height: 2px;
            background-color: #4f6882;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            transform-origin: 50% 50%;
          }

          &::after {
            transform: translate(-50%,-50%) rotate(90deg);
          }
        }

        &.active {
          color: #88949f;

          span {
            transform: rotate(45deg);
          }
        }
      }
    }

    &__main, &__name {
      font: 16px/22px 'PT Sans';
      color: #506981;
      cursor: pointer;
      position: relative;

      @media (max-width: 768px) {
        font-size: 14px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 2px;
        left: 0;
        right: 0;
        border-bottom: 1px dashed #506981;
      }

      &.active {
        color: #798590;
        border-bottom: none;
        cursor: default;
        opacity: .8;

        &::after {
          border-bottom: none;
        }
      }
    }
  }

  .quadrature {
    background-color: #c2e3f2;
    width: 54px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 16px/16px 'PT Sans';
    cursor: default;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    sup {
      transform: translateY(-3px);
      font-size: 11px;
    }
  }
}
</style>
