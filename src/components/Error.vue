<template>
    <div class="row">
        <div class="col s12">
            <div @click="refresh" class="card-panel error red lighten-3 white-text">
                {{error}} <i class="refresh material-icons">refresh</i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        computed: {
          ...mapState({
            error: state => state.errorMessage
          })
        },
        methods: {
          refresh() {
            location.reload();
          }
        }
    }
</script>

<style scoped lang="scss">
    .error {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 10px 0 rgba(0,0,0, 0.2);
        }

        &:hover .refresh {
            transform: rotate(360deg);
        }
    }

    .refresh {
        transition: .3s all ease-in-out;
    }
</style>
