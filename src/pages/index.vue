<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useToast } from 'vue-toastification'
import { socket } from '~/socket/index'
import axios from '~/utils/axios'

// types
interface IUserType {
  id: number
  full_name: string
  username: string
  date: string
}

// toast
const toast = useToast()

// users
const users = ref<IUserType[]>([])
const search_value = ref<string>('')
const user_list = ref<IUserType | null>()
const message_active = ref<boolean>(true)

// methods
function emitToSocket() {
  socket.emit('send-message', {
    data: {
      message: 'Salom',
    },
  })
}
async function searchUser() {
  try {
    const response = await axios.get('/api/get-users/', {
      params: {
        username: search_value.value,
      },
    })
    users.value = response.data.data
  }
  catch (e: any) {
    toast.error(e?.response?.data?.message || 'Error!')
  }
}

function goUserList(user: IUserType) {
  const local_user = JSON.parse(localStorage.getItem('user'))
  if (local_user.id === user.id)
    message_active.value = false
  else
    message_active.value = true

  user_list.value = user
}

function clearMessageList() {
  search_value.value = ''
  user_list.value = null
  searchUser()
}
</script>

<template>
  <div class="flex" @keyup.esc="clearMessageList">
    <div class="left_bar">
      <div class="search p-2">
        <q-input v-model="search_value" outlined dense placeholder="Search..." @update:model-value="searchUser()" />
      </div>

      <div v-if="users.length > 0" class="px-2">
        <div v-for="(user) of users" :key="user.id" class="users_list" @click="goUserList(user)">
          {{ user.full_name }}
        </div>
      </div>
      <div v-else>
        <div class="flex items-center gap-1 px-2">
          <Icon icon="ri-error-warning-line" class="text-4" /><span>No data!</span>
        </div>
      </div>
    </div>
    <div class="page_view">
      <div v-if="user_list" class="page">
        {{ user_list }}
      </div>
      <div v-else class="page">
        No data
      </div>
      <div v-show="user_list && message_active" class="bottom_bar">
        <div class="flex items-center p-2">
          <div class="w-29/30">
            <q-input dense outlined placeholder="Write a message!" />
          </div>
          <div class="w-1/30 flex justify-end">
            <q-btn round color="primary" unelevated>
              <Icon icon="ri-send-plane-line" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page_view {
  width: 80%;
  height: 100vh;
   & .page {
    width: 100%;
    height: 100%;
    background: #fff;
   }
   .bottom_bar {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    background: #e7f3ff;
    border-radius: 4px;
    width: 100%;
   }
}

.left_bar {
  width: 20%;
  height: 100vh;
  overflow: scroll;
  background: #fff;
   & .users_list {
    width: 100%;
    height: 45px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-top: 4px;
   }
  .users_list:hover {
    background: #e7f3ff69;
  }
  .users_list:active {
    background: #e7f3ff;
  }
}
</style>
