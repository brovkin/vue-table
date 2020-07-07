<template>
    <div class="modal__wrapper col">
        <template>
            <button v-if="modal" @click="handleModal(false)" class="modal__trigger-btn btn-flat">closed<i class="material-icons">close</i></button>
            <button v-else @click="handleModal(true)" class="modal__trigger-btn btn-flat">{{countSelected}} columns selected <i class="material-icons">arrow_drop_down</i></button>
        </template>
        <div v-if="modal" class="modal__block">
            <div class="modal__block-wrapper">
                <label class="modal__label modal__label-first">
                    <input type="checkbox" class="checkbox-green filled-in" @change="selectedAllColumns" :checked="checkAllSelected" />
                    <span>Select All</span>
                </label>
                <label class="modal__label" v-for="checkbox of sortData">
                    <input type="checkbox" class="checkbox-green filled-in" v-model="checkbox.selected" />
                    <span style="text-transform: capitalize">{{checkbox.title}}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        computed: {
          ...mapState({
            sortData: state => state.sortData,
            modal: state => state.modal
          }),
          countSelected() {
            return this.sortData.filter(item => item.selected).length;
          },
          checkAllSelected() {
            const length = this.sortData.filter(item => item.selected).length;

            return length === 6;
          },
        },
        methods: {
          selectedAllColumns(event) {
            return this.$store.commit('selectedAllColumns', event.target.checked);
          },
          handleModal(value) {
            this.$store.commit('modalChange', value);
          }
        },
    }
</script>

<style scoped lang="scss">
    .modal {
        &__wrapper {
            position: relative;
        }

        &__trigger-btn {
            display: flex;
            text-transform: lowercase;
            border: 1px solid #D5DAE0;
            border-radius: 2px;
            cursor: pointer;
            margin: 0 auto;
            min-width: 170px;
            justify-content: center;
        }

        &__block {
            position: absolute;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
            background-color: #fff;
            border-radius: 4px;
            padding: 1rem .5rem;
            top: 50px;
            left: -20px;
            min-width: 250px;

            &-wrapper {
                padding: .5rem;
                overflow-y: scroll;
                height: 200px;

                &::-webkit-scrollbar {
                    width: 4px;
                    background-color: transparent;
                }

                &::-webkit-scrollbar-thumb {
                    background: #D5DAE0;
                    border-radius: 4px;
                }
            }
        }

        &__label {
            margin: .5rem 0;
            display: block;
            &-first {
                margin-top: 0;
            }
        }
    }
</style>
