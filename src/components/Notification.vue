<template>
  <navbar />
</template>

<script setup>
import { getToken } from '@/util/auth'
import router from '@/router'
import { notification } from '@/api/notification'
import Navbar from '@/layout/components/Navbar'

if (getToken() === undefined) {
  router.replace('/')
}
const id = location.href.split('/notification/')[1]
notification(id).then(res => {
  router.replace('/question/' + res.data)
})
</script>
