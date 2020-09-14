<template>
    <div>
        <b-row>
            <h1>Список пользователей</h1>
            <b-spinner
                v-if="pageLoading"
                style="width: 3rem; height: 3rem;" 
                class="mx-3 py-3"
                label="Loading users"
            ></b-spinner>
        </b-row>
        <template v-if="!loading">
            <b-table
                show-empty
                small
                stacked="md"
                :items="users"
                :fields="fields"
                :total-rows="totalRows"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
            >
                <template v-slot:cell(name)="row">
                    {{ row.item.first_name }} {{ row.item.last_name }}
                </template>

                <template v-slot:cell(actions)="row">
                    <router-link  tag="b-button" :to="`users/${row.item.id}`">Перейти</router-link>
                </template>
            </b-table>

            <b-row>
                <b-col class="my-3">
                    <b-pagination
                        v-model="paginationModel"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>
        </template>

        <div v-else class="d-flex justify-content-center">
            <b-spinner
                style="width: 5rem; height: 5rem;" 
                label="Loading users"
            ></b-spinner>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    async mounted() {
        try {
            this.loading = true
            this.$store.dispatch('fetchUsersFromPage', 1)
        } finally {
            this.loading = false
        }
    },
    data () {
        return {
            fields: [
                { key: 'id', label: 'id', sortable: true},
                { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
                { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
                { key: 'actions', label: 'Actions' }
                ],
            currentPage: 1,
            paginationModel: 1,
            pageOptions: [5, 10, 15],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            pageLoading: false,
            loading: false
        }
    },
    computed: {
        ...mapState({
            users: state => state.users.list,
            perPage: state => state.users.perPage,
            totalRows: state => state.users.total,
            totalPages: state => state.users.totalPages
        }),
    },
    watch: {
        async paginationModel(value) {
            try {
                this.pageLoading = true
                await this.$store.dispatch('fetchUsersFromPage', value)
            } finally {
                this.pageLoading = false
            }
            
        }
    }
}
</script>

<style>

</style>