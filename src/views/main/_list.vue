<template>
  <div class="main__list">
    <h2 class="main__list-title">Автомобили в наличии</h2>
    <div
        v-if="!isMobile()"
        class="main__list_product"
    >
      <div
          v-for="item in header" :key="item.id"
          :class="`main__list_product_${item.id}`"
      >
        {{ item.title }}
      </div>
    </div>
    <div v-if="!isMobile()">
      <div
          v-for="item in items" :key="item.title"
          class="main__list_product_item"
      >
        <div class="main__list_product_title">
          {{ item.title }}
          <div class="main__list_product_title_description">{{ item.description}}</div>
        </div>
        <div class="main__list_product_year">{{ item.year }}</div>
        <div class="main__list_product_color">
          <div
              class="main__list_product_color-item"
              :style="`background:${colors(item.color)};${(item.color === 'white') ? 'border: 1px solid #8B8B8B;' : ''}`"
          >
          </div>
        </div>
        <div
            v-html="status(item.status)"
            class="main__list_product_status"
        ></div>
        <div class="main__list_product_price">{{ price(item.price) }}</div>
        <button v-on:click="remove(item)" class="main__list_product_remove">Удалить</button>
      </div>
    </div>
    <div v-if="isMobile()">
      <div
          v-for="item in items" :key="item.title"
          class="main__list_product_item_mobile"
      >
        <div class="main__list_product_title">
          {{ item.title }}
        </div>
        <div
            class="main__list_product_color-item"
            :style="`background:${colors(item.color)};${(item.color === 'white') ? 'border: 1px solid #8B8B8B;' : ''}`"
        >
        </div>
        <div class="main__list_product_price">{{ price(item.price) }}</div>
        <div class="main__list_product_title_description">{{ item.description}}</div>
        <div class="main__list_product_year">{{ item.year }}</div>
        <div
            v-html="status(item.status)"
            class="main__list_product_status"
        ></div>
        <button v-on:click="remove(item)" class="main__list_product_remove">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {colors, status, table} from '../../config/index.ts'
export default {
  name:'List',

  data: function() {
   return {
     header: table,
     isMobile: () => (screen.width <= 764)
   }
  },
  props: {
   items: {
     msg: Array,
     default: []
   }
  },
  methods: {
    remove(item) {
      this.$store.commit('removeItem', item.id)
    },

    colors(color) {
      for(let key in colors) {
        if(key === color) {
          return colors[key]
        }
      }
      return 'black'
    },

    status(item) {
      for(let key in status) {
        if(key === item) {
          return status[key]
        }
      }
      return 'Нет в наличии'
    },

    price(item) {
      let price = item.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
      return `${price} руб.`
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/index.scss";
@import "../../assets/global.scss";
.main__list {
  margin-bottom: 266px;

  &-title {
    text-align: left;
    font: 20px/24px Roboto, serif;
    color: $black;
    font-weight: bold;
    text-transform: uppercase;
    padding-left: 12px;
    position: relative;
    margin-top: 150px;
    margin-bottom: 30px;

    &:after {
      content: "";
      position: absolute;
      top:0;
      left: 0;
      height: 100%;
      width: 3px;
      border-left: 2px;
      background: $label;
    }

    @include respond-to(tablet) {
      margin-top: 80px;
    }

    @include respond-to(phone) {
      margin-top: 32px;
      margin-bottom: 16px;
      margin-left: 20px;
      font: 20px/23px Roboto, serif;
      font-weight: bold;
    }
  }

  &_product {
    display: flex;
    flex-direction: row;
    background: $red;
    height: 44px;
    color: white;
    font-weight: bold;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    &_item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      background: $background-list;
      align-items: baseline;
      font-weight: 300;
      font: 15px/20px Roboto, serif;
      color: $list-font;
      border-bottom: 1px solid $white-border;

      &:last-child {
        margin-bottom: 16px;
        border-bottom: unset;
      }

      @include respond-to(phone) {
        display: none;
      }

      &_mobile {
        display: none;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;

        :after {
          content:"";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border-bottom: 1px solid $white-border;
          height: 2px;
        }

        @include respond-to(phone) {
          display: flex;
          justify-content: space-between;
          padding: 16px 20px 20px;
          background: $background-list;
        }
      }
    }

    &_title {
      width: 510px;
      white-space: pre-wrap;
      overflow: hidden;
      box-sizing: border-box;
      padding: 16px;

      &_description {
        font: 13px/20px Roboto, serif;
        color: $label;

        @include respond-to(phone) {
          padding: 0;
          width: 100%;
          color: $list-font;
          margin-top: 10px;
        }
      }

      @include respond-to(tablet) {
        width: 256px;
      }

      @include respond-to(phone) {
        width: 50%;
        color: $list-font;
        padding: 0;
      }
    }

    &_year {
      width: 40px;

      @include respond-to(phone) {
        align-self: center;
        margin-top: 20px;
      }
    }

    &_color {
      width: 40px;
      display: flex;
      justify-content: center;

      &-item {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        transform: translateY(5px);

        @include respond-to(phone) {
          transform:unset;
        }
      }
    }

    &_status {
      width: 100px;

      @include respond-to(phone) {
        align-self: center;
        margin-top: 20px;
      }
    }

    &_price {
      width: 100px;

      @include respond-to(phone) {
        color: $list-font;
      }
    }

    &_remove {
      border: none;
      color: inherit;
      background-color: transparent;
      cursor: pointer;
      height: 29px;
      width: 85px;
      margin-right: 30px;
      font: 14px/20px Roboto, serif;

      &:hover, &:focus {
        margin-right: 30px;
        border-radius: 20px;
        background: $black;
        color: white;

        @include respond-to(phone) {
          margin-right: 0;
          margin-top: 20px;
        }
      }

      @include respond-to(phone) {
        border-radius: 20px;
        background: $black;
        color: white;
        margin-right: 0;
        margin-top: 20px;
      }
    }

    @include respond-to(phone) {
      display: none;
    }
  }
  @include respond-to(tablet) {
    margin-bottom: 318px;
  }

  @include respond-to(phone) {
    margin-bottom: 0;
  }
}
</style>