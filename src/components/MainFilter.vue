<template>
    <div>
        <div class="main-filter row">
            <div class="col">
                <span class="main-filter__sorting-title">Sorting By: </span>
                <button v-for="(btn, index) of sortData"
                        :key="index"
                        :class="[getSortBtnClass(btn.active), 'filter-btn']"
                        @click="sortingByName(btn.id)"
                        :disabled="!btn.selected"
                >{{btn.title}}</button>


            </div>
            <div class="col">
                <button class="btn green" @click="deleteChecked">Delete ({{checkedItems}})</button>
            </div>
            <div class="col">
                <select @change="itemsPerPage">
                    <option value="10" selected>10 Per Page</option>
                    <option value="15">15 Per Page</option>
                    <option value="20">20 Per Page</option>
                </select>
            </div>
            <div class="col s2">
<!--                PAGE: {{currentPage}}-->
<!--                inc: {{Math.ceil(this.products.length / this.perPage)}}-->
                <div class="pagination-block">
                    <button class="btn btn-small green pagination-block__btn" :disabled="this.currentPage === 1" @click="decrementPage"><i class="material-icons">chevron_left</i></button>
                        <div class="pagination-block__center">
                            {{getCurrentPagination}}
                            of
                            {{getAllCount}}
                        </div>
                    <button class="btn btn-small green pagination-block__btn" :disabled="this.currentPage === Math.ceil(this.products.length / this.perPage)" @click="incrementPage"><i class="material-icons">chevron_right</i></button>
                </div>
            </div>

            <SelectColumns/>

        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import SelectColumns from "./SelectColumns";
    export default {
      name: 'MainFilter',
      components: {
        SelectColumns
      },
      computed: {
        ...mapGetters(['checkedItems', 'getAllCount']),
        ...mapState({
          products: state => state.products,
          perPage: state => state.filter.perPage,
          currentPage: state => state.filter.currentPage,
          sortData: state => state.sortData
        }),
        getCurrentPagination() {
          let pageInstance = this.perPage * this.currentPage;
          let lastPage = this.getAllCount / this.perPage;
          if (lastPage === this.currentPage) {
            return `${pageInstance - (this.perPage - 1)} - ${this.getAllCount}`
          } else {
            return `${pageInstance - (this.perPage - 1)} - ${pageInstance}`
          }

        },

      },
      methods: {
        selectedAllColumns(event) {
          return this.$store.commit('selectedAllColumns', event.target.checked);
        },
        getSortBtnClass(active) {
          return active ? 'btn green' : 'btn-flat';
        },
        deleteChecked() {
          return this.$store.commit('deleteChecked');
        },
        itemsPerPage(event) {
          return this.$store.commit('itemsPerPage', event.target.value);
        },
        incrementPage() {
          return this.$store.commit('incrementPage');
        },
        decrementPage() {
          return this.$store.commit('decrementPage');
        },
        sortingByName(name) {
          return this.$store.commit('sortingByName', name);
        }
      }
    }
</script>

<style scoped lang="scss">

    .main-filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;

        &__sorting-title {
            margin-right: 1rem;
            font-weight: 500;
        }
    }

    .pagination-block {
        display: flex;
        align-items: center;

        &__btn {
            padding: 0 10px;
        }

        &__center {
            width: 150px;
            text-align: center;
        }
    }

    select {
        display: block;
    }

    .filter-btn {
        font-size: 14px;
        text-transform: initial;
        padding: 0 10px;

        &:focus {
            background-color: transparent;
        }
    }


</style>
