<script setup lang="ts">
// imports
import { useToast } from 'vue-toastification'
import axios from '~/utils/axios'

// types
interface IFormTypes {
  username: string
  password: string
}

// router
const router = useRouter()

// toast
const toast = useToast()

// data
const form = ref<IFormTypes>({
  username: '',
  password: '',
})

// methods
function goToRegisterPage() {
  router.push('/auth/register')
}

async function sendForm() {
  try {
    if (form.value.username && form.value.password) {
      const response = await axios.post('/auth/login', {
        username: form.value.username,
        password: form.value.password,
      })
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('access_token', response.data.access_token)
      router.push('/')
    }
    else {
      toast.warning('Don\'t have all data!')
    }
  }
  catch (e: any) {
    toast.error(e?.response?.data?.message || 'Error !')
  }
}

// mounted
onMounted(() => {
  if (localStorage.getItem('access_token'))
    router.push('/')
})
</script>

<template>
  <div class="login_container">
    <div class="login_block">
      <div class="py-2 text-center text-8">
        Login
      </div>

      <div class="form_block px-4">
        <q-input v-model="form.username" filled placeholder="Username" />
        <q-input v-model="form.password" filled placeholder="Password" type="password" class="mt-2" />
      </div>
      <div class="select-none px-4 text-right">
        <span class="cursor-pointer transition-all hover:text-orange" @click="goToRegisterPage">I don't have account</span>
      </div>

      <div class="form_footer">
        <q-btn class="mx-2 mb-4 w-full py-3" style="border: 1px solid rgba(0,0,0,0.1);" color="green" unelevated flat @click="sendForm">
          Login
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e7f3ff;
    & .login_block {
      width: 600px;
      height: 400px;
      background: #fff;
      position: relative;
         & .form_block {
          width: 100%;
         }
         & .form_footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: end;
         }
    }
}
</style>

<route lang="yaml">
meta:
  layout: auth
  </route>
