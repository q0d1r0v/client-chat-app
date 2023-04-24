<script setup lang="ts">
// imports
import { useToast } from 'vue-toastification'
import axios from '~/utils/axios'

// types
interface IFormTypes {
  full_name: string
  username: string
  password: string
}

// router
const router = useRouter()

// toast
const toast = useToast()

// data
const form = ref<IFormTypes>({
  full_name: '',
  username: '',
  password: '',
})

// methods
function goToLoginPage() {
  router.push('/auth/login')
}

async function sendForm() {
  try {
    if (form.value.full_name && form.value.username && form.value.password) {
      await axios.post('/auth/register', {
        full_name: form.value.full_name,
        username: form.value.username,
        password: form.value.password,
      })
      form.value.full_name = ''
      form.value.username = ''
      form.value.password = ''
      toast.success('Register is successful!')
      router.push('/auth/login')
    }
    else {
      toast.warning('Do\'t have all data!')
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
  <div class="register_container">
    <div class="register_block">
      <div class="py-2 text-center text-8">
        Register
      </div>

      <div class="form_block px-4">
        <q-input v-model="form.full_name" filled placeholder="Full name" />
        <q-input v-model="form.username" filled placeholder="Username" class="mt-2" />
        <q-input v-model="form.password" filled placeholder="Password" type="password" class="mt-2" />
      </div>
      <div class="select-none px-4 text-right">
        <span class="cursor-pointer transition-all hover:text-orange" @click="goToLoginPage">I have account</span>
      </div>

      <div class="form_footer">
        <q-btn class="mx-2 mb-4 w-full py-3" style="border: 1px solid rgba(0,0,0,0.1);" color="green" unelevated flat @click="sendForm">
          Register
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register_container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e7f3ff;
    & .register_block {
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
