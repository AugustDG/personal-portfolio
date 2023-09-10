<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({ canTransition: false, firstTransitioned: false, allTransitioned: false });

const logoTransitionDuration = 1500;
const rainbowTransitionDuration = 1200;

const router = useRouter();

onMounted(() => {
  window.onkeyup = (e) => {
      if (e.key === "Enter") {
        transitionOut();
      }   
  };

  window.ontouchstart = () => {
    transitionOut();
  };

  window.onclick = () => {
    transitionOut();
  };

  function transitionOut() {
    state.canTransition = true;

    setTimeout(() => {
      state.firstTransitioned = true;

      setTimeout(() => {
        state.allTransitioned = true;

        window.onkeyup = null;
        window.ontouchstart = null;
        window.onclick = null;

        router.push({ name: "projects" });

      }, rainbowTransitionDuration);
    }, logoTransitionDuration);
  }
});
</script>

<template>
  <div :class="['view-root', state.canTransition ? 'transitionOut' : '']">
    <img id="logo" v-if="!state.firstTransitioned" src="@/assets/logo-white.svg" alt="Augusto Pinheiro" />

    <div :class="['vhs-wrapper']">
      <div class="vhs one"></div>
      <div class="vhs two"></div>
      <div class="vhs three"></div>
      <div class="vhs four">
        <p>Press RETURN to continue:<span class="blinking">■</span></p>
      </div>
      <div class="vhs five"></div>
      <div class="vhs six"></div>
      <div class="vhs seven">
        <p>© 2023</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/animations.scss";

.view-root {
  --logo-height: 55vh;
  --logo-margin: 2rem;

  background-color: var(--splash-background);

  &.transitionOut {
    animation: fadeOut 1s ease-in-out forwards 1.7s;

    #logo {
      animation: slideOutLeft 1.5s forwards;
      animation-timing-function: var(--custom-bezier-1);
    }

    .vhs-wrapper {
      .vhs {
        p {
          animation: slideOutLeft 1.5s forwards;
          animation-timing-function: var(--custom-bezier-1);
        }

        @for $i from 1 through 5 {
          &:nth-child(#{$i}) p {
            animation-delay: 0.05s * $i;
          }
        }
      }

      animation: VHS_slideToCenter 2.2s forwards;
      animation-delay: 0.2s;
      animation-timing-function: var(--custom-bezier-1);

      //top: var(--logo-margin);
    }
  }
}

#logo {
  width: calc(100% - var(--logo-margin) * 2);
  height: var(--logo-height);

  margin: var(--logo-margin);
  margin-bottom: calc(var(--logo-margin) / 2);
}

.vhs-wrapper {
  position: absolute;
  bottom: var(--logo-margin);
  top: calc(var(--logo-height) + var(--logo-margin) * 2);

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: stretch;

  row-gap: 4px;

  transition-property: top;
  transition-delay: 1.5s;
  transition-duration: 0.75s;
  transition-timing-function: ease-in-out;

  .vhs {
    flex-grow: 1;
    min-height: 25px;
    width: 100%;

    perspective-origin: 50vw 50vh;

    &:has(p) {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        text-align: center;
        font-size: 50%;

        margin: -1.7rem 0;

        color: var(--pure-black);
      }
    }

    &.one {
      background-color: var(--vhs-one);
    }

    &.two {
      background-color: var(--vhs-two);
    }

    &.three {
      background-color: var(--vhs-three);
    }

    &.four {
      background-color: var(--vhs-four);

      p {
        font-family: var(--mono-font-family);

        .blinking {
          animation: blinking 1s infinite;
        }
      }
    }

    &.five {
      background-color: var(--vhs-five);
    }

    &.six {
      background-color: var(--vhs-six);
    }


    &.seven {
      background-color: var(--vhs-seven);

      p {
        font-family: var(--sans-font-family);
        font-size: 40%;
      }
    }
  }
}
</style>
