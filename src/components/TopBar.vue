<script setup lang="ts">
// imports
import { Icon } from '@iconify/vue'

// route
const route = useRoute()

// router
const router = useRouter()

// data
const user = ref<any>(localStorage.getItem('user'))

// methods
function goToHomePage() {
  router.push('/')
}

function goToAccountPage() {
  router.push('/account')
}
</script>

<template>
  <div class="top_bar_container border px-4">
    <div class="left_bar_items">
      <div v-if="route.fullPath === '/account'">
        <q-btn round unelevated style="border: 1px solid rgba(0,0,0,0.1);" @click="goToHomePage">
          <Icon icon="ri-arrow-left-line" />
        </q-btn>
      </div>
      <div v-else class="select-none text-4">
        <div class="flex items-center gap-1">
          <Icon icon="ri-user-fill" class="text-6" />
          {{ JSON.parse(user).full_name }}
        </div>
      </div>
    </div>
    <div class="right_bar_items">
      <q-btn v-show="route.fullPath !== '/account'" round unelevated style="border: 1px solid rgba(0,0,0,0.1);" @click="goToAccountPage">
        <Icon icon="ri-user-line" />
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top_bar_container {
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;

  & .left_bar_items {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  & .right_bar_items {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: right;
  }
}
</style>
