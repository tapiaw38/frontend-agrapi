<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addProduction" 
        @show="resetModalProduction"
        @ok="handleOkProduction"
        >
            <template #modal-title>
                <h4>Añadir a producción</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitProduction">

                <b-form-group
                label="Es residente"
                label-for="is_resident"
                >
                    <b-form-checkbox
                        v-model.trim="items.is_resident"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Distrito"
                label-for="district"
                >
                <b-form-input
                    v-model="items.district"
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
                    type="number"
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Estado de los caminos"
                label-for="road_state"
                >
                <b-form-input
                    v-model="items.road_state"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Latitud"
                label-for="lat"
                >
                <b-form-input
                    v-model="items.lat"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Longitud"
                label-for="lng"
                >
                <b-form-input
                    v-model="items.lng"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Renspa"
                label-for="has_renspa"
                >
                    <b-form-checkbox
                        v-model.trim="items.has_renspa"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'AddProductionModal',
    data() {
        return {
            items: {
                is_resident: false,
                district: "",
                surface: 0,
                road_state: "",
                lat: "",
                lng: "",
                has_renspa: false,
                production_property: {
                    land_tenure: "",
                    has_land_title: true,
                    cadastre_registration: "",
                    starting_number: ""
                },
                production_service: {
                    has_service_aqua: false,
                    type_service_aqua: "",
                    has_service_energy: false,
                    type_service_energy: "",
                    has_rural_energy: false,
                    has_generator: false,
                    has_hydraulic_generator: false,
                    has_solar_panels: false
                },
                production_installation: {
                    has_windmills: false,
                    has_australian_tanks: false,
                    has_dams: false,
                    has_truck_scale: false,
                    has_fire_break: false,
                    has_minced_steel: false,
                    has_pools: false,
                    installation_barn: [],
                    installation_well: []
                },
                production_machine: [],
                production_irrigation: {
                    type_irrigation: "",
                    pressurized_irrigation: "",
                    surface_irrigation: "",
                    take_section: "",
                    watering_hours: 0,
                    channel_conditions: "",
                    right: "",
                    shifts: ""
                },
                production_agricultural: [],
                production_livestock: [],
                production_agroindustrial: []
            }            
        }
    },
    methods: {
        resetModalProduction() {
            this.form.is_resident = false
            this.form.district = ""
            this.form.surface = 0
            this.form.road_state = ""
            this.form.lat = ""
            this.form.lng = ""
            this.form.has_renspa = false
        },
    handleOkProduction(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit Worker
        this.handleSubmitProduction()

        },
    handleSubmitProduction() {
            this.$emit('dataProduction',this.items)
            console.log(this.items)
        }
    }
}
</script>
