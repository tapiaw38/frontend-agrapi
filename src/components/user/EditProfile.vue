<template>
    <div class="container content-app">
        <div class="row justify-content-center pt-2 pb-4">
            <div class="col-lg-6">
                <form @submit="onSubmit" method="POST" enctype="multipart/form-data">
                
                    <div class="media pt-2">
                        <div class="media-body text-center">
                            <canvas id="canvas" width="200" height="200"></canvas>
                            
                            <b-form-file
                            class="mt-4"
                            id="archivo"
                            @change="getImage"
                            v-model="form.profile.picture"
                            :state="Boolean(form.profile.picture)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                        </div>
                    </div>
                
                    <hr>
                    <div class="form-group">
                        <label for="first_name">Nombre</label>
                        <input type="text" class="w-100" name="first_name" placeholder="Nombre" v-model.trim='form.first_name'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="last_name">Apellido</label>
                        <input type="text" class="w-100" name="last_name" placeholder="Apellido" v-model.trim='form.last_name'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>        
                    <div class="form-group">
                        <label for="">Teléfono</label>
                        <input type="text" class="w-100" name="phone_number" placeholder="" v-model.trim='form.phone_number'>
                        <div class="invalid-feedback">
                            
                        </div>
                    </div>
                    <b-button type="submit" size="md" variant="info" class="btn-block">Actualizar información</b-button>
                </form>
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
            canvas: '',
            context: '',
            imagen: '',
            archivo: '',
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
        })
    },
    mounted() {
        //this.retrieveProfile(this.username)
    },
    methods: {
        ...mapActions([
                'retrieveProfile',
            ]),
        onSubmit(event) {
            event.preventDefault();
            this.retrieveProfile(this.form)
        },
        getProfile () {
            this.form.first_name = this.store_first_name
            this.form.last_name = this.store_last_name
            this.form.phone_number = this.store_phone_number
            
        },
        loadImage: function (event){
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.archivo = document.getElementById('archivo');
                    
        },
        getImage: function () {
            this.loadImage()
            
            //cargar imagen********************************************
            this.imagen = new Image;
            this.imagen.onload = ()=>{

                this.drawnPicture()
            }
            this.imagen.src = URL.createObjectURL(this.archivo.files[0]);
                /******************************************************* */
        },
        drawnPicture: function ()  {
           
            console.log("dibunado imagen")

            if(window.mainLoop !== null)
            {
                //console.log('PARO!')
                clearInterval(window.mainLoop)
            }
            //Dibujar imagen por primera vez**************************
            var px = (this.canvas.width - this.imagen.width) / 2//Posicion x inicial en el medio
            var py = (this.canvas.height - this.imagen.height) / 2//Posicion y inicial en el medio
            var sx = this.imagen.width;//tamano de this.imagen en x
            var sy = this.imagen.height;//tamano de this.imagen en y
            //Si la this.imagen es muy grande la encogemos un poco
            if(sx > 2000 || sy > 2000)
            {
                sx = sx /10
                sy = sy /10;
                px = (this.canvas.width - sx) / 2;
                py = (this.canvas.height - sy) / 2;
            }else if(sx > 1000 || sy > 1000)//Agrandamos la this.imagen si es muy pequena
            {
                sx = sx / 5
                sy = sy / 5;
                px = (this.canvas.width - sx) / 2;
                py = (this.canvas.height - sy) / 2;
            }else if(sx > 500 || sy > 500)//Agrandamos la this.imagen si es muy pequena
            {
                sx = sx / 3
                sy = sy / 3;
                px = (this.canvas.width - sx) / 2;
                py = (this.canvas.height - sy) / 2;
            }else if(sx < 100 || sy < 100)//Agrandamos la this.imagen si es muy pequena
            {
                sx = sx * 2
                sy = sy * 2;
                px = (this.canvas.width - sx) / 2;
                py = (this.canvas.height - sy) / 2;
            }
            this.context.fillStyle = 'darkgray';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.imagen, px, py, sx, sy);
            //****************************************************** */
            //Resizar this.imagen
            var porcentajeResizado = 0.1;//Se usa para scalar la this.imagen sin perder el aspect ratio
            this.canvas.onmousewheel = (event)=>{
                if(event.deltaY == 100)
                {
                    //console.log('para abajo')
                    //limitamos al usuario para que no haga la this.imagen demasiado pequena
                    if(sx > this.canvas.width || sy > sy.height)
                    {
                        //Calcular el nuevo size de la this.imagen y ponerla en el centro
                        sx -= sx * porcentajeResizado;
                        sy -= sy * porcentajeResizado;
                        px = (this.canvas.width - sx) / 2;
                        py = (this.canvas.height - sy) / 2;
                        /******************************************************** */
                        this.context.fillStyle = 'darkgray';
                        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.drawImage(this.imagen, px, py, sx, sy);
                    }
                    
                }else
                {
                    //Calcular el nuevo size de la this.imagen y ponerla en el centro
                    sx += sx * porcentajeResizado;
                    sy += sy * porcentajeResizado;
                    px = (this.canvas.width - sx) / 2;
                    py = (this.canvas.height - sy) / 2;
                    /********************************************************** */
                    this.context.fillStyle = 'darkgray';
                    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                    this.context.drawImage(this.imagen, px, py, sx, sy);
                    //console.log('para arriba');
                }
                //console.log(event);
            }
        }
    },
    created() {
        this.getProfile()
    },
}
</script>

<style>
#canvas
{
    border-style: solid;
    margin-left: auto;
    margin-right: auto;
    display: block;
    border-radius: 100%;
    border-color: rgb(255, 255, 255);
    background-color: rgb(189, 188, 179);
    cursor: move;
}
#archivo
{
    visibility: hidden;
}

#archivoFile
{
    cursor: pointer;
    width: 140px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 25px;
    font-family: 'Roboto', sans-serif;
    transition: all, 0.2s;
}
#archivoFile:hover{
    transform: translateY(-3px)
}

#mostrar
{
    margin-left: auto;
    margin-right: auto;
    display: block;
    border-style: solid;
    border-color: rgb(78, 78, 78);
    width: 127px;
    border-radius: 30px;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all, 0.2s;
}

#mostrar:hover
{
    transform: translateY(-3px)
}

.btn-circle{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.content-btn {
  position: fixed;
  margin-left: 250px;
}


#imagenMostrada
{
    height: 300px;
    width: 300px;
    border-radius: 100%;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    display: none;

}
</style>