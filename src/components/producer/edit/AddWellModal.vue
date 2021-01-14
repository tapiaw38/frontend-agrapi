<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addWell" 
        @show="resetModalWell"
        @ok="handleOkWell"
        >
            <template #modal-title>
                <h4>Añadir a Pozos</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitWell">
                <b-form-group
                label="Está activo"
                label-for="use_trailer"
                >
                    <b-form-checkbox
                        v-model.trim="items.is_active"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
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
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'addWellModal',
    data() {
        return {
            items: {
                is_active: "",
                lat: "",
                lng: "",            
            }            
        }
    },
    methods: {
        resetModalWell() {
            this.items.is_active = false
            this.items.lat = ''
            this.items.lng = ''
        },
    handleOkWell(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitWell()
        },
    handleSubmitWell() {
            this.$emit('dataWell',this.items)
        }
    }
}
</script>