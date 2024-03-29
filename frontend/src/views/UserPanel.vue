<template>

  <Loading v-if="isLoading"/>

  <div v-else class="flex flex-col w-full !h-auto lg:flex-row items-center justify-center mt-10 gap-10">

    
    <div class="flex flex-col gap-4 h-full bg-gray-300/50 w-80 rounded-md p-5 shadow border items-center">
      <div class="flex w-full relative items-center justify-center">
        <div @click="toggleEditPicureModal" class="flex absolute hover:bg-slate-700/75 w-1/2 aspect-square rounded-full md:w-full items-center justify-center text-transparent cursor-pointer hover:text-black hover:shadow-md">Change Picture</div>
        <img class="w-1/2 aspect-square rounded-full object-cover shadow-md md:w-full" :src="user.userPicture">
      </div>
    </div>

    <form class="flex flex-col gap-4 bg-gray-300/50 w-80 h-full rounded-md p-5 shadow border md:w-[32rem] md:h-auto">

      <EditFormInput :input-name="'First Name'" :is-editing="isEditing" :value="user.firstName" v-on:input="updateValue($event, 'firstName')"/>

      <EditFormInput :input-name="'Last Name'" :is-editing="isEditing" :value="user.lastName" v-on:input="updateValue($event, 'lastName')"/>

      <EditFormInput :input-name="'Telephone'" :is-editing="isEditing" :value="user.telephone" v-on:input="updateValue($event, 'telephone')" />
      
      <EditFormInput :input-name="'Address'" :is-editing="isEditing" :value="user.address" v-on:input="updateValue($event, 'address')"/>

      <EditFormInput :input-name="'Number'" :is-editing="isEditing" :value="user.addressNumber" :type="'number'" v-on:input="updateValue($event, 'addressNumber')"/>

      <EditFormInput :input-name="'Zip Code'" :is-editing="isEditing" :value="user.zipCode" v-on:input="updateValue($event, 'zipCode')"/>

      <EditFormInput :input-name="'City'" :is-editing="isEditing" :value="user.city" v-on:input="updateValue($event, 'city')"/>

      <EditFormInput :input-name="'State'" :is-editing="isEditing" :value="user.state" v-on:input="updateValue($event, 'state')"/>

      <EditFormInput :input-name="'Country'" :is-editing="isEditing" :value="user.country" v-on:input="updateValue($event, 'country')"/>

      <div class="flex flex-col items-center">
        <button class="mt-4 w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click.prevent="toggleEdit">Edit</button>
        <button class="mt-4 w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" @click.prevent="handleEditUser">Save Changes</button>
      </div>
    </form>
  </div>

  <EditPictureModal v-if="isEditPictureModalOpen" v-on:closeModal="toggleEditPicureModal" :userActualPicture="user.userPicture" :userId="route.params.id"/>

</template>

<script setup>
import { getLoggedUser, updateUser, updateUserPicture, getUserById } from '../services/login'
import { onBeforeMount, ref } from 'vue'
import EditFormInput from '../components/EditFormInput.vue';
import EditPictureModal from '../components/EditPictureModal.vue';
import Loading from '../components/Loading.vue';

const user = ref({})
const isEditing = ref(false)
const isEditPictureModalOpen = ref(false)
const isLoading = ref(false)

const props = defineProps({
  id: String
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const updateValue = (value, key) => {
  user.value[key] = value
}


const handleEditUser = async () => {
  await updateUser(user.value.id, {...user.value})
  toggleEdit()
}

const toggleEditPicureModal = () => {
  isEditPictureModalOpen.value = !isEditPictureModalOpen.value
}

onBeforeMount(async () => {
  isLoading.value = true
  const userData = await getUserById(props.id)
  user.value = userData
  isLoading.value = false
})
</script>