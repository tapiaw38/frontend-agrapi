<template>
    <div class="container content-profile">
        <div class="mb-2 card p-4 mt-4">
            <div class="row p-2">
                <div class="col-sm-4 d-flex justify-content-center" id="content-img">
                               
                    <img :src="picture" alt="" class="rounded-circle bg-secondary" width="150px" height="150px" id="img-profile">
                    <b-link id="edit-img" class="text-info btn">
                        <b-icon
                        id="show-btn" @click="$bvModal.show('bv-modal-edit-picture')" 
                        scale="1.5" icon="pencil" aria-hidden="true"></b-icon>
                    </b-link>
                </div>

                <div class="col-sm-8 pt-4">
                    <h4 style="font-weight: 100;">
                        {{first_name}} {{last_name}}
    
                        <b-link
                        class="ml-md-2 pt-sm-2" 
                        size="md" 
                        variant="info"
                        id="show-btn" @click="$bvModal.show('bv-modal-edit-profile')"
                        >
                            <b-icon
                            scale="1.3" icon="pencil" aria-hidden="true">
                            </b-icon>
                        </b-link>
                    </h4>
                    <div class="row mt-2" style="font-size: 1.2em;">
                        <div class="col-sm-4 mt-2">
                            <p class="text-success">{{user_email}}</p>
                        </div>
                        <div v-if="phone_number != 'null'" class="col-sm-4 mt-2">
                            <p><strong class="text-success">{{phone_number}}</strong></p>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <p>Encuenstas <span class="badge badge-pill badge-success mr-2">{{polls}}</span></p>

                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm-12">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EditProfileModal/>
        <EditPictureModal/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import EditProfileModal from './EditProfileModal.vue'
    import EditPictureModal from './EditPictureModal.vue'
    export default {
        components: {
            EditProfileModal,
            EditPictureModal
            
        },
        data() {
            return {
                form2: {
                    profile: {
                        picture: null
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                    'retrievePicture',
                ]),
            onSubmit(event) {
                event.preventDefault();
                this.retrieveProfile(this.form2)
            }
        },
        computed: {
            ...mapGetters({
                user_email: 'email',
                first_name: 'first_name',
                last_name: 'last_name',
                username: 'username',
                phone_number: 'phone_number',
                picture: 'picture',
                polls: 'polls',
            })
        }
    }
</script>

<style>
.content-profile {
    margin-top: 120px;
}
#content-img:hover svg{
    transform: scale(1.3);
    -ms-transform: scale(1.3);
    -webkit-transform: scale(1.3);
    -webkit-transition: all 700ms;
    color: rgb(255, 255, 255);
}
#edit-img{
    position: fixed;
    margin-top: 100px;
    margin-left: 80px;
}
.btn-edit {
    border-radius: 50%;
}
</style>