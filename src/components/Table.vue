<template>
    <div class="container">
            <h1>Table UI</h1>
            <div class="divider"></div>
            <MainFilter/>
            <div class="table__wrapper" v-if="products.length">
                <table class="striped">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>
                                <label>
                                    <input type="checkbox" class="filled-in" @change="allChecked"/>
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
                            <td col>{{item.id}} && {{item.display}}</td>
                            <td>
                                <label>
                                    <input type="checkbox" class="filled-in" v-model="item.checked"/>
                                    <span>&nbsp;</span>
                                </label>
                            </td>
                            <td class="table__column-element" v-for="td of tableRow(item)">
                                {{td}}
                            </td>
                            <td>
                                <button class="delete-btn btn-flat grey-text" @click="deleteItem(item.id)">
                                    <i class="material-icons">delete</i>delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Preloader v-if="isLoading"/>
            <Error v-if="isError"/>
    </div>
</template>

<script>
  import { sortBy, findBy, orderBy } from 'lodash';
    import Error from "./Error";
    import TableRow from "./TableRow";
    import MainFilter from "./MainFilter";
    import Preloader from "./Preloader";
    import { mapState, mapActions } from 'vuex';
    export default {
      name: 'Table',
      components: {
        MainFilter,
        Error,
        Preloader,
        TableRow
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
          })

          const updatedItems = items.map(item => {
            return {
              ...item,
              display: true
            }
          })

          return orderBy(updatedItems, this.sorting.name, this.sorting.order);
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

          // return newArray;
        },

        sortByName(name) {
          console.log(name);

          return this.$store.commit('sortingByOrder', name);
          // this.products = [];
        },

        deleteItem(id) {
          return this.$store.commit('deleteItem', id);
        },

        allChecked() {
          return this.$store.commit('allChecked');
        }
      },
    }
</script>

<style scoped lang="scss">

    .table {
        &__wrapper {
            /*height: 600px;*/
            /*overflow-y: scroll;*/
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

        & i {
            margin-right: .5rem;
        }
    }

</style>
