<template>
    <div>
        <b-modal id="bv-modal-edit-profile" hide-footer>
            <template #modal-title>
                <h4>Editar información</h4>
            </template>
            
            <b-alert v-model="showEditProfileAlert" variant="success" dismissible>
            Información actualizada!
            </b-alert>
            <div class="d-block">
                <form @submit="onSubmit" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="first_name">Nombre</label>
                        <input type="text" class="w-100 form-control" name="first_name" placeholder="Nombre" v-model.trim='form.first_name'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="last_name">Apellido</label>
                        <input type="text" class="w-100 form-control" name="last_name" placeholder="Apellido" v-model.trim='form.last_name'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>        
                    <div class="form-group">
                        <label for="">Teléfono</label>
                        <input type="text" class="w-100 form-control" name="phone_number" placeholder="" v-model.trim='form.phone_number'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>
                    <b-button type="submit" size="md" variant="info" class="btn-block">Actualizar</b-button>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    name: 'EditProfileModal',
    data() {
        return {
            canvas: '',
            context: '',
            imagen: '',
            archivo: '',
            showEditProfileAlert: false,
            form: {
                first_name: '',
                last_name: '',
                phone_number: '',
                profile: {
                    picture: null
                }
            },
        }
    },
    computed: {
        ...mapGetters({
            email: 'email',
            store_first_name: 'first_name',
            store_last_name: 'last_name',
            store_phone_number: 'phone_number',
            store_picture: 'picture',
            editProfileAlert: 'editProfileAlert',
        })
    },
    mounted() {
        //this.retrieveProfile(this.username)
        this.getProfile()
    },
    methods: {
        ...mapActions([
                'retrieveProfile',
            ]),
        onSubmit(event) {
            event.preventDefault();
            this.retrieveProfile(this.form)
            this.showEditProfileAlert = this.$store.state.editProfileAlert
        },
        getProfile () {
            this.form.first_name = this.store_first_name
            this.form.last_name = this.store_last_name
            this.form.phone_number = this.store_phone_number
        },
    },
    created() {
        //this.getProfile()
    },
}
</script>