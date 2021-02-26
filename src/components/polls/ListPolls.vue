<template>
    <div class="container-fluid pl-4 pr-4 list content-app">
        <div class="row">
            <div class="col-12 pt-4 pb-4">
                <h4>
                    Encuestas mensuales
                    <b-badge class="ml-2" variant="success">{{ filterPolls.length }}</b-badge>
                </h4>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-table striped hover :items="filterPolls" :fields="fields" :busy="isBusy">
                    <template v-slot:cell(image)>
                        <b-icon icon="person" font-scale="2"></b-icon>
                    </template>

                    <template v-slot:cell(producer)="data">
                        {{ data.item.producer.first_name }} {{ data.item.producer.last_name }}
                    </template>

                    <template v-slot:cell(created)="data">
                        {{ data.item.created | date-filter }}
                    </template>

                    <template v-slot:cell(district)="data">
                        {{ data.item.producer.producer_home.district }}
                    </template>

                    <template v-slot:table-busy>
                        <div class="text-center text-success my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong>Loading...</strong>
                        </div>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            page: 1,
            fields : [
                {key : 'image', label : ''},
                {key : 'user', label : 'Encuestador'},
                {key : 'created', label : 'Creado'},
                {key : 'producer', label : 'Productor'},
                {key : 'district', label : 'Distrito'}
            ],
            maxDay: '',
            minDay: '',
        }
    },
    mounted() {
        this.retrieveProduction(this.page)
    },
    methods: {
        ...mapActions([
            'retrieveProduction'
        ]),
        addDays () {
            var d = new Date();
            var day = d.getUTCDate();
            var month = d.getUTCMonth();
            var year = d.getUTCFullYear();

            if (month == 0) {
                month = 12
                year = d.getUTCFullYear()-1
            }
            if (month < 10){
                month = "0"+month
            }
            this.maxDay = year + "-" + month + "-" + day;
            this.minDay = year + "-" + month + "-" + "31";
        },

    },
    computed: {
        ...mapGetters({
            production: 'production',
            pages: 'pages',
            isBusy: 'isBusy',
        }),
        filterPolls: function () {
            return this.production.filter(items => items.created > this.minDay )
        }
    },
    created() {
        this.addDays()
    },
}
</script>