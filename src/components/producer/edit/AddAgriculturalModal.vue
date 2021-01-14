<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addAgricultural" 
        @show="resetModalAgricultural"
        @ok="handleOkAgricultural"
        >
            <template #modal-title>
                <h4>Añadir a producción agricola</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitAgricultural">
                
                <b-form-group
                label="Tipo de actividad"
                label-for="activity_name"
                >
                <b-form-input
                    v-model="items.activity_name"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Superficie"
                label-for="surface"
                >
                <b-form-input
                    v-model="items.surface"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Destino"
                label-for="destination"
                >
                <b-form-input
                    v-model="items.destination"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Siembra"
                label-for="sowing"
                >
                <b-form-input
                    v-model="items.sowing"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Tipo de Siembra"
                label-for="type_sowing"
                >
                <b-form-input
                    v-model="items.type_sowing"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Edad de la producción"
                label-for="age"
                >
                <b-form-input
                    v-model="items.age"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Problemas"
                label-for="problems"
                >
                <b-form-input
                    v-model="items.problems"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Sugerencias"
                label-for="suggestion"
                >
                <b-form-input
                    v-model="items.suggestion"
                    required
                ></b-form-input>
                </b-form-group>

            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'AddAgriculturalModal',
    data() {
        return {
            items: {
                activity_name: "",
                surface: 0,
                destination: "",
                sowing: "",
                type_sowing: "",
                age: 0,
                problems: "",
                suggestion: "",
                agricultural_attendance: {
                    use_fertilizers: false,
                    use_food_organic: false,
                    use_pheromones: false,
                    use_hail_mesh: false,
                    make_frost_control: false,
                    other_practices: ""
                },
                agricultural_climatic: [],
                agricultural_pests: [],
                agricultural_harvest: {
                  harvest_surface: 0,
                  tons_production: 0,
                  has_curtains_insulated: false,
                  plant_length_curtains: 0,
                  plant_species_curtains: "",
                  harvest_time: ""
                },
                agricultural_sales_channel: {
                  is_collector: false,
                  is_cooperative: false,
                  is_exporter: false,
                  use_baler: false,
                  use_fair: false,
                  use_industry: false,
                  use_fridge: false
                }
            }     
        }
    },
    methods: {
        resetModalAgricultural() {
            this.items.activity_name = ''
            this.items.surface = 0
            this.items.destination = ''
            this.items.sowing = ''
            this.items.state_machine = ''
            this.items.type_sowing = ''
            this.items.age = 0
            this.items.problems = ''
            this.items.suggestion = ''
        },
    handleOkAgricultural(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitAgricultural()
        },
    handleSubmitAgricultural() {
            this.$emit('dataAgricultural',this.items)
        }
    }
}
</script>