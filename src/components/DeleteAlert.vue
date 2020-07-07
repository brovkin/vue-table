<template>
    <div class="delete-modal">
        <div class="delete-modal__wrapper">
            <Error v-if="isError"/>
            <template v-if="!isLoading">
            Are you sure you want to <b>delete item</b>?
            <div class="delete-modal__btn-block">
                <button @click="cancelDeleteItem(item.id)" class="delete-modal__cancel-btn btn-flat">Cancel</button>
                <button @click="deleteItem(item.id)" class="delete-modal__confirm-btn btn btn-small green">
                    Confirm
                    <Preloader v-if="isLoading"/>
                </button>
            </div>
            </template>
            <Preloader v-if="isLoading"/>
        </div>
    </div>
</template>

<script>
    import Preloader from "./Preloader";
    import Error from "./Error";
    import { mapState } from 'vuex';
    export default {
      props: ['item'],
      components: {
        Preloader,
        Error
      },
      computed: {
        ...mapState({
            isError: state => state.isError,
            isLoading: state => state.isLoading,
            errorMessage: state => state.errorMessage
        })
      },
      methods: {
        deleteItem(id) {
          return this.$store.dispatch('deleteItem', id);
        },
        cancelDeleteItem(id) {
          return this.$store.commit('cancelDeleteItem', id);
        }
      }
    }
</script>

<style scoped lang="scss">
    .delete-modal {
        position: relative;
        &__wrapper {
            position: absolute;
            width: 300px;
            left: -100px;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
            border-radius: 4px;
            padding: 1rem;
        }

        &__cancel-btn {
            margin-right: 1rem;
        }

        &__btn-block {
            margin: 1rem .5rem;
        }
    }
</style>
