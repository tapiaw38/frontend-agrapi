<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addVehicle" 
        @show="resetModalVehicle"
        @ok="handleOkVehicle"
        >
            <template #modal-title>
                <h4>Añadir a vehiculos</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitVehicle">
                <b-form-group
                label="Vehiculo"
                label-for="name_vehicle"
                >
                <b-form-input
                    v-model="items.name_vehicle"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="usa acoplado"
                label-for="use_trailer"
                >
                    <b-form-checkbox
                        v-model.trim="items.use_trailer"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Tipo de acoplado"
                label-for="type_trailer"
                >
                <b-form-input
                    v-model="items.type_trailer"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Usa semi acoplado"
                label-for="use_semitrailer"
                >
                    <b-form-checkbox
                        v-model.trim="items.use_semitrailer"
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
    name: 'addVehicleModal',
    data() {
        return {
            items: {
                name_vehicle: "",
                use_trailer: false,
                type_trailer: "",
                use_semitrailer: false,            
            }            
        }
    },
    methods: {
        resetModalVehicle() {
            this.items.name_vehicle = ''
            this.items.use_trailer = false
            this.items.type_trailer = ''
            this.items.use_semitrailer = false
        },
    handleOkVehicle(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitVehicle()
        },
    handleSubmitVehicle() {
            this.$emit('dataVehicle',this.items)
            console.log(this.items)
        }
    }
}
</script>

