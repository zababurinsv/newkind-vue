<template>
  <div class="main__card">
    <h2 class="main__card-title"> ¡Ay caramba! </h2>
    <div class="main__card-info">
      <label for="title" class="main__card-info_item">
        <input type="text" id="title" class="main__card-info_item_input" placeholder="Название" v-model="title">
      </label>
      <label for="years" class="main__card-info_item">
        <input type="text" id="years" class="main__card-info_item_input" placeholder="Год" v-model="year">
      </label>
      <label for="price" class="main__card-info_item main__card-info_item_element">
        <input type="text" class="main__card-info_item_input" id="price" placeholder="Цена" v-model="price">
      </label>
      <label for="description" class="main__card-info_item">
        <input type="text" id="description" class="main__card-info_item_input" placeholder="Описание" v-model="description">
      </label>
    </div>
    <div class="main__card-info">
      <div class="main__card-info-color">
        <p
          v-for="(value, name) in colors"
          :key="value"
          :style="`background:${value}; ${(name === 'white') ? 'border: 1px solid #8B8B8B;' :''}`"
          class="main__card-info-color_item"
        >
          <input
              type="radio"
              :value="`${name}`"
              v-model="color"
              class="main__card-info-color_item_input"
          >
          <label class="main__card-info-color_item_label"></label>
        </p>
      </div>
      <selected
        :options="statuses"
        :default="'Статус'"
        class="main__card-info-available"
      />
      <button
          v-on:click="sendItem()"
          class="main__card-info-send"
      >
        <span>Отправить</span>
      </button>
    </div>
  </div>
</template>

<script>
import {colors, status} from '../../config/index.ts'
import {verify} from '../../utils/index.ts'
import Selected from '@/components/selected/index.vue'

export default {
  name:'Card',
  components: { Selected },
  data: function() {
    return {
      isActive: false,
      colors: colors,
      statuses: status,
      title: '',
      year: '',
      color: '',
      description: '',
      id: 0,
      price: '',
      status: ''
    }
  },
  mounted () {
    this.emitter.on('input', args => this.status = args )
  },
  methods: {
    sendItem() {
      const id = Date.now() + Math.random()
      let item = {
        title: this.title,
        year: parseInt(this.year, 10),
        color: this.color,
        description: this.description,
        id: id,
        price: parseFloat(this.price),
        status: this.status
      }
      if(verify(item)) {
        this.$store.commit("saveItem", item)

        this.status = ''
        this.price = ''
        this.id = 0
        this.description = ''
        this.color = ''
        this.year = ''
        this.title = ''
      }
    },
    getColor(color) {
      for(let key in colors) {
        if(key === color) {
          return colors[key]
        }
      }
      return 'black'
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/index.scss";
@import "../../assets/global.scss";

.main__card {
  &-title {
    margin-top: 55px;
    margin-bottom: 60px;
    text-align: center;
    font: 42px/50px Roboto, serif;

    @include respond-to(phone) {
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }

  &-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 32px;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &-color {
      display: flex;
      flex-direction: row;
      align-self: self-end;
      position: relative;
      transform: translateY(16px);

      &_item {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        margin: 0 24px 0 0;
        display: flex;
        flex-direction: column;
        box-sizing: content-box;

        &_input {
          width: 100%;
          height: 100%;
          margin: 0;
          z-index: 33;
          opacity: 0;
          cursor: pointer;
        }

        &_input:checked + label:after {
          background: $red;
        }

        &_input + label:after {
          content: "";
          margin: 0;
          position: absolute;
          background: transparent;
          width: 19px;
          height: 19px;
          top: 0;
          left: 0;
          z-index: -1;
          border-radius: 50%;
          box-sizing: content-box;
          transform: scale(1.3);
        }
      }

      &:after {
        content:"Цвет";
        position: absolute;
        top: -30px;
        left: 0;
        color: $label;
        font: 14px/24px Roboto, serif;
      }

      @include respond-to(phone) {
        transform: unset;
        margin-top: 30px;
        margin-bottom: 30px;
      }

    }

    &-send {
      width: 308px;
      height: 44px;
      cursor: pointer;
      background: $red;
      outline: none;
      margin: 0;
      border: 0;
      border-radius: 4px;

      > span {
        color: white;
        position: relative;
        font: 16px/36px Roboto, serif;
        font-weight: bold;
        text-transform: uppercase;
        font-weight: bold;

        &:after {
          content: url(../../assets/img/arrow.png);
          position: absolute;
          top: -7px;
          right: -20px;
          font-weight: bold;
        }

        @include respond-to(phone) {
          font: 16px/36px Roboto, serif;
          margin-right: 24px;
        }
      }

      @include respond-to(tablet) {
        width: 220px;
      }

      @include respond-to(phone) {
        width: 49%;
      }
    }

    &_item {
      display: flex;
      min-width: 30%;
      height: 40px;
      margin-left: 20px;
      flex-grow: 1;
      border: 1px solid $white-border;
      background: white;
      margin-bottom: 30px;
      position: relative;
      font: 14px/24px Roboto, serif;
      box-sizing: content-box;

      &_input {
        box-sizing: content-box;
        text-indent: 10px;
        border: none;
        width: 100%;
        color: $black;
        border-bottom: 3px solid transparent;

        &::placeholder {
          color: $label;
          font: 14px/24px Roboto, serif;
        }

        &:focus {
          border-bottom: 3px solid $red;
          box-sizing: content-box;
        }
      }

      &_element:after {
          content: 'Цена';
          position: absolute;
          top: -25px;
          left: 10px;
          font: 14px/24px Roboto, serif;
          color: $label;
      }

      &_element:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: $black;

        &:focus {
          background: transparent;
        }
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-left: 0;
        margin-bottom: 0;
      }

      @include respond-to(phone) {
        width: 20%;

        &:first-child {
          width: 100%;
          order: 1;
        }

        &:last-child {
          width: 100%;
          order: 4;
        }

        &:nth-child(2) {
          order: 3;
        }

        &:nth-child(3) {
          margin-left: 0;
          order: 2;
        }
      }
    }
  }

  @include respond-to(phone) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>