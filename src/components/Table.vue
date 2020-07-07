<template>
    <div class="container">
            <h1 class="table__title">Table UI</h1>
            <div class="divider"></div>
            <MainFilter/>
            <div class="table__wrapper" v-if="products.length">
                <table class="table striped highlight">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox-green filled-in" @change="allChecked"/>
                                    <span>&nbsp;</span>
                                </label>
                            </th>
                            <th class="table__column-title" v-for="(item, index) of sortData" :key="index">
                                <div @click="sortByName(item.id)" v-if="item.sorted" class="clicked-column green-text">
                                    {{item.title}}
                                    <i v-if="sorting.order === 'asc'" class="material-icons">arrow_upward</i>
                                    <i v-else class="material-icons">arrow_downward</i>
                                </div>
                                <div v-else>{{item.title}}</div>
                            </th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item of displayProducts"
                            :key="item.id">
                            <td>
                                <label>
                                    <input type="checkbox" class="checkbox-green filled-in" v-model="item.checked"/>
                                    <span>&nbsp;</span>
                                </label>
                            </td>
                            <td class="table__column-element" v-for="td of tableRow(item)">
                                {{td}}
                            </td>
                            <td>
                                <button
                                        :disabled="disabledDeleteBtn"
                                        class="delete-btn btn-flat grey-text"
                                        @click="isDeleteItem(item.id)">
                                    <i class="material-icons">delete</i>delete</button>
                                <DeleteAlert v-if="item.isDeleted" :item="item"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col s4">
                    <Preloader v-if="isLoading && !products.length"/>
                    <Error v-if="isError && !products.length"/>
                </div>
            </div>
    </div>
</template>

<script>
  import { sortBy, findBy, orderBy } from 'lodash';
    import Error from "./Error";
    import DeleteAlert from "./DeleteAlert";
    import MainFilter from "./MainFilter";
    import Preloader from "./Preloader";
    import { mapState } from 'vuex';
    export default {
      name: 'Table',
      components: {
        MainFilter,
        Error,
        Preloader,
        DeleteAlert
      },
      computed: {
        ...mapState({
          products: state => state.products,
          isLoading: state => state.isLoading,
          isError: state => state.isError,
          filter: state => state.filter,
          sorting: state => state.sorting,
          sortData: state => state.sortData.filter(item => item.selected),
        }),

        disabledDeleteBtn() {
          return !!this.products.filter(item => item.isDeleted).length;
        },

        displayProducts() {
          const items = this.products.filter((item, index) => {
            if (this.filter.currentPage === 1) {
              if (index < this.filter.perPage) {
                return true;
              }
            } else if (
              index >= (this.filter.perPage * this.filter.currentPage) - this.filter.perPage
              &&
              index < (this.filter.perPage * this.filter.currentPage)) {
              return true;
            }
          });

          return orderBy(items, this.sorting.name, this.sorting.order);
        }
      },
      mounted() {
        this.$store.dispatch('getData');
      },
      methods: {
        tableRow(row) {
          return Object.values(this.sortData).map(item => {
            return row[item.id];
          })
        },

        isDeleteItem(id) {
          return this.$store.commit('isDeleteItem', id);
        },

        sortByName(name) {
          return this.$store.commit('sortingByOrder', name);
        },

        allChecked(event) {
          return this.$store.commit('allChecked', event.target.checked);
        }
      },
    }
</script>

<style scoped lang="scss">
    .table {
        &.highlight > tbody > tr:hover {
            background: rgba(0, 161, 30, 0.07) !important;

            & .delete-btn {
                opacity: 1;
            }
        }
        &__title {
            margin: 1rem 0;
        }

        &__column {
            &-title {
                min-width: 100px;
            }

            &-element {
                min-width: 100px;
            }
        }
    }

    .clicked-column {
        display: flex;
        cursor: pointer;
    }

    .container {
        width: 90%;
        max-width: 1480px;
    }

    .delete-btn {
        display: flex;
        align-items: center;
        text-transform: none;
        opacity: 0;
        transition: .25s all ease;

        & i {
            margin-right: .5rem;
        }
    }
</style>
