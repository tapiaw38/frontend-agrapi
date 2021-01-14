<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addBarn" 
        @show="resetModalBarn"
        @ok="handleOkBarn"
        >
            <template #modal-title>
                <h4>Añadir a Galpones</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitBarn">
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

                <!--
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
                -->

            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'addBarnModal',
    data() {
        return {
            items: {
                surface: "",
                lat: "",
                lng: "",            
            }            
        }
    },
    methods: {
        resetModalBarn() {
            this.items.surface = ''
            this.items.lat = ''
            this.items.lng = ''
        },
    handleOkBarn(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitBarn()
        },
    handleSubmitBarn() {
            this.$emit('dataBarn',this.items)
            console.log(this.items)
        }
    }
}
</script>
