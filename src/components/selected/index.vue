<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
          v-for="(option, i) in options"
          :key="i"
          @click="select(i);
          selected = option;
          open = false;
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'Selected',
  props: {
    options: {
      type: Object,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  methods: {
    select(item) {
      this.emitter.emit('input', item)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
@import "../../assets/global.scss";

.custom-select {
  position: relative;
  width: 306px;
  height: 44px;
  text-align: left;
  outline: none;
  line-height: 38px;
  display: flex;
  flex-direction: row;

  @include respond-to(tablet) {
    width: 220px;
  }

  @include respond-to(phone) {
    width: 49%;
  }
}

.custom-select .selected {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid $white-snake;
  color: $label;
  width: 100%;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
  background: white url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat;
  background-position-x: calc(100% - 15px);
  background-position-y: 10px;
}

.custom-select .selected.open {
  border: 1px solid $white-snake;
  border-radius: 4px 4px 0 0;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
}

.custom-select .items {
  color: green;
  border-radius: 0 0 0 0;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  top:44px;
}

.custom-select .items div {
  color: $label;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  color: $black;
}

.selectHide {
  display: none;
}

.items {
  border: 1px solid $white-snake;
  background: white;
  border-top: 2px solid $black;;
}
</style>