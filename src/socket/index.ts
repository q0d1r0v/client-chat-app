// imports
import { io } from 'socket.io-client'

export const connected = ref<boolean>(false)

// socket
export const socket = io('http://localhost:3001/')

// operations
socket.on('connect', () => {
  connected.value = true
})

socket.on('disconnect', () => {
  connected.value = false
})
