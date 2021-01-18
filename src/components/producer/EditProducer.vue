<template>
    <div class="container margin-app">
        <div class="row justify-content-center" v-if="show">
            <div v-if="show" class="preloader-data position-fixed">
                <div class="lds-ripple-data">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p class="text-loader"><strong>Actualizando datos</strong></p>
            </div>
        </div>
        <div class="pt-2">
            <b-alert show dismissible>
                Ultima modificacion <b>&rArr; {{ form.modified | date-filter }}</b>
            </b-alert>
        </div>
        <div class="row">
            <div class="col">
                <form @submit="onSubmit">
                    <!--Producer-->
                    <div class="card">
                        <h4 class="m-4">Datos personales</h4>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="first_name" class="col-sm-2 col-form-label">Nombre</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Nombre" name="first_name" class="form-control" v-model.trim='form.producer.first_name'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="last_name" class="col-sm-2 col-form-label">Apellido</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Apellido" name="last_name" class="form-control" v-model.trim='form.producer.last_name'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="date_birth" class="col-sm-2 col-form-label">Fecha de Nacimiento</label>
                                <div class="col-sm-6">
                                    <b-form-input
                                    v-model="form.producer.date_birth"
                                    required
                                    type="date"
                                    ></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="last_name" class="col-sm-2 col-form-label">Genero</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="Genero" name="gender" class="form-control" v-model.trim='form.producer.gender'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="document" class="col-sm-2 col-form-label">DNI</label>
                                <div class="col-sm-6">
                                    <input type="number" required placeholder="Número de DNI" name="document" class="form-control" v-model.trim='form.producer.document'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="phone_number" class="col-sm-2 col-form-label">Tel</label>
                                <div class="col-sm-6">
                                    <input type="number" placeholder="Número de teléfono" name="phone_number" class="form-control" v-model.trim='form.producer.phone_number'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Producer Home-->
                    <div class="card">
                        <h4 class="m-4">Informe social</h4>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="district" class="col-sm-2 col-form-label">Distrito</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Distrito" name="district" class="form-control" v-model.trim='form.producer.producer_home.district'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="address" class="col-sm-2 col-form-label">Dirección</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Dirección" name="address" class="form-control" v-model.trim='form.producer.producer_home.address'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="type_recidence" class="col-sm-2 col-form-label">Tipo de residencia</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Tipo de residencia" name="type_recidence" class="form-control" v-model.trim='form.producer.producer_home.type_recidence'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="state_recidence" class="col-sm-2 col-form-label">Estado de residencia</label>
                                <div class="col-sm-6">
                                    <input type="text" required placeholder="Estado de residencia" name="state_recidence" class="form-control" v-model.trim='form.producer.producer_home.state_recidence'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Producer Person-->
                    <div class="card">                     
                            <h4 class="m-4">Grupo familiar <b-badge variant="info">{{form.producer.producer_person.length}}</b-badge></h4>
                            <b-button 
                            variant="info" 
                            class="btn-add"
                            size="sm"
                            v-on:click = "onDataPerson"
                            id="btnPerson"
                            >
                                <b-icon font-scale="1" icon="plus"></b-icon>
                            </b-button>
                            <div
                            class="ml-5 mr-5 mb-2" 
                            v-for="(items, index_person) in form.producer.producer_person" 
                            :key="items.id"
                            >
                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#person'+index_person+'p'">
                                <b-icon icon="person"></b-icon> {{items.family_relation}}
                            </b-button>
                                <b-collapse :id="'person'+index_person+'p'">
                                    <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                        <div class="text-right">
                                            <b-button
                                            class="btn-delete "
                                            variant="warning"
                                            size="sm"
                                            v-on:click="deletePerson(index_person)"
                                            >
                                                <b-icon icon="trash"></b-icon>
                                            </b-button>
                                        </div>
                                        <div class="form-group row">
                                            <label for="family_relation" class="col-sm-2 col-form-label">Relacion</label>
                                            <div class="col-sm-6">
                                                <input type="text" placeholder="Relacion" name="family_relation" class="form-control" v-model.trim='items.family_relation'>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="first_name" class="col-sm-2 col-form-label">Nombre</label>
                                            <div class="col-sm-6">
                                                <input type="text" placeholder="Nombre" name="first_name" class="form-control" v-model.trim='items.first_name'>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="last_name" class="col-sm-2 col-form-label">Apellido</label>
                                            <div class="col-sm-6">
                                                <input type="text" placeholder="Apellido" name="last_name" class="form-control" v-model.trim='items.last_name'>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="age" class="col-sm-2 col-form-label">Edad</label>
                                            <div class="col-sm-6">
                                                <input type="number" placeholder="Edad" name="age" class="form-control" v-model.trim='items.age'>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="has_primary_studies" class="col-sm-2 col-form-label">Estudios primarios</label>
                                            <b-form-checkbox
                                            v-model.trim="items.has_primary_studies"
                                            value="true"
                                            unchecked-value="false"
                                            >
                                            Sí.
                                            </b-form-checkbox>
                                        </div>
                                        <div class="form-group row">
                                            <label for="has_secondary_studies" class="col-sm-2 col-form-label">Estudios Secundarios</label>
                                            <b-form-checkbox
                                            v-model.trim="items.has_secondary_studies"
                                            value="true"
                                            unchecked-value="false"
                                            >
                                            Sí.
                                            </b-form-checkbox>
                                        </div>
                                        <div class="form-group row">
                                            <label for="has_terteary_studies" class="col-sm-2 col-form-label">Estudios terciarios</label>
                                            <b-form-checkbox
                                            v-model.trim="items.has_terteary_studies"
                                            value="true"
                                            unchecked-value="false"
                                            >
                                            Sí.
                                            </b-form-checkbox>
                                        </div>
                                        <div class="form-group row">
                                            <label for="has_university_studies" class="col-sm-2 col-form-label">Estudios universitarios</label>
                                            <b-form-checkbox
                                            v-model.trim="items.has_university_studies"
                                            value="true"
                                            unchecked-value="false"
                                            >
                                            Sí.
                                            </b-form-checkbox>
                                        </div>
                                        <div class="form-group row">
                                            <label for="perform_work_activity" class="col-sm-2 col-form-label">Realiza actividad laboral</label>
                                            <b-form-checkbox
                                            v-model.trim="items.perform_work_activity"
                                            value="true"
                                            unchecked-value="false"
                                            >
                                            Sí.
                                            </b-form-checkbox>
                                        </div>
                                        <div class="form-group row">
                                            <label for="description" class="col-sm-2 col-form-label">descripción actividad laboral</label>
                                            <div class="col-sm-6">
                                                <b-form-textarea
                                                v-model="items.description"
                                                placeholder="Ingrese descripción..."
                                                rows="3"
                                                max-rows="6"
                                                >
                                                </b-form-textarea>
                                            </div>
                                        </div>
                                    </div>
                                </b-collapse>
                            </div>
                    </div>
                    <!--Producer Vehicle-->
                    <div class="card">
                        <h4 class="m-4">Vehículos del productor <b-badge variant="info">{{form.producer.producer_vehicle.length}}</b-badge></h4>
                        <b-button 
                        variant="info" 
                        class="btn-add"
                        size="sm" 
                        id = "btnVehicle"
                        v-on:click="onDataVehicle"
                        >
                            <b-icon font-scale="1" icon="plus"></b-icon>
                        </b-button>
                        <div
                        class="mb-2 ml-5 mr-5" 
                        v-for="(vehicle, index_vehicle) in form.producer.producer_vehicle" 
                        :key="vehicle.id"
                        >
                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#vehicle'+index_vehicle+'v'">
                                <b-icon icon="truck"></b-icon> {{vehicle.name_vehicle}}
                            </b-button>
                            <b-collapse :id="'vehicle'+index_vehicle+'v'">
                                <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                    <div class="text-right">
                                        <b-button
                                        class="btn-delete "
                                        variant="warning"
                                        size="sm"
                                        v-on:click="deleteVehicle(index_vehicle)"
                                        >
                                            <b-icon icon="trash"></b-icon>
                                        </b-button>
                                    </div>
                                    <div class="form-group row">
                                        <label for="name_vehicle" class="col-sm-2 col-form-label">Vehículo</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Vehículo" name="name_vehicle" class="form-control" v-model.trim='vehicle.name_vehicle'>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="use_trailer" class="col-sm-2 col-form-label">Usa acoplado</label>
                                        <b-form-checkbox
                                        v-model.trim="vehicle.use_trailer"
                                        value="true"
                                        unchecked-value="false"
                                        >
                                        Sí.
                                        </b-form-checkbox>
                                    </div>
                                    <div class="form-group row">
                                        <label for="type_trailer" class="col-sm-2 col-form-label">Tipo de acoplado</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Tipo de acoplado" name="type_trailer" class="form-control" v-model.trim='vehicle.type_trailer'>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="use_semitrailer" class="col-sm-2 col-form-label">Usa semi acoplado</label>
                                        <b-form-checkbox
                                        v-model.trim="vehicle.use_semitrailer"
                                        value="true"
                                        unchecked-value="false"
                                        >
                                        Sí.
                                        </b-form-checkbox>
                                    </div>
                                </div>
                            </b-collapse>
                        </div>
                    </div>
                    <!--Producer ACTIVITY -->
                    <div class="card">
                        <h4 class="m-4">Actividad del productor</h4>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="works_under_dependency" class="col-sm-2 col-form-label">Trabaja en relación de dependencia</label>
                                <b-form-checkbox
                                v-model.trim="form.producer.producer_activity.works_under_dependency"
                                value="true"
                                unchecked-value="false"
                                >
                                Sí.
                                </b-form-checkbox>
                            </div>
                            <div class="form-group row">
                                <label for="is_monotributista" class="col-sm-2 col-form-label">Es monotributista</label>
                                <b-form-checkbox
                                v-model.trim="form.producer.producer_activity.is_monotributista"
                                value="true"
                                unchecked-value="false"
                                >
                                Sí.
                                </b-form-checkbox>
                            </div>
                            <div class="form-group row">
                                <label for="category" class="col-sm-2 col-form-label">Categoria</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="Categoria" name="category" class="form-control" v-model.trim='form.producer.producer_activity.category'>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="use_external_labor" class="col-sm-2 col-form-label">Usa mano de obra externa</label>
                                <b-form-checkbox
                                v-model.trim="form.producer.producer_activity.use_external_labor"
                                value="true"
                                unchecked-value="false"
                                >
                                Sí.
                                </b-form-checkbox>
                            </div>
                        </div>
                    </div>
                    <!--Activity Worker-->
                    <div class="card">
                        <h4 class="m-4">Empleados del productor <b-badge variant="info">{{form.producer.producer_activity.activity_worker.length}}</b-badge></h4>
                        <b-button 
                        variant="info" 
                        class="btn-add"
                        size="sm"
                        v-on:click="onDataWorker"
                        id="btnWorker"
                        >
                            <b-icon font-scale="1" icon="plus"></b-icon>
                        </b-button>
                        <div
                        class="mb-2 ml-5 mr-5" 
                        v-for="(worker, index_worker) in form.producer.producer_activity.activity_worker" 
                        :key="worker.id"
                        >
                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#worker'+index_worker+'w'">
                                <b-icon icon="person"></b-icon> {{worker.type_person}}
                            </b-button>
                            <b-collapse :id="'worker'+index_worker+'w'">
                                <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                    <div class="text-right">
                                        <b-button
                                        class="btn-delete "
                                        variant="warning"
                                        size="sm"
                                        v-on:click="deleteWorker(index_worker)"
                                        >
                                            <b-icon icon="trash"></b-icon>
                                        </b-button>
                                    </div>
                                    <div class="form-group row">
                                        <label for="type_person" class="col-sm-2 col-form-label">Tipo de persona</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Tipo de persona" name="type_person" class="form-control" v-model.trim='worker.type_person'>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="is_formal_worker" class="col-sm-2 col-form-label">Es trabajador formal</label>
                                        <b-form-checkbox
                                        v-model.trim="worker.is_formal_worker"
                                        value="true"
                                        unchecked-value="false"
                                        >
                                        Sí.
                                        </b-form-checkbox>
                                    </div>
                                    <div class="form-group row">
                                        <label for="is_resident" class="col-sm-2 col-form-label">Es residente</label>
                                        <b-form-checkbox
                                        v-model.trim="worker.is_resident"
                                        value="true"
                                        unchecked-value="false"
                                        >
                                        Sí.
                                        </b-form-checkbox>
                                    </div>
                                    <div class="form-group row">
                                        <label for="gender" class="col-sm-2 col-form-label">Género</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Género" name="gender" class="form-control" v-model.trim='worker.gender'>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="receive_remuneration" class="col-sm-2 col-form-label">Remuneración</label>
                                        <b-form-checkbox
                                        v-model.trim="worker.receive_remuneration"
                                        value="true"
                                        unchecked-value="false"
                                        >
                                        Sí.
                                        </b-form-checkbox>
                                    </div>
                                    <div class="form-group row">
                                        <label for="work_position" class="col-sm-2 col-form-label">Cargo</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Cargo" name="work_position" class="form-control" v-model.trim='worker.work_position'>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="type_job" class="col-sm-2 col-form-label">Tipo de empleo</label>
                                        <div class="col-sm-6">
                                            <input type="text" placeholder="Tipo de empleo" name="type_job" class="form-control" v-model.trim='worker.type_job'>
                                        </div>
                                    </div>
                                </div>
                            </b-collapse>
                        </div>
                    </div>
                    <!--Production-->
                    <div class="mt-1">
                        <div class="card">
                            <h4 class="m-4">Producciones <b-badge variant="info">{{form.producer.production.length}}</b-badge></h4>
                            <b-button
                            id="btnProduction" 
                            variant="info"
                            size="sm" 
                            class="btn-add" 
                            v-on:click="onDataProduction"
                            >
                                <b-icon font-scale="1" icon="plus"></b-icon>
                            </b-button>
                            <div 
                            class="pb-2 producer-production mr-5 ml-5"
                            v-for="(production, index_production) in form.producer.production" 
                            :key="production.id"
                            >
                            <b-button class="btn-block" variant="info" v-b-toggle :href="'#produ'+index_production">
                                <b-icon font-scale="1" icon="graph-up"></b-icon>
                                 Producción {{production.district}}
                            </b-button>
                                <b-collapse :id="'produ'+index_production">
                                    <div class="card no-border">
                                        <div class="text-right">
                                            <b-button
                                            class="btn-delete  mt-1"
                                            variant="warning"
                                            size="sm"
                                            v-on:click="deleteProduction(index_production)"
                                            >
                                                <b-icon icon="trash"></b-icon>
                                            </b-button>
                                        </div>
                                        <h4 class="m-4">Producción</h4>
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="is_resident" class="col-sm-2 col-form-label">Es residente</label>
                                                <b-form-checkbox
                                                v-model.trim="production.is_resident"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="district" class="col-sm-2 col-form-label">Distrito</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Distrito" name="district" class="form-control" v-model.trim='production.district'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="surface" class="col-sm-2 col-form-label">Superficie</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Surface" name="surface" class="form-control" v-model.trim='production.surface'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="lat" class="col-sm-2 col-form-label">Latiud</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Latitud" name="lat" class="form-control" v-model.trim='production.lat'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="lng" class="col-sm-2 col-form-label">Longitud</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Longitud" name="lng" class="form-control" v-model.trim='production.lng'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="road_state" class="col-sm-2 col-form-label">Estado de los caminos</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Estado de los caminos" name="road_state" class="form-control" v-model.trim='production.road_state'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_renspa" class="col-sm-2 col-form-label">Renspa</label>
                                                <b-form-checkbox
                                                v-model.trim="production.has_renspa"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Production Property -->
                                    <div class="card no-border">
                                        <h4 class="m-4">Propiedad de la producción</h4>
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="land_tenure" class="col-sm-2 col-form-label">Tenencia de la tierra</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Tenencia de la tierra" name="land_tenure" class="form-control" v-model.trim='production.production_property.land_tenure'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_land_title" class="col-sm-2 col-form-label">Titulo de la propiedad</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_property.has_land_title"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="cadastre_registration" class="col-sm-2 col-form-label">Matricula catastral</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Matricula catastral" name="cadastre_registration" class="form-control" v-model.trim='production.production_property.cadastre_registration'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="starting_number" class="col-sm-2 col-form-label">Número de partida</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Número de partida" name="starting_number" class="form-control" v-model.trim='production.production_property.starting_number'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Production service-->
                                    <div class="card no-border">
                                        <h4 class="m-4">Servicios de la producción</h4>
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="has_service_aqua" class="col-sm-2 col-form-label">Sevicio de agua</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_service_aqua"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="type_service_aqua" class="col-sm-2 col-form-label">Tipo de servicio de agua</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Tipo de servicio de agua" name="type_service_aqua" class="form-control" v-model.trim='production.production_service.type_service_aqua'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_service_energy" class="col-sm-2 col-form-label">Sevicio electrico</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_service_energy"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="type_service_energy" class="col-sm-2 col-form-label">Tipo de servicio electrico</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Tipo de servicio electrico" name="type_service_energy" class="form-control" v-model.trim='production.production_service.type_service_energy'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_rural_energy" class="col-sm-2 col-form-label">Sevicio electrico rural</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_rural_energy"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_generator" class="col-sm-2 col-form-label">Generador</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_generator"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_hydraulic_generator" class="col-sm-2 col-form-label">Generador hidraulico</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_hydraulic_generator"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_solar_panels" class="col-sm-2 col-form-label">Paneles solares</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_service.has_solar_panels"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card no-border">
                                        <h4 class="m-4">Instalaciones de la producción</h4>
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="has_windmills" class="col-sm-2 col-form-label">Molinos de viento</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_windmills"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_australian_tanks" class="col-sm-2 col-form-label">Tanques australianos</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_australian_tanks"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_dams" class="col-sm-2 col-form-label">Represas y tajamares</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_dams"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_truck_scale" class="col-sm-2 col-form-label">Balanzas para camiones</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_truck_scale"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_fire_break" class="col-sm-2 col-form-label">Picadas cortafuego</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_fire_break"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_minced_steel" class="col-sm-2 col-form-label">Picadas de acero</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_minced_steel"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                            <div class="form-group row">
                                                <label for="has_pools" class="col-sm-2 col-form-label">Piletas</label>
                                                <b-form-checkbox
                                                v-model.trim="production.production_installation.has_pools"
                                                value="true"
                                                unchecked-value="false"
                                                >
                                                Sí.
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card no-border">
                                        <h4 class="m-4">Galpones de la producción <b-badge variant="info">{{production.production_installation.installation_barn.length}}</b-badge></h4>
                                        <b-button 
                                        variant="info"
                                        size="sm" 
                                        class="btn-add" 
                                        v-on:click="onDataBarn(index_production)"
                                        :id="'btnBarn'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(barn, index_barn) in production.production_installation.installation_barn" 
                                        :key="barn.id"
                                        >
                                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#barn'+index_production+index_barn+'b'">
                                                <b-icon icon="layout-wtf"></b-icon>
                                            </b-button>
                                            <b-collapse :id="'barn'+index_production+index_barn+'b'">
                                                <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete  mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteBarn(index_barn,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="surface" class="col-sm-2 col-form-label">Superficie</label>
                                                        <div class="col-sm-6">
                                                            <input type="number" placeholder="Superficie" name="surface" class="form-control" v-model.trim='barn.surface'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="lat" class="col-sm-2 col-form-label">Latitud</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Latitud" name="lat" class="form-control" v-model.trim='barn.lat'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="lng" class="col-sm-2 col-form-label">Longitud</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Longitud" name="lng" class="form-control" v-model.trim='barn.lng'>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
                                    </div>
                                    <div class="card no-border">
                                        <h4 class="m-4">Pozos de la producción <b-badge variant="info">{{production.production_installation.installation_well.length}}</b-badge></h4>
                                        <b-button 
                                        variant="info" 
                                        class="btn-add"
                                        size="sm"
                                        v-on:click="onDataWell(index_production)"
                                        :id="'btnWell'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(well, index_well) in production.production_installation.installation_well" 
                                        :key="index_well+1"
                                        >
                                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#well'+index_production+index_well+'w'">
                                                <b-icon icon="layout-wtf"></b-icon>
                                            </b-button>
                                            <b-collapse :id="'well'+index_production+index_well+'w'">
                                                <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete  mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteWell(index_well,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="has_pools" class="col-sm-2 col-form-label">Activo</label>
                                                        <b-form-checkbox
                                                        v-model.trim="well.is_active"
                                                        value="true"
                                                        unchecked-value="false"
                                                        >
                                                        Sí.
                                                        </b-form-checkbox>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="lat" class="col-sm-2 col-form-label">Latitud</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Latitud" name="lat" class="form-control" v-model.trim='well.lat'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="lng" class="col-sm-2 col-form-label">Longitud</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Longitud" name="lng" class="form-control" v-model.trim='well.lng'>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
                                    </div>
                                    <!--Production machine-->
                                    <div class="card no-border">
                                        <h4 class="m-4">Maquinaria de la producción <b-badge variant="info">{{production.production_machine.length}}</b-badge></h4>
                                        <b-button
                                        variant="info" 
                                        class="btn-add"
                                        size="sm"
                                        v-on:click="onDataMachine(index_production)"
                                        :id="'btnMachine'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(machine, index_machine) in production.production_machine" 
                                        :key="index_machine+1"
                                        >
                                            <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#machine'+index_production+index_machine+'m'">
                                                <b-icon icon="truck-flatbed"></b-icon>
                                            </b-button>
                                            <b-collapse :id="'machine'+index_production+index_machine+'m'">
                                                <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete  mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteMachine(index_machine,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="destination" class="col-sm-2 col-form-label">Destiono de maquinaria</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Destiono de maquinaria" name="destination" class="form-control" v-model.trim='machine.destination'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="name_machine" class="col-sm-2 col-form-label">Maquinaria</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Maquinaria" name="name_machine" class="form-control" v-model.trim='machine.name_machine'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="type_maquinary" class="col-sm-2 col-form-label">Tipo de maquina</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Tipo de maquina" name="type_maquinary" class="form-control" v-model.trim='machine.type_maquinary'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="model" class="col-sm-2 col-form-label">Modelo</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Modelo" name="model" class="form-control" v-model.trim='machine.model'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="state_machine" class="col-sm-2 col-form-label">Estado de la maquinaria</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Estado de la maquinaria" name="state_machine" class="form-control" v-model.trim='machine.state_machine'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="age" class="col-sm-2 col-form-label">Años</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Años" name="age" class="form-control" v-model.trim='machine.age'>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="observation" class="col-sm-2 col-form-label">Observación</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" placeholder="Observación" name="observation" class="form-control" v-model.trim='machine.observation'>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
                                    </div>
                                    <div class="card no-border">
                                        <h4 class="m-4">Datos de riego de la producción</h4>
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="type_irrigation" class="col-sm-2 col-form-label">Tipo de riego</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Tipo de riego" name="type_irrigation" class="form-control" v-model.trim='production.production_irrigation.type_irrigation'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="pressurized_irrigation" class="col-sm-2 col-form-label">Riego presurizado</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Riego presurizado" name="pressurized_irrigation" class="form-control" v-model.trim='production.production_irrigation.pressurized_irrigation'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="surface_irrigation" class="col-sm-2 col-form-label">Riego superficial</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Riego superficial" name="surface_irrigation" class="form-control" v-model.trim='production.production_irrigation.surface_irrigation'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="take_section" class="col-sm-2 col-form-label">Toma o sección</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Toma o sección" name="take_section" class="form-control" v-model.trim='production.production_irrigation.take_section'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="watering_hours" class="col-sm-2 col-form-label">Horas de agua</label>
                                                <div class="col-sm-6">
                                                    <input type="number" placeholder="Horas de agua" name="watering_hours" class="form-control" v-model.trim='production.production_irrigation.watering_hours'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="channel_conditions" class="col-sm-2 col-form-label">Condiciones de los canales</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Condiciones de los canales" name="channel_conditions" class="form-control" v-model.trim='production.production_irrigation.channel_conditions'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="right" class="col-sm-2 col-form-label">Derecho</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Derecho" name="right" class="form-control" v-model.trim='production.production_irrigation.right'>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="shifts" class="col-sm-2 col-form-label">Turnos</label>
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="Turnos" name="shifts" class="form-control" v-model.trim='production.production_irrigation.shifts'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Production Agricultural -->
                                    <div class="card no-border">
                                        <h4 class="m-4">Producción Agricola <b-badge variant="success">{{production.production_agricultural.length}}</b-badge></h4>
                                        <b-button 
                                        variant="info" 
                                        class="btn-add"
                                        size="sm" 
                                        v-on:click="onDataAgricultural(index_production)"
                                        :id="'btnAgricultural'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(agricultural, index_agricultural) in production.production_agricultural" 
                                        :key="agricultural.id"
                                        >
                                            <b-button class="btn-block" variant="success" v-b-toggle :href="'#agricultural'+index_production+index_agricultural">
                                                Producción Agricola 
                                            </b-button>
                                            <b-collapse :id="'agricultural'+index_production+index_agricultural">
                                                <div class="card no-border second">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete  mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteAgricultural(index_agricultural,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="activity_name" class="col-sm-2 col-form-label">Tipo de actividad</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de actividad" name="activity_name" class="form-control" v-model.trim='agricultural.activity_name'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="surface" class="col-sm-2 col-form-label">Superficie en hectareas</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Maquinaria" name="surface" class="form-control" v-model.trim='agricultural.surface'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="destination" class="col-sm-2 col-form-label">Destino de actividad</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de actividad" name="destination" class="form-control" v-model.trim='agricultural.destination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="sowing" class="col-sm-2 col-form-label">Siembra</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Siembra" name="sowing" class="form-control" v-model.trim='agricultural.sowing'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_sowing" class="col-sm-2 col-form-label">Tipo de siembra</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de siembra" name="type_sowing" class="form-control" v-model.trim='agricultural.type_sowing'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="age" class="col-sm-2 col-form-label">Edad de la actividad</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Edad de la actividad" name="age" class="form-control" v-model.trim='agricultural.age'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="problems" class="col-sm-2 col-form-label">Problemas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Problemas" name="problems" class="form-control" v-model.trim='agricultural.problems'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="suggestion" class="col-sm-2 col-form-label">Sugerencias</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Sugerencias" name="suggestion" class="form-control" v-model.trim='agricultural.suggestion'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Agricultural attendance-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Cuidados culturales</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="use_fertilizers" class="col-sm-2 col-form-label">Fertilizantes</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_attendance.use_fertilizers"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_food_organic" class="col-sm-2 col-form-label">Abono organico</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_attendance.use_food_organic"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_pheromones" class="col-sm-2 col-form-label">Utilización de feromonas</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_attendance.use_pheromones"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_hail_mesh" class="col-sm-2 col-form-label">Malla anti granizo</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_attendance.use_hail_mesh"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_frost_control" class="col-sm-2 col-form-label">Control de heladas</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_attendance.make_frost_control"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="other_practices" class="col-sm-2 col-form-label">Otras practicas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Otras practicas" name="other_practices" class="form-control" v-model.trim='agricultural.agricultural_attendance.other_practices'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Agricultural harvest-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Cosecha</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="harvest_surface" class="col-sm-2 col-form-label">Superficie de la cosecha</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Superficie de la cosecha" name="harvest_surface" class="form-control" v-model.trim='agricultural.agricultural_harvest.harvest_surface'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="tons_production" class="col-sm-2 col-form-label">Rendimiento en toneladas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Rendimiento en toneladas" name="tons_production" class="form-control" v-model.trim='agricultural.agricultural_harvest.tons_production'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="has_curtains_insulated" class="col-sm-2 col-form-label">Corinas y aisladas</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_harvest.has_curtains_insulated"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="plant_species_curtains" class="col-sm-2 col-form-label">Especies de platas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Especies de platas" name="plant_species_curtains" class="form-control" v-model.trim='agricultural.agricultural_harvest.plant_species_curtains'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="plant_length_curtains" class="col-sm-2 col-form-label">Longitud de platas en metros</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Longitud de platas en metros" name="plant_length_curtains" class="form-control" v-model.trim='agricultural.agricultural_harvest.plant_length_curtains'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="harvest_time" class="col-sm-2 col-form-label">Epoca de cosecha</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Epoca de cosecha" name="harvest_time" class="form-control" v-model.trim='agricultural.agricultural_harvest.harvest_time'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--agricultural sales channel-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Canal de ventas</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="is_collector" class="col-sm-2 col-form-label">Acopiador</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.is_collector"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="is_cooperative" class="col-sm-2 col-form-label">Cooperativa</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.is_cooperative"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="is_exporter" class="col-sm-2 col-form-label">Exportación</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.is_exporter"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_baler" class="col-sm-2 col-form-label">Empacador</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.use_baler"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_fair" class="col-sm-2 col-form-label">Forma directa o feria</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.use_fair"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_industry" class="col-sm-2 col-form-label">Industria</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.use_industry"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_fridge" class="col-sm-2 col-form-label">Frigorifico</label>
                                                            <b-form-checkbox
                                                            v-model.trim="agricultural.agricultural_sales_channel.use_fridge"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--agricultural pests-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Plagas, Pestes y Malezas <b-badge variant="info">{{agricultural.agricultural_pests.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataPests(index_production,index_agricultural)"
                                                    :id="'btnPests'+index_production+index_agricultural"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(pests, index_pests) in agricultural.agricultural_pests" 
                                                    :key="index_pests+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#pests'+index_production+index_agricultural+index_pests">
                                                            <b-icon icon=""></b-icon> {{pests.type_pests}}
                                                        </b-button>
                                                        <b-collapse :id="'pests'+index_production+index_agricultural+index_pests">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete  mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deletePests(index_production,index_agricultural,index_pests)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="type_pests" class="col-sm-2 col-form-label">Tipo</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo" name="type_pests" class="form-control" v-model.trim='pests.type_pests'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="pests_description" class="col-sm-2 col-form-label">Descripción</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Descripción" name="pests_description" class="form-control" v-model.trim='pests.pests_description'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="make_pests_control" class="col-sm-2 col-form-label">Control de heladas</label>
                                                                    <b-form-checkbox
                                                                    v-model.trim="pests.make_pests_control"
                                                                    value="true"
                                                                    unchecked-value="false"
                                                                    >
                                                                    Sí.
                                                                    </b-form-checkbox>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="make_pesticide" class="col-sm-2 col-form-label">Pesticidas</label>
                                                                    <b-form-checkbox
                                                                    v-model.trim="pests.make_pesticide"
                                                                    value="true"
                                                                    unchecked-value="false"
                                                                    >
                                                                    Sí.
                                                                    </b-form-checkbox>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="type_pesticide" class="col-sm-2 col-form-label">Tipo de pesticida</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo de pesticida" name="type_pesticide" class="form-control" v-model.trim='pests.type_pesticide'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="other_practices" class="col-sm-2 col-form-label">Otras practicas</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Otras practicas" name="other_practices" class="form-control" v-model.trim='pests.other_practices'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--aricultural climatics-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Factores climaticos <b-badge variant="info">{{agricultural.agricultural_climatic.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataClimatic(index_production,index_agricultural)"
                                                    :id="'btnClimatic'+index_production+index_agricultural"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(climatic, index_climatic) in agricultural.agricultural_climatic" 
                                                    :key="index_climatic+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#climatic'+index_production+index_agricultural+index_climatic">
                                                            <b-icon icon=""></b-icon> {{climatic.factor}}
                                                        </b-button>
                                                        <b-collapse :id="'climatic'+index_production+index_agricultural+index_climatic">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete  mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deleteClimatic(index_production,index_agricultural,index_climatic)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="factor" class="col-sm-2 col-form-label">Factor climatico</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Factor climatico" name="factor" class="form-control" v-model.trim='climatic.factor'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="risk" class="col-sm-2 col-form-label">Riesgo</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Riesgo" name="risk" class="form-control" v-model.trim='climatic.risk'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="damange_level" class="col-sm-2 col-form-label">Nivel de daño</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Nivel de daño" name="damange_level" class="form-control" v-model.trim='climatic.damange_level'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--end agricultural-->
                                            </b-collapse>
                                        </div>
                                    </div>
                                    <!-- Production Livestock-->
                                    <div class="card no-border">
                                        <h4 class="m-4">Producción Ganadera <b-badge variant="warning">{{production.production_livestock.length}}</b-badge></h4>
                                        <b-button 
                                        variant="info" 
                                        class="btn-add"
                                        size="sm" 
                                        v-on:click="onDataLivestock(index_production)"
                                        :id="'btnLivestock'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(livestock, index_livestock) in production.production_livestock" 
                                        :key="index_livestock+1"
                                        >
                                            <b-button class="btn-block" variant="warning" v-b-toggle :href="'#livestock'+index_production+index_livestock">
                                                Producción Ganadera 
                                            </b-button>
                                            <b-collapse :id="'livestock'+index_production+index_livestock">
                                                <div class="card no-border second">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete  mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteLivestock(index_livestock,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="type_activity" class="col-sm-2 col-form-label">Actividad</label>
                                                            <div class="col-sm-6">
                                                                <label v-if="livestock.type_activity != ''" for="type_activity" class="col-form-label"><strong>{{livestock.type_activity}}</strong></label>
                                                                <b-form-select v-else v-model="livestock.type_activity" :options="options"></b-form-select>
                                                                <!--
                                                                <input type="hidden" placeholder="Actividad" name="type_activity" class="form-control" v-model.trim='livestock.type_activity'>
                                                                -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="surface" class="col-sm-2 col-form-label">Superficie</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Superficie" name="surface" class="form-control" v-model.trim='livestock.surface'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="destination" class="col-sm-2 col-form-label">Destino de actividad</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de actividad" name="destination" class="form-control" v-model.trim='livestock.destination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                                    <label for="make_technical_assistance" class="col-sm-2 col-form-label">Asistencia técnica</label>
                                                                    <b-form-checkbox
                                                                    v-model.trim="livestock.make_technical_assistance"
                                                                    value="true"
                                                                    unchecked-value="false"
                                                                    >
                                                                    Sí.
                                                                    </b-form-checkbox>
                                                                </div>
                                                        <div class="form-group row">
                                                            <label for="problems" class="col-sm-2 col-form-label">Problemas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Problemas" name="problems" class="form-control" v-model.trim='livestock.problems'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="suggestion" class="col-sm-2 col-form-label">Sugerencias al municipio</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Sugerencias al municipio" name="suggestion" class="form-control" v-model.trim='livestock.suggestion'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock feeding-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Alimentacion <b-badge variant="info">{{livestock.livestock_animal_feeding.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataFeeding(index_production,index_livestock)"
                                                    :id="'btnFeeding'+index_production+index_livestock"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(feeding, index_feeding) in livestock.livestock_animal_feeding" 
                                                    :key="index_feeding+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#feeding'+index_production+index_livestock+index_feeding">
                                                            <b-icon icon=""></b-icon> {{feeding.feeding}}
                                                        </b-button>
                                                        <b-collapse :id="'feeding'+index_production+index_livestock+index_feeding">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deleteFeeding(index_production,index_livestock,index_feeding)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="feeding" class="col-sm-2 col-form-label">Amimento</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Amimento" name="feeding" class="form-control" v-model.trim='feeding.feeding'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="type_feeding" class="col-sm-2 col-form-label">Tipo de alimento</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo de alimento" name="type_feeding" class="form-control" v-model.trim='feeding.type_feeding'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="daily_rations" class="col-sm-2 col-form-label">Raciones diarias</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Raciones diarias" name="daily_rations" class="form-control" v-model.trim='feeding.daily_rations'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--Livestock reproduction-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Reproducción</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="make_reproductive_management" class="col-sm-2 col-form-label">Manejo reproductivo</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_reproduction.make_reproductive_management"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_continuous_service" class="col-sm-2 col-form-label">Servicio continuo</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_reproduction.make_continuous_service"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_corral_service" class="col-sm-2 col-form-label">Servicio al corral</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_reproduction.make_corral_service"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_artificial_insemination" class="col-sm-2 col-form-label">Inseminación artificial</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_reproduction.make_artificial_insemination"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_embryo_transplant" class="col-sm-2 col-form-label">Transplante embrionario</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_reproduction.make_embryo_transplant"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="other_practices" class="col-sm-2 col-form-label">Otras practicas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Otras practicas" name="other_practices" class="form-control" v-model.trim='livestock.livestock_reproduction.other_practices'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock animal pens-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Corrales <b-badge variant="info">{{livestock.livestock_animal_pens.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataPens(index_production,index_livestock)"
                                                    :id="'btnPens'+index_production+index_livestock"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(pens, index_pens) in livestock.livestock_animal_pens" 
                                                    :key="index_pens+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#pens'+index_production+index_livestock+index_pens">
                                                            <b-icon icon=""></b-icon> Corral
                                                        </b-button>
                                                        <b-collapse :id="'pens'+index_production+index_livestock+index_pens">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deletePens(index_production,index_livestock,index_pens)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="orientation" class="col-sm-2 col-form-label">Orientación</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Orientación" name="orientation" class="form-control" v-model.trim='pens.orientation'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="building_material" class="col-sm-2 col-form-label">Material</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Material" name="building_material" class="form-control" v-model.trim='pens.building_material'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="roof_material" class="col-sm-2 col-form-label">Tipo de techo</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo de techo" name="roof_material" class="form-control" v-model.trim='pens.roof_material'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="foor_material" class="col-sm-2 col-form-label">Tipo de suelo</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo de suelo" name="foor_material" class="form-control" v-model.trim='pens.foor_material'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="surface" class="col-sm-2 col-form-label">Superficie</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Superficie" name="surface" class="form-control" v-model.trim='pens.surface'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="num_animals" class="col-sm-2 col-form-label">Cantidad de animales</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="number" placeholder="Cantidad de animales" name="num_animals" class="form-control" v-model.trim='pens.num_animals'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="lat" class="col-sm-2 col-form-label">Latitud</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Latitud" name="lat" class="form-control" v-model.trim='pens.lat'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="lng" class="col-sm-2 col-form-label">Longitud</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Longitud" name="lng" class="form-control" v-model.trim='pens.lng'>
                                                                    </div>
                                                                </div>
                                                                <!--
                              
                                                                -->
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--Livestock health-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Sanidad</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="type_technical_assistance" class="col-sm-2 col-form-label">Tipo de asistencia técnica</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de asistencia técnica" name="type_technical_assistance" class="form-control" v-model.trim='livestock.livestock_health.type_technical_assistance'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="vitamin_complex" class="col-sm-2 col-form-label">Complejo vitaminico</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Complejo vitaminico" name="vitamin_complex" class="form-control" v-model.trim='livestock.livestock_health.vitamin_complex'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_internal_deworming" class="col-sm-2 col-form-label">Desparacitación interna</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_health.make_internal_deworming"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_external_deworming" class="col-sm-2 col-form-label">Desparacitación externa</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_health.make_external_deworming"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_antiparasitic" class="col-sm-2 col-form-label">Tipo de antiparasitario</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de antiparasitario" name="type_antiparasitic" class="form-control" v-model.trim='livestock.livestock_health.type_antiparasitic'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="make_vaccination" class="col-sm-2 col-form-label">Vacunacción</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_health.make_vaccination"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_vaccination" class="col-sm-2 col-form-label">Tipo de Vacunacción</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de Vacunacción" name="type_vaccination" class="form-control" v-model.trim='livestock.livestock_health.type_vaccination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_disease" class="col-sm-2 col-form-label">Tipo de enfermedad</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de enfermedad" name="type_disease" class="form-control" v-model.trim='livestock.livestock_health.type_disease'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock marketing-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Comercialización</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="number_slaughtered" class="col-sm-2 col-form-label">Cantidad de faenados</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de faenados" name="number_slaughtered" class="form-control" v-model.trim='livestock.livestock_marketing.number_slaughtered'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_shorn" class="col-sm-2 col-form-label">Cantidad de esquilados</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de esquilados" name="number_shorn" class="form-control" v-model.trim='livestock.livestock_marketing.number_shorn'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="amount_wool_hair" class="col-sm-2 col-form-label">Cantidad de lana pelo obtenido</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de faenados" name="amount_wool_hair" class="form-control" v-model.trim='livestock.livestock_marketing.amount_wool_hair'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="amount_leather" class="col-sm-2 col-form-label">Cantidad de piel obtenida</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de piel obtenida" name="amount_leather" class="form-control" v-model.trim='livestock.livestock_marketing.amount_leather'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="liters_milk" class="col-sm-2 col-form-label">Litros de leche obtenidos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Litros de leche obtenidos" name="liters_milk" class="form-control" v-model.trim='livestock.livestock_marketing.liters_milk'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="milk_destination" class="col-sm-2 col-form-label">Destino de leche</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de leche" name="milk_destination" class="form-control" v-model.trim='livestock.livestock_marketing.milk_destination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="wool_hair_destination" class="col-sm-2 col-form-label">Destino de lana pelo</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de lana pelo" name="wool_hair_destination" class="form-control" v-model.trim='livestock.livestock_marketing.wool_hair_destination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="leather_destination" class="col-sm-2 col-form-label">Destino de piel</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de piel" name="leather_destination" class="form-control" v-model.trim='livestock.livestock_marketing.leather_destination'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="slaughter_destination" class="col-sm-2 col-form-label">Destino de faenados</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Destino de faenados" name="slaughter_destination" class="form-control" v-model.trim='livestock.livestock_marketing.slaughter_destination'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock sales channel-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Canal de ventas</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="is_collector" class="col-sm-2 col-form-label">Acopiador</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.is_collector"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="is_cooperative" class="col-sm-2 col-form-label">Cooperativa</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.is_cooperative"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="is_exporter" class="col-sm-2 col-form-label">Exportación</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.is_exporter"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_baler" class="col-sm-2 col-form-label">Empacador</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.use_baler"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_fair" class="col-sm-2 col-form-label">Forma directa o feria</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.use_fair"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_industry" class="col-sm-2 col-form-label">Industria</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.use_industry"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="use_fridge" class="col-sm-2 col-form-label">Frigorifico</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_sales_channel.use_fridge"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock bovine cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'bovino'">
                                                    <h4 class="m-4">Ciclo bovino</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="calves_under_one_year" class="col-sm-2 col-form-label">Terneros menores de un año</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Terneros menores de un año" name="calves_under_one_year" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.calves_under_one_year'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="heifers_one_to_two_years" class="col-sm-2 col-form-label">Vaquillonas de uno a dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Vaquillonas de uno a dos años" name="heifers_one_to_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.heifers_one_to_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="heifers_over_two_years" class="col-sm-2 col-form-label">Vaquillonas mas de dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Vaquillonas mas de dos años" name="heifers_over_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.heifers_over_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_cows" class="col-sm-2 col-form-label">Cantidad de vacas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de vacas" name="number_cows" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.number_cows'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="steers_one_to_two_years" class="col-sm-2 col-form-label">Novillos de uno a dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Novillos de uno a dos años" name="steers_one_to_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.steers_one_to_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="steers_older_two_years" class="col-sm-2 col-form-label">Novillos más de dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Novillos más de dos años" name="steers_older_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.steers_older_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bulls_one_to_two_years" class="col-sm-2 col-form-label">Toritos de uno a dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Toritos de uno a dos años" name="bulls_one_to_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.bulls_one_to_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="bulls_older_two_years" class="col-sm-2 col-form-label">Toritos más de dos años</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Toritos más de dos años" name="bulls_older_two_years" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.bulls_older_two_years'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_oxen_torunos" class="col-sm-2 col-form-label">Bueyes y torunos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Bueyes y torunos" name="number_oxen_torunos" class="form-control" v-model.trim='livestock.livestock_bovine_cycle.number_oxen_torunos'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock sheep cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'ovino'">
                                                    <h4 class="m-4">Ciclo ovino</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="sheep_under_six_months" class="col-sm-2 col-form-label">Menores de seis meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Menores de seis meses" name="sheep_under_six_months" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.sheep_under_six_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="sheep_older_six_months_to_calving" class="col-sm-2 col-form-label">Borregas de seis meses hasta parición</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Borregas de seis meses hasta parición" name="sheep_older_six_months_to_calving" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.sheep_older_six_months_to_calving'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="sheep_older_six_months_one_year" class="col-sm-2 col-form-label">Borregos de seis meses hasta un año</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Borregos de seis meses hasta un año" name="sheep_older_six_months_one_year" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.sheep_older_six_months_one_year'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_sheep" class="col-sm-2 col-form-label">Cantidad de obejas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de obejas" name="number_sheep" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.number_sheep'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_capons" class="col-sm-2 col-form-label">Cantidad de capones</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de capones" name="number_capons" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.number_capons'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_rams" class="col-sm-2 col-form-label">Cantidad de carneros</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de carneros" name="number_rams" class="form-control" v-model.trim='livestock.livestock_sheep_cycle.number_rams'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock goat cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'caprino'">
                                                    <h4 class="m-4">Ciclo caprino</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="goats_under_six_months" class="col-sm-2 col-form-label">Cabritas y cabritos menores de seis meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cabritas y cabritos menores de seis meses" name="goats_under_six_months" class="form-control" v-model.trim='livestock.livestock_goat_cycle.goats_under_six_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="goats_six_months_to_first_calving" class="col-sm-2 col-form-label">Cabrillas de seis meses hasta parición</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cabirllas de seis meses hasta parición" name="goats_six_months_to_first_calving" class="form-control" v-model.trim='livestock.livestock_goat_cycle.goats_six_months_to_first_calving'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_goats" class="col-sm-2 col-form-label">Cantidad de cabras</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de cabras" name="number_goats" class="form-control" v-model.trim='livestock.livestock_goat_cycle.number_goats'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_capons" class="col-sm-2 col-form-label">Cantidad de obejas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de obejas" name="number_capons" class="form-control" v-model.trim='livestock.livestock_goat_cycle.number_capons'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_stallions" class="col-sm-2 col-form-label">Cantidad de machos cabrios y chivos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de machos cabrios y chivos" name="number_stallions" class="form-control" v-model.trim='livestock.livestock_goat_cycle.number_stallions'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock pig cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'porcino'">
                                                    <h4 class="m-4">Ciclo porcino</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="up_two_months" class="col-sm-2 col-form-label">Lechones hasta dos meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Lechones hasta dos meses" name="up_two_months" class="form-control" v-model.trim='livestock.livestock_pig_cycle.up_two_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="older_two_months" class="col-sm-2 col-form-label">lechones mayores de dos meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="lechones mayores de dos meses" name="older_two_months" class="form-control" v-model.trim='livestock.livestock_pig_cycle.older_two_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="less_four_months" class="col-sm-2 col-form-label">lechones menores de cuatro meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="lechones menores de cuatro meses" name="less_four_months" class="form-control" v-model.trim='livestock.livestock_pig_cycle.less_four_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="older_four_months" class="col-sm-2 col-form-label">lechones mayores de cuatro meses</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="lechones mayores de cuatro meses" name="older_four_months" class="form-control" v-model.trim='livestock.livestock_pig_cycle.older_four_months'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_pigs" class="col-sm-2 col-form-label">Cantidad de cerdos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de cerdos" name="number_pigs" class="form-control" v-model.trim='livestock.livestock_pig_cycle.number_pigs'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_stallions" class="col-sm-2 col-form-label">Cantidad de padrillos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de machos cabrios y chivos" name="number_stallions" class="form-control" v-model.trim='livestock.livestock_pig_cycle.number_stallions'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <!--Livestock llama cycle-->
                                                 <div class="card no-border second" v-if="livestock.type_activity == 'llamas'">
                                                    <h4 class="m-4">Ciclo Llamas</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="number_chitas_teques" class="col-sm-2 col-form-label">Cantidad de chitas y tekes</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de chitas y tekes" name="number_chitas_teques" class="form-control" v-model.trim='livestock.livestock_llama_cycle.number_chitas_teques'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_maltones" class="col-sm-2 col-form-label">Cantidad de maltonas y maltones</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de maltonas y maltones" name="number_maltones" class="form-control" v-model.trim='livestock.livestock_llama_cycle.number_maltones'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_janachos" class="col-sm-2 col-form-label">Cantidad de janachos</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de janachos" name="number_janachos" class="form-control" v-model.trim='livestock.livestock_llama_cycle.number_janachos'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_llamas_mothers" class="col-sm-2 col-form-label">Cantidad de llamas madres</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de llamas madres" name="number_llamas_mothers" class="form-control" v-model.trim='livestock.livestock_llama_cycle.number_llamas_mothers'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_capons" class="col-sm-2 col-form-label">Cantidad de capones</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de capones" name="number_capons" class="form-control" v-model.trim='livestock.livestock_llama_cycle.number_capons'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock poulty cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'avicultura'">
                                                    <h4 class="m-4">Ciclo Avicola</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="is_intensive_poultry" class="col-sm-2 col-form-label">Avicultura intensiva</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_poultry_cycle.is_intensive_poultry"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_broilers_incubated" class="col-sm-2 col-form-label">Parrilleros</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Parrilleros" name="number_broilers_incubated" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.number_broilers_incubated'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="breeding_males" class="col-sm-2 col-form-label">Machos reproductores</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Machos reproductores" name="breeding_males" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.breeding_males'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_eggs_chickens_babies" class="col-sm-2 col-form-label">huevos incubables y pollos bebes</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="huevos incubables y pollos bebes" name="number_eggs_chickens_babies" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.number_eggs_chickens_babies'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_incubators" class="col-sm-2 col-form-label">Cantidad de incubadoras</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de incubadoras" name="number_incubators" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.number_incubators'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_broilers_fattening" class="col-sm-2 col-form-label">Cantidad de incubadoras</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Cantidad de incubadoras" name="number_broilers_fattening" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.number_broilers_fattening'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_breeding_layers" class="col-sm-2 col-form-label">Ponedores reproductores</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Ponedores reproductores" name="number_breeding_layers" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.number_breeding_layers'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="existence" class="col-sm-2 col-form-label">Existencia</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Existencia" name="existence" class="form-control" v-model.trim='livestock.livestock_poultry_cycle.existence'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock rabbit cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'cunicultura'">
                                                    <h4 class="m-4">Ciclo cunicultura</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="orientation" class="col-sm-2 col-form-label">Orientación</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Orientación" name="orientation" class="form-control" v-model.trim='livestock.livestock_rabbit_cycle.orientation'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_breeding_males" class="col-sm-2 col-form-label">Reproductres machos</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Reproductres machos" name="number_breeding_males" class="form-control" v-model.trim='livestock.livestock_rabbit_cycle.number_breeding_males'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_breeding_females" class="col-sm-2 col-form-label">Reproductores hembras</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Reproductores hembras" name="number_breeding_females" class="form-control" v-model.trim='livestock.livestock_rabbit_cycle.number_breeding_females'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_rabbit" class="col-sm-2 col-form-label">Cantidad de conejos</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Cantidad de conejos" name="number_rabbit" class="form-control" v-model.trim='livestock.livestock_rabbit_cycle.number_rabbit'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock beekeeping cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'apicultura'">
                                                    <h4 class="m-4">Ciclo apicultura</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="kind_bee" class="col-sm-2 col-form-label">Raza de abejas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Raza de abejas" name="kind_bee" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.kind_bee'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="has_bee_hives" class="col-sm-2 col-form-label">Existencia de colmenas</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_beekeeping_cycle.has_bee_hives"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_bee_hives" class="col-sm-2 col-form-label">Tipo de colmenas</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de colmenas" name="type_bee_hives" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.type_bee_hives'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="number_drawers" class="col-sm-2 col-form-label">Cantidad de cajones</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Cantidad de cajones" name="number_drawers" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.number_drawers'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="alsas_drawer" class="col-sm-2 col-form-label">Alsas por cajones</label>
                                                            <div class="col-sm-6">
                                                                <input type="number" placeholder="Alsas por cajones" name="alsas_drawer" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.alsas_drawer'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="type_drawer" class="col-sm-2 col-form-label">Tipo de cajones</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de cajones" name="type_drawer" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.type_drawer'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="honey_stones" class="col-sm-2 col-form-label">Rendimiento de miel por litro en cada cajon</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Rendimiento de miel por litro en cada cajon" name="honey_stones" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.honey_stones'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="pollination_period" class="col-sm-2 col-form-label">Periodo de polinización</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Periodo de polinización" name="pollination_period" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.pollination_period'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="pollinated_flower" class="col-sm-2 col-form-label">Flor polinizada</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Flor polinizada" name="pollinated_flower" class="form-control" v-model.trim='livestock.livestock_beekeeping_cycle.pollinated_flower'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="has_renapa" class="col-sm-2 col-form-label">Renapa</label>
                                                            <b-form-checkbox
                                                            v-model.trim="livestock.livestock_beekeeping_cycle.has_renapa"
                                                            value="true"
                                                            unchecked-value="false"
                                                            >
                                                            Sí.
                                                            </b-form-checkbox>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Livestock aquaculture cycle-->
                                                <div class="card no-border second" v-if="livestock.type_activity == 'acuicultura'">
                                                    <h4 class="m-4">Ciclo acuicultura</h4>
                                                    <div class="card-body">
                                                        <div class="form-group row">
                                                            <label for="orientation" class="col-sm-2 col-form-label">Orientación</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Orientación" name="orientation" class="form-control" v-model.trim='livestock.livestock_aquaculture_cycle.orientation'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="existence" class="col-sm-2 col-form-label">Existencia</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Existencia" name="existence" class="form-control" v-model.trim='livestock.livestock_aquaculture_cycle.existence'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
                                    </div>
                                    <!-- Production Agroindustrial -->
                                    <div class="card no-border">
                                        <h4 class="m-4">Producción Agroindustrial <b-badge variant="primary">{{production.production_agroindustrial.length}}</b-badge></h4>
                                        <b-button 
                                        variant="info" 
                                        class="btn-add"
                                        size="sm" 
                                        v-on:click="onDataAgroindustrial(index_production)"
                                        :id="'btnAgroindustrial'+index_production"
                                        >
                                            <b-icon font-scale="1" icon="plus"></b-icon>
                                        </b-button>
                                        <div
                                        class="mb-2 ml-5 mr-5" 
                                        v-for="(agroindustrial, index_agroindustrial) in production.production_agroindustrial" 
                                        :key="index_agroindustrial+1"
                                        >
                                            <b-button class="btn-block" variant="primary" v-b-toggle :href="'#agroindustrial'+index_production+index_agroindustrial">
                                                Producción Agro-industrial 
                                            </b-button>
                                            <b-collapse :id="'agroindustrial'+index_production+index_agroindustrial">
                                                <div class="card no-border second">
                                                    <div class="text-right">
                                                        <b-button
                                                        class="btn-delete mt-1"
                                                        variant="warning"
                                                        size="sm"
                                                        v-on:click="deleteAgroindustrial(index_agroindustrial,index_production)"
                                                        >
                                                            <b-icon icon="trash"></b-icon>
                                                        </b-button>
                                                    </div>
                                                    <div class="card-body">
                                                        <!--insert-->
                                                        <div class="form-group row">
                                                            <label for="description" class="col-sm-2 col-form-label">Descripción</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Descripción" name="description" class="form-control" v-model.trim='agroindustrial.description'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="raw_material" class="col-sm-2 col-form-label">Materia prima</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Materia prima" name="raw_material" class="form-control" v-model.trim='agroindustrial.raw_material'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="knowledge" class="col-sm-2 col-form-label">Tipo de conocimiento</label>
                                                            <div class="col-sm-6">
                                                                <input type="text" placeholder="Tipo de conocimiento" name="knowledge" class="form-control" v-model.trim='agroindustrial.knowledge'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Agroindustrial Handmande-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Producto Artesanal <b-badge variant="info">{{agroindustrial.agroindustrial_handmande_product.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataHand(index_production,index_agroindustrial)"
                                                    :id="'btnHand'+index_production+index_agroindustrial"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(hand, index_hand) in agroindustrial.agroindustrial_handmande_product" 
                                                    :key="index_hand+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#hand'+index_production+index_agroindustrial+index_hand">
                                                            <b-icon icon=""></b-icon> {{hand.name_product}}
                                                        </b-button>
                                                        <b-collapse :id="'hand'+index_production+index_agroindustrial+index_hand">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deleteHand(index_production,index_agroindustrial,index_hand)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="name_product" class="col-sm-2 col-form-label">Producto</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Producto" name="name_product" class="form-control" v-model.trim='hand.name_product'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="quantity" class="col-sm-2 col-form-label">Cantidad</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="number" placeholder="Cantidad" name="quantity" class="form-control" v-model.trim='hand.quantity'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="price" class="col-sm-2 col-form-label">Precio</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Precio" name="price" class="form-control" v-model.trim='hand.price'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--Agroindustrial Food-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Producto Alimentario <b-badge variant="info">{{agroindustrial.agroindustrial_food_product.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataFood(index_production,index_agroindustrial)"
                                                    :id="'btnFood'+index_production+index_agroindustrial"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(food, index_food) in agroindustrial.agroindustrial_food_product" 
                                                    :key="index_food+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#food'+index_production+index_agroindustrial+index_food">
                                                            <b-icon icon=""></b-icon> {{food.name_product}}
                                                        </b-button>
                                                        <b-collapse :id="'food'+index_production+index_agroindustrial+index_food">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deleteFood(index_production,index_agroindustrial,index_food)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="name_product" class="col-sm-2 col-form-label">Producto</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Producto" name="name_product" class="form-control" v-model.trim='food.name_product'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="validity" class="col-sm-2 col-form-label">Periodo de vigencia</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Periodo de vigencia" name="validity" class="form-control" v-model.trim='food.validity'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="origin" class="col-sm-2 col-form-label">Origen</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Origen" name="origin" class="form-control" v-model.trim='food.origin'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="quantity" class="col-sm-2 col-form-label">Cantidad</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="number" placeholder="Cantidad" name="quantity" class="form-control" v-model.trim='food.quantity'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="price" class="col-sm-2 col-form-label">Precio</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Precio" name="price" class="form-control" v-model.trim='food.price'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                                <!--Agroindustrial Tools-->
                                                <div class="card no-border second">
                                                    <h4 class="m-4">Herramientas <b-badge variant="info">{{agroindustrial.agroindustrial_tools.length}}</b-badge></h4>
                                                    <b-button
                                                    variant="info" 
                                                    class="btn-add"
                                                    size="sm"
                                                    v-on:click="onDataTools(index_production,index_agroindustrial)"
                                                    :id="'btnTools'+index_production+index_agroindustrial"
                                                    >
                                                        <b-icon font-scale="1" icon="plus"></b-icon>
                                                    </b-button>
                                                    <div
                                                    class="mb-2 ml-5 mr-5" 
                                                    v-for="(tools, index_tools) in agroindustrial.agroindustrial_tools" 
                                                    :key="index_tools+1"
                                                    >
                                                        <b-button class="btn-block" variant="secondary" v-b-toggle :href="'#tools'+index_production+index_agroindustrial+index_tools">
                                                            <b-icon icon=""></b-icon> {{tools.name_tool}}
                                                        </b-button>
                                                        <b-collapse :id="'tools'+index_production+index_agroindustrial+index_tools">
                                                            <div class="second p-4 card-body" style="padding:5px; border-radius:20px;">
                                                                <div class="text-right">
                                                                    <b-button
                                                                    class="btn-delete  mt-1"
                                                                    variant="warning"
                                                                    size="sm"
                                                                    v-on:click="deleteTools(index_production,index_agroindustrial,index_tools)"
                                                                    >
                                                                        <b-icon icon="trash"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="name_tool" class="col-sm-2 col-form-label">Herrmienta</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Herrmienta" name="name_tool" class="form-control" v-model.trim='tools.name_tool'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="type_tool" class="col-sm-2 col-form-label">Tipo de herramienta</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="text" placeholder="Tipo de herramienta" name="type_tool" class="form-control" v-model.trim='tools.type_tool'>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label for="number_tool" class="col-sm-2 col-form-label">Cantidad</label>
                                                                    <div class="col-sm-6">
                                                                        <input type="number" placeholder="Cantidad" name="number_tool" class="form-control" v-model.trim='tools.number_tool'>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </b-collapse>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
                                    </div>

                                    <!--end production-->
                                </b-collapse>
                            </div>
                        </div>
                    </div>
                    <!--END-->
                    <div class="row justify-content-center">
                        <div class="col content-btn text-center position-fixed">
                            <b-button id="btn-save" type="submit" variant="success" class="expand-btn">
                                <b-icon icon="check" font-scale="2"></b-icon>
                            </b-button>
     
                            <b-button id="btn-cancel" class="btn btn-secondary expand-btn" :to="{ name: 'ListProducer' }">
                                <b-icon class="mt-2" font-scale="2" icon="x"></b-icon>
                            </b-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    components: {
      
    },
    data() {
        return {
            producerId: this.$route.params.producerId,
            // Btn Add
            show: false,
            //Selected Livestock
            selected: null,
            options: [
            { value: null, text: 'Please select an option' },
            { value: 'bovino', text: 'bovino' },
            { value: 'ovino', text: 'ovino' },
            { value: 'caprino', text: 'caprino' },
            { value: 'porcino', text: 'porcino' },
            { value: 'llamas', text: 'llamas' },
            { value: 'avicultura', text: 'avicultura' },
            { value: 'cunicultura', text: 'cunicultura' },
            { value: 'apicultura', text: 'apicultura' },
            { value: 'acuicultura', text: 'acuicultura' },
            ],
        
            form: {
                producer: {
                    first_name: '',
                    last_name: '',
                    date_birth: '',
                    gender: '',
                    document: '',
                    phone_number: '',
                    producer_home: {
                        district: '',
                        address: '',
                        type_recidence: '',
                        state_recidence: '',
                    },
                    producer_person: [],
                    producer_vehicle: [],
                    producer_activity: {
                        works_under_dependency: false,
                        is_monotributista: false,
                        category: '',
                        use_external_labor: false,
                        activity_worker: []
                    },
                    production: []
                }
            },
            
            itemsProduction: {
                is_resident: false,
                district: "",
                surface: 0,
                road_state: "",
                lat: 0,
                lng: 0,
                has_renspa: false,
                production_property: {
                    land_tenure: "",
                    has_land_title: false,
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
            },

            itemsPerson: {
                family_relation: "",
                first_name: "",
                last_name: "",
                age: 0,
                has_primary_studies: false,
                has_secondary_studies: false,
                has_tertiary_studies: false,
                has_university_studies: false,
                perform_work_activity: false,
                description: ""               
            },

            itemsWorker: {
                is_formal_worker: false,
                type_person: '',
                is_resident: false,
                gender: '',
                receive_remuneration: false,
                work_position: '',
                type_job: ''
            },

            itemsBarn: {
                surface: "",
                lat: "",
                lng: "",            
            },

            itemsWell: {
                is_active: false,
                lat: "",
                lng: "",            
            },

            itemsVehicle: {
                name_vehicle: "",
                use_trailer: false,
                type_trailer: "",
                use_semitrailer: false,            
            },

            itemsMachine: {
                destination: "",
                name_machine: "",
                type_maquinary: "",
                model: "",
                state_machine: "",
                age: "",
                observation: ""     
            },   
            
            itemsAgricultural: {
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
            },  
        
            itemsPests: {
                type_pests: "",
                pests_description: "",
                make_pests_control: false,
                make_pesticide: false,
                type_pesticide: "",
                other_practices: ""
            },
        
            itemsClimatic: {
                factor: "",
                risk: "",
                damange_level: ""
            },
        
            itemsLivestock: {
                type_activity: "",
                surface: 0,
                destination: "",
                make_technical_assistance: false,
                problems: "",
                suggestion: "",
                livestock_animal_feeding: [],
                livestock_reproduction: {
                    make_reproductive_management: false,
                    make_continuous_service: false,
                    make_corral_service: false,
                    make_artificial_insemination: false,
                    make_embryo_transplant: false,
                    other_practices: ""
                },
                livestock_animal_pens: [],
                livestock_health: {
                    type_technical_assistance: "",
                    vitamin_complex: "",
                    make_internal_deworming: false,
                    make_external_deworming: false,
                    type_antiparasitic: "",
                    make_vaccination: false,
                    type_vaccination: "",
                    type_disease: "",
                    other_practices: ""
                },
                livestock_marketing: {
                    number_slaughtered: 0,
                    number_shorn: 0,
                    amount_wool_hair: 0,
                    amount_leather: 0,
                    liters_milk: 0,
                    milk_destination: "",
                    wool_hair_destination: "",
                    leather_destination: "",
                    slaughter_destination: ""
                },
                livestock_sales_channel: {
                    is_collector: false,
                    is_cooperative: false,
                    is_exporter: false,
                    use_baler: false,
                    use_fair: false,
                    use_industry: false,
                    use_fridge: false
                },
                livestock_bovine_cycle: {
                    calves_under_one_year: 0,
                    heifers_one_to_two_years: 0,
                    heifers_over_two_years: 0,
                    number_cows: 0,
                    steers_one_to_two_years: 0,
                    steers_older_two_years: 0,
                    bulls_one_to_two_years: 0,
                    bulls_older_two_years: 0,
                    number_oxen_torunos: 0
                },
                livestock_sheep_cycle: {
                    sheep_under_six_months: 0,
                    sheep_older_six_months_to_calving: 0,
                    sheep_older_six_months_one_year: 0,
                    number_sheep: 0,
                    number_capons: 0,
                    number_rams: 0
                },
                livestock_goat_cycle: {
                    goats_under_six_months: 0,
                    goats_six_months_to_first_calving: 0,
                    number_goats: 0,
                    number_capons: 0,
                    number_stallions: 0
                },
                livestock_pig_cycle: {
                    up_two_months: 0,
                    older_two_months: 0,
                    less_four_months: 0,
                    older_four_months: 0,
                    number_pigs: 0,
                    number_stallions: 0
                },
                livestock_llama_cycle: {
                    number_chitas_teques: 0,
                    number_maltones: 0,
                    number_janachos: 0,
                    number_llamas_mothers: 0,
                    number_capons: 0
                },
                livestock_poultry_cycle: {
                    is_intensive_poultry: false,
                    number_broilers_incubated: 0,
                    breeding_males: 0,
                    number_eggs_chickens_babies: 0,
                    number_incubators: 0,
                    number_broilers_fattening: 0,
                    number_breeding_layers: 0,
                    existence: ""
                },
                livestock_rabbit_cycle: {
                    orientation: "",
                    number_breeding_males: 0,
                    number_breeding_females: 0,
                    number_rabbit: 0
                },
                livestock_beekeeping_cycle: {
                    kind_bee: "",
                    has_bee_hives: false,
                    type_bee_hives: "",
                    number_drawers: 0,
                    alsas_drawer: 0,
                    type_drawer: "",
                    honey_stones: 0,
                    pollination_period: "",
                    pollinated_flower: "",
                    has_renapa: true
                },
                livestock_aquaculture_cycle: {
                    orientation: "",
                    existence: ""
                }
            },

            itemsFeeding: {
                feeding: "",
                type_feeding: "",
                daily_rations: 0
            },

            itemsPens: {
                orientation: "",
                building_material: "",
                roof_material: "",
                foor_material: "",
                surface: 0,
                num_animals: 0,
                lat: 0,
                lng: 0
            },
            
            itemsAgroindustrial: {
                description: "",
                raw_material: "",
                is_mechanized: false,
                knowledge: "",
                agroindustrial_food_product: [],
                agroindustrial_handmande_product: [],
                agroindustrial_tools: []
            },
        
            itemsFood: {
                name_product: "",
                validity: "",
                origin: "",
                quantity: 0,
                price: 0
            },
        
            itemsHand: {
                name_product: "",
                quantity: 0,
                price: 0
            },

            itemsTools: {
                name_tool: "",
                type_tool: "",
                number_tools: 0
            },
        }
    },
    methods: {
        onSubmit () {
            this.showToggle();
            event.preventDefault()
            return new Promise((resolve, reject) => {
                const path = `http://www.agrapi.com.ar/api/v1.0/producers/${this.producerId}/`
                axios.patch(path,this.form).then((response) => {

                    Swal.fire("Productor actualizado correctamente!","","success").then(response => {
                        console.log(response)
                        if (response.value == true){
                            setTimeout(() => {
                                console.log("esperando 3 segundos")
                                this.getProducer()
                                
                            }, 3000);
                        }
                    })
                    this.show = false

                    resolve(response)

                })
                .catch((error) => {
                    console.log(error)
                    let msj = error.response.data.non_field_errors[0]
                    Swal.fire('Oops...',msj,'error')
                    this.show = false

                    resolve(reject)
                })
            })
        },
        getProducer () {
            const path = `http://www.agrapi.com.ar/api/v1.0/producers/${this.producerId}/`
            axios.get(path).then(response => {
                //this.form.producer.modified = response.data.modified
                this.form.producer.first_name = response.data.producer.first_name
                this.form.producer.last_name = response.data.producer.last_name
                this.form.producer.date_birth = response.data.producer.date_birth
                this.form.producer.document = response.data.producer.document
                this.form.producer.gender = response.data.producer.gender
                this.form.producer.phone_number = response.data.producer.phone_number
                //Producer Home
                this.form.producer.producer_home.district = response.data.producer.producer_home.district
                this.form.producer.producer_home.address = response.data.producer.producer_home.address
                this.form.producer.producer_home.type_recidence = response.data.producer.producer_home.type_recidence
                this.form.producer.producer_home.state_recidence = response.data.producer.producer_home.state_recidence
                // Producer Person
                this.form.producer.producer_person = response.data.producer.producer_person
                // Producer Vehicle
                this.form.producer.producer_vehicle = response.data.producer.producer_vehicle
                //Producer Activity
                this.form.producer.producer_activity.works_under_dependency = response.data.producer.producer_activity.works_under_dependency
                this.form.producer.producer_activity.is_monotributista = response.data.producer.producer_activity.is_monotributista
                this.form.producer.producer_activity.category = response.data.producer.producer_activity.category
                this.form.producer.producer_activity.use_external_labor = response.data.producer.producer_activity.use_external_labor
                this.form.producer.producer_activity.activity_worker = response.data.producer.producer_activity.activity_worker
                this.form.producer.production = response.data.producer.production

            })
        },
        showToggle() {
            setTimeout(() => {
                this.show = true;
            }, 700);
        },
        //Add data
        onDataPerson () {

            const objPerson = {
                family_relation: "",
                first_name: "",
                last_name: "",
                age: 0,
                has_primary_studies: false,
                has_secondary_studies: false,
                has_tertiary_studies: false,
                has_university_studies: false,
                perform_work_activity: false,
                description: "" 
            }

            class Person {
                constructor(
                    family_relation, 
                    first_name, 
                    last_name, 
                    age, 
                    has_primary_studies, 
                    has_secondary_studies,
                    has_tertiary_studies,
                    has_university_studies,
                    perform_work_activity,
                    description
                    
                    ) {
                    this.family_relation = family_relation
                    this.first_name = first_name
                    this.last_name = last_name
                    this.age = age
                    this.has_primary_studies = has_primary_studies
                    this.has_secondary_studies = has_secondary_studies
                    this.has_tertiary_studies = has_tertiary_studies
                    this.has_university_studies = has_university_studies
                    this.perform_work_activity = perform_work_activity
                    this.description = description
                }
            }

            const obj = new Person (
                this.itemsPerson.family_relation,
                this.itemsPerson.first_name,
                this.itemsPerson.last_name,
                this.itemsPerson.age,
                this.itemsPerson.has_primary_studies,
                this.itemsPerson.has_secondary_studies,
                this.itemsPerson.has_tertiary_studies,
                this.itemsPerson.has_university_studies,
                this.itemsPerson.perform_work_activity,
                this.itemsPerson.description
                )

            let newArray = [] 
            let array = this.form.producer.producer_person
            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.producer_person = array.concat(newArray)
        
                //document.getElementById('btnPerson').style.display='none'
            }else{
                array.push(obj)
        
                //document.getElementById('btnPerson').style.display='none'
            }
            //this.form.producer.producer_person.push(data)
        },
        onDataVehicle () {

            const objVehicle = {
                name_vehicle: "",
                use_trailer: false,
                type_trailer: "",
                use_semitrailer: false, 
            }

            class Vehicle {
                constructor(name_vehicle, use_trailer, type_trailer, use_semitrailer) {
                    this.name_vehicle = name_vehicle
                    this.use_trailer = use_trailer
                    this.type_trailer = type_trailer
                    this.use_semitrailer = use_semitrailer
                }
            }

            const obj = new Vehicle (
                this.itemsVehicle.name_vehicle,
                this.itemsVehicle.use_trailer,
                this.itemsVehicle.type_trailer,
                this.itemsVehicle.use_semitrailer
                )

            let newArray = [] 
            let array = this.form.producer.producer_vehicle
            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.producer_vehicle = array.concat(newArray)
                
                //document.getElementById('btnVehicle').style.display='none'
            }else{
                array.push(obj)
                
                //document.getElementById('btnVehicle').style.display='none'
            }
        },
        onDataWorker () {


            const objWorker = {
                is_formal_worker: false,
                type_person: '',
                is_resident: false,
                gender: '',
                receive_remuneration: false,
                work_position: '',
                type_job: ''
            }

            class Worker {
                constructor(is_formal_worker, type_person, is_resident, gender, receive_remuneration, work_position, type_job) {
                    this.is_formal_worker = is_formal_worker
                    this.type_person = type_person
                    this.is_resident = is_resident
                    this.gender = gender
                    this.receive_remuneration = receive_remuneration
                    this.work_position = work_position
                    this.type_job = type_job
                }
            }

            const obj = new Worker (
                this.itemsWorker.is_formal_worker,
                this.itemsWorker.type_person,
                this.itemsWorker.is_resident,
                this.itemsWorker.gender,
                this.itemsWorker.receive_remuneration,
                this.itemsWorker.work_position,
                this.itemsWorker.type_job,
                )

            let newArray = [] 
            let array = this.form.producer.producer_activity.activity_worker
            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.producer_activity.activity_worker = array.concat(newArray)
                
                //document.getElementById('btnWorker').style.display='none'
            }else{
                array.push(obj)
                
                //document.getElementById('btnWorker').style.display='none'
            }
        }, 
        onDataProduction () {

            const objProduction = {
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

            class Production {
                constructor(
                    is_resident, 
                    district, 
                    surface, 
                    road_state, 
                    lat, 
                    lng, 
                    has_renapa, 
                    production_property,
                    production_service,
                    production_installation,
                    production_machine,
                    production_irrigation,
                    production_agricultural,
                    production_livestock,
                    production_agroindustrial
                ) {
                    this.is_resident = is_resident
                    this.district = district
                    this.surface = surface
                    this.road_state = road_state
                    this.lat = lat
                    this.lng = lng
                    this.has_renapa = has_renapa
                    this.production_property = production_property
                    this.production_service = production_service
                    this.production_installation = production_installation
                    this.production_machine = production_machine
                    this.production_irrigation = production_irrigation
                    this.production_agricultural = production_agricultural
                    this.production_livestock = production_livestock
                    this.production_agroindustrial = production_agroindustrial
                }
            }

            const obj = new Production (
                this.itemsProduction.is_resident,
                this.itemsProduction.district,
                this.itemsProduction.surface,
                this.itemsProduction.road_state,
                this.itemsProduction.lat,
                this.itemsProduction.lng,
                this.itemsProduction.has_renapa,
                this.itemsProduction.production_property,
                this.itemsProduction.production_service,
                this.itemsProduction.production_installation,
                this.itemsProduction.production_machine,
                this.itemsProduction.production_irrigation,
                this.itemsProduction.production_agricultural,
                this.itemsProduction.production_livestock,
                this.itemsProduction.production_agroindustrial,
                )

            let newArray = [] 
            let array = this.form.producer.production
            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production = array.concat(newArray)
                //document.getElementById('btnProduction').style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnProduction').style.display='none'
            }

            //this.form.producer.production.push(this.itemsProduction)
        },
        onDataBarn (index) {

            const objBarn = {
                surface: "",
                lat: "",
                lng: "",
            }

            class Barn {
                constructor(surface, lat, lng) {
                    this.surface = surface
                    this.lat = lat
                    this.lng = lng
                }
            }

            const obj = new Barn (
                this.itemsBarn.surface,
                this.itemsBarn.lat,
                this.itemsBarn.lng,
                )
            
            let newArray = [] 
            let array = this.form.producer.production[index].production_installation.installation_barn

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index].production_installation.installation_barn = array.concat(newArray)
                //document.getElementById('btnBarn'+index).style.display='none'
                
            }else{
                array.push(obj)
                //document.getElementById('btnBarn'+index).style.display='none'
            }
            //this.form.producer.production[this.indexProduction].production_installation.installation_barn.push(data)
        },
        onDataWell (index) {

            const objWell = {
                is_active: false,
                lat: "",
                lng: "", 
            }

            class Well {
                constructor(is_active, lat, lng) {
                    this.is_active = is_active
                    this.lat = lat
                    this.lng = lng
                }
            }

            const obj = new Well (
                this.itemsWell.is_active,
                this.itemsWell.lat,
                this.itemsWell.lng,
                )

            let newArray = [] 
            let array = this.form.producer.production[index].production_installation.installation_well

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index].production_installation.installation_well = array.concat(newArray)
                //document.getElementById('btnWell'+index).style.display='none'
                
            }else{
                array.push(obj)
                //document.getElementById('btnWell'+index).style.display='none'   
            }
            //this.form.producer.production[this.indexProduction].production_installation.installation_well.push(data)
        },
        onDataMachine (index) {

            const objMachine = {
                destination: "",
                name_machine: "",
                type_maquinary: "",
                model: "",
                state_machine: "",
                age: "",
                observation: ""  
            }

            class Machine {
                constructor(destination, name_machine, type_maquinary, model, state_machine, age, observation) {
                    this.destination = destination
                    this.name_machine = name_machine
                    this.type_maquinary = type_maquinary
                    this.model = model
                    this.state_machine = state_machine
                    this.age = age
                    this.observation = observation
                }
            }

            const obj = new Machine (
                this.itemsMachine.destination,
                this.itemsMachine.name_machine,
                this.itemsMachine.type_maquinary,
                this.itemsMachine.model,
                this.itemsMachine.state_machine,
                this.itemsMachine.age,
                this.itemsMachine.observation,
                )

            let newArray = [] 
            let array = this.form.producer.production[index].production_machine

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index].production_machine = array.concat(newArray)
                //document.getElementById('btnMachine'+index).style.display='none'
                
            }else{
                array.push(obj)
                //document.getElementById('btnMachine'+index).style.display='none'
                
            }
            //this.form.producer.production[index].production_machine.push(this.itemsMachine)
        },
        onDataAgricultural (index) {

            const objAgricultural = {
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

            class Agricultural {
                constructor(
                    activity_name,
                    surface,
                    destination,
                    sowing,
                    type_sowing, 
                    age,
                    problems,
                    suggestion,
                    agricultural_attendance,
                    agricultural_climatic,
                    agricultural_pests,
                    agricultural_harvest,
                    agricultural_sales_channel
                    ) {
                    this.activity_name = activity_name
                    this.surface = surface
                    this.destination = destination
                    this.sowing = sowing
                    this.type_sowing = type_sowing
                    this.age = age
                    this.problems = problems
                    this.suggestion = suggestion
                    this.agricultural_attendance = agricultural_attendance
                    this.agricultural_climatic = agricultural_climatic
                    this.agricultural_pests = agricultural_pests
                    this.agricultural_harvest = agricultural_harvest
                    this.agricultural_sales_channel = agricultural_sales_channel
                }
            }

            const obj = new Agricultural (
                this.itemsAgricultural.activity_name,
                this.itemsAgricultural.surface,
                this.itemsAgricultural.destination,
                this.itemsAgricultural.sowing,
                this.itemsAgricultural.type_sowing,
                this.itemsAgricultural.age,
                this.itemsAgricultural.problems,
                this.itemsAgricultural.suggestion,
                this.itemsAgricultural.agricultural_attendance,
                this.itemsAgricultural.agricultural_climatic,
                this.itemsAgricultural.agricultural_pests,
                this.itemsAgricultural.agricultural_harvest,
                this.itemsAgricultural.agricultural_sales_channel,
                )

            let newArray = [] 
            let array = this.form.producer.production[index].production_agricultural

            if (array.length != 0) {
                newArray.push(objAgricultural)
                this.form.producer.production[index].production_agricultural = array.concat(newArray)
                //document.getElementById('btnAgricultural'+index).style.display='none'
            }else{
                array.push(objAgricultural)
                //document.getElementById('btnAgricultural'+index).style.display='none'
            }
        },
        onDataPests (index_production,index_agricultural) {

            const objPests = {
                type_pests: "",
                pests_description: "",
                make_pests_control: false,
                make_pesticide: false,
                type_pesticide: "",
                other_practices: ""
            }

            class Pests {
                constructor(type_pests, pests_description, make_pests_control, make_pesticide, type_pesticide, other_practices) {
                    this.type_pests = type_pests
                    this.pests_description = pests_description
                    this.make_pests_control = make_pests_control
                    this.make_pesticide = make_pesticide
                    this.type_pesticide = type_pesticide
                    this.other_practices = other_practices 

                }
            }

            const obj = new Pests (
                this.itemsPests.type_pests,
                this.itemsPests.pests_description,
                this.itemsPests.make_pests_control,
                this.itemsPests.make_pesticide,
                this.itemsPests.type_pesticide,
                this.itemsPests.other_practices,
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_pests
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_pests = array.concat(newArray)
                //document.getElementById('btnPests'+index_production+index_agricultural).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnPests'+index_production+index_agricultural).style.display='none'
            }
        },
        onDataClimatic (index_production,index_agricultural) {

            const objClimatic = {
                factor: "",
                risk: "",
                damange_level: ""
            }

            class Climatic {
                constructor(factor, risk, damange_level) {
                    this.factor = factor
                    this.risk = risk
                    this.damange_level = damange_level
                }
            }

            const obj = new Climatic (
                this.itemsClimatic.factor,
                this.itemsClimatic.risk,
                this.itemsClimatic.damange_level,
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_climatic
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_climatic = array.concat(newArray)
                //document.getElementById('btnClimatic'+index_production+index_agricultural).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnClimatic'+index_production+index_agricultural).style.display='none'
            }
        },
        onDataLivestock (index) {

            const objLivestock = {
                type_activity: "",
                surface: 0,
                destination: "",
                make_technical_assistance: false,
                problems: "",
                suggestion: "",
                livestock_animal_feeding: [],
                livestock_reproduction: {
                    make_reproductive_management: false,
                    make_continuous_service: false,
                    make_corral_service: false,
                    make_artificial_insemination: false,
                    make_embryo_transplant: false,
                    other_practices: ""
                },
                livestock_animal_pens: [],
                livestock_health: {
                    type_technical_assistance: "",
                    vitamin_complex: "",
                    make_internal_deworming: false,
                    make_external_deworming: false,
                    type_antiparasitic: "",
                    make_vaccination: false,
                    type_vaccination: "",
                    type_disease: "",
                    other_practices: ""
                },
                livestock_marketing: {
                    number_slaughtered: 0,
                    number_shorn: 0,
                    amount_wool_hair: 0,
                    amount_leather: 0,
                    liters_milk: 0,
                    milk_destination: "",
                    wool_hair_destination: "",
                    leather_destination: "",
                    slaughter_destination: ""
                },
                livestock_sales_channel: {
                    is_collector: false,
                    is_cooperative: false,
                    is_exporter: false,
                    use_baler: false,
                    use_fair: false,
                    use_industry: false,
                    use_fridge: false
                },
                livestock_bovine_cycle: {
                    calves_under_one_year: 0,
                    heifers_one_to_two_years: 0,
                    heifers_over_two_years: 0,
                    number_cows: 0,
                    steers_one_to_two_years: 0,
                    steers_older_two_years: 0,
                    bulls_one_to_two_years: 0,
                    bulls_older_two_years: 0,
                    number_oxen_torunos: 0
                },
                    livestock_sheep_cycle: {
                    sheep_under_six_months: 0,
                    sheep_older_six_months_to_calving: 0,
                    sheep_older_six_months_one_year: 0,
                    number_sheep: 0,
                    number_capons: 0,
                    number_rams: 0
                },
                livestock_goat_cycle: {
                    goats_under_six_months: 0,
                    goats_six_months_to_first_calving: 0,
                    number_goats: 0,
                    number_capons: 0,
                    number_stallions: 0
                },
                livestock_pig_cycle: {
                    up_two_months: 0,
                    older_two_months: 0,
                    less_four_months: 0,
                    older_four_months: 0,
                    number_pigs: 0,
                    number_stallions: 0
                },
                livestock_llama_cycle: {
                    number_chitas_teques: 0,
                    number_maltones: 0,
                    number_janachos: 0,
                    number_llamas_mothers: 0,
                    number_capons: 0
                },
                livestock_poultry_cycle: {
                    is_intensive_poultry: false,
                    number_broilers_incubated: 0,
                    breeding_males: 0,
                    number_eggs_chickens_babies: 0,
                    number_incubators: 0,
                    number_broilers_fattening: 0,
                    number_breeding_layers: 0,
                    existence: ""
                },
                livestock_rabbit_cycle: {
                    orientation: "",
                    number_breeding_males: 0,
                    number_breeding_females: 0,
                    number_rabbit: 0
                },
                livestock_beekeeping_cycle: {
                    kind_bee: "",
                    has_bee_hives: false,
                    type_bee_hives: "",
                    number_drawers: 0,
                    alsas_drawer: 0,
                    type_drawer: "",
                    honey_stones: 0,
                    pollination_period: "",
                    pollinated_flower: "",
                    has_renapa: true
                },
                    livestock_aquaculture_cycle: {
                    orientation: "",
                    existence: ""
                }
            }

            class Livestock {
                constructor(
                    type_activity,
                    surface,
                    destination,
                    make_technical_assistance,
                    problems,
                    suggestion,
                    livestock_animal_feeding,
                    livestock_reproduction,
                    livestock_animal_pens,
                    livestock_health,
                    livestock_marketing,
                    livestock_sales_channel,
                    livestock_bovine_cycle,
                    livestock_sheep_cycle,
                    livestock_goat_cycle,
                    livestock_pig_cycle,
                    livestock_llama_cycle,
                    livestock_poultry_cycle,
                    livestock_rabbit_cycle,
                    livestock_beekeeping_cycle,
                    livestock_aquaculture_cycle,
                    ) {
                    this.type_activity = type_activity
                    this.surface = surface
                    this.destination = destination
                    this.make_technical_assistance = make_technical_assistance
                    this.problems = problems
                    this.suggestion = suggestion
                    this.livestock_animal_feeding = livestock_animal_feeding
                    this.livestock_reproduction = livestock_reproduction
                    this.livestock_animal_pens = livestock_animal_pens
                    this.livestock_health = livestock_health
                    this.livestock_marketing = livestock_marketing
                    this.livestock_sales_channel = livestock_sales_channel
                    this.livestock_bovine_cycle = livestock_bovine_cycle
                    this.livestock_sheep_cycle = livestock_sheep_cycle
                    this.livestock_goat_cycle = livestock_goat_cycle
                    this.livestock_pig_cycle = livestock_pig_cycle
                    this.livestock_llama_cycle = livestock_llama_cycle
                    this.livestock_poultry_cycle = livestock_poultry_cycle
                    this.livestock_rabbit_cycle = livestock_rabbit_cycle
                    this.livestock_beekeeping_cycle = livestock_beekeeping_cycle 
                    this.livestock_aquaculture_cycle = livestock_aquaculture_cycle
                }
            }

            const obj = new Livestock (
                this.itemsLivestock.type_activity,
                this.itemsLivestock.surface,
                this.itemsLivestock.destination,
                this.itemsLivestock.make_technical_assistance,
                this.itemsLivestock.problems,
                this.itemsLivestock.suggestion,
                this.itemsLivestock.livestock_animal_feeding,
                this.itemsLivestock.livestock_reproduction,
                this.itemsLivestock.livestock_animal_pens,
                this.itemsLivestock.livestock_health,
                this.itemsLivestock.livestock_marketing,
                this.itemsLivestock.livestock_sales_channel,
                this.itemsLivestock.livestock_bovine_cycle,
                this.itemsLivestock.livestock_sheep_cycle,
                this.itemsLivestock.livestock_goat_cycle,
                this.itemsLivestock.livestock_pig_cycle,
                this.itemsLivestock.livestock_llama_cycle,
                this.itemsLivestock.livestock_poultry_cycle,
                this.itemsLivestock.livestock_rabbit_cycle,
                this.itemsLivestock.livestock_beekeeping_cycle, 
                this.itemsLivestock.livestock_aquaculture_cycle,
                )

            let newArray = [] 
            let array = this.form.producer.production[index].production_livestock

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index].production_livestock = array.concat(newArray)
                //document.getElementById('btnLivestock'+index).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnLivestock'+index).style.display='none'
            }
        },
        onDataFeeding (index_production,index_livestock) {

            const objFeeding = {
                feeding: "",
                type_feeding: "",
                daily_rations: 0
            }

            class Fedding {
                constructor(feeding, type_feeding, daily_rations) {
                    this.feeding = feeding
                    this.type_feeding = type_feeding
                    this.daily_rations = daily_rations
                }
            }

            const obj = new Fedding (
                this.itemsFeeding.feeding,
                this.itemsFeeding.type_feeding,
                this.itemsFeeding.daily_rations,
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_feeding
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_feeding = array.concat(newArray)
                //document.getElementById('btnFeeding'+index_production+index_livestock).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnFeeding'+index_production+index_livestock).style.display='none'
            }
        },
        onDataPens (index_production,index_livestock) {

            const objPens = {
                orientation: "",
                building_material: "",
                roof_material: "",
                foor_material: "",
                surface: 0,
                num_animals: 0,
                lat: 0,
                lng: 0
            }

            class Pens {
                constructor(orientation, building_material, roof_material, foor_material, surface, num_animals, lat, lng) {
                    this.orientation = orientation
                    this.building_material = building_material
                    this.roof_material = roof_material
                    this.foor_material = foor_material
                    this.surface = surface
                    this.num_animals = num_animals
                    this.lat = lat
                    this.lng = lng
                }
            }

            const obj = new Pens (
                this.itemsPens.orientation,
                this.itemsPens.building_material,
                this.itemsPens.roof_material,
                this.itemsPens.foor_material,
                this.itemsPens.surface,
                this.itemsPens.num_animals,
                this.itemsPens.lat,
                this.itemsPens.lng
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_pens
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_pens = array.concat(newArray)
                //document.getElementById('btnPens'+index_production+index_livestock).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnPens'+index_production+index_livestock).style.display='none'
            }
        },
        onDataAgroindustrial (index) {

            const objAgro = {
                description: "",
                raw_material: "",
                is_mechanized: false,
                knowledge: "",
                agroindustrial_food_product: [],
                agroindustrial_handmande_product: [],
                agroindustrial_tools: []
            }

            class Agroidustrial {
                constructor(
                    description, 
                    raw_material, 
                    is_mechanized, 
                    knowledge,
                    agroindustrial_food_product,
                    agroindustrial_handmande_product,
                    agroindustrial_tools) {

                    this.description = description
                    this.raw_material = raw_material
                    this.is_mechanized = is_mechanized
                    this.knowledge = knowledge
                    this.agroindustrial_food_product = agroindustrial_food_product
                    this.agroindustrial_handmande_product = agroindustrial_handmande_product
                    this.agroindustrial_tools = agroindustrial_tools
                }
            }

            const obj = new Agroidustrial (
                this.itemsAgroindustrial.description,
                this.itemsAgroindustrial.raw_material,
                this.itemsAgroindustrial.is_mechanized,
                this.itemsAgroindustrial.knowledge,
                this.itemsAgroindustrial.agroindustrial_food_product,
                this.itemsAgroindustrial.agroindustrial_handmande_product,
                this.itemsAgroindustrial.agroindustrial_tools,
                )

            let newArray = [] 
            let array = this.form.producer.production[index].production_agroindustrial
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index].production_agroindustrial = array.concat(newArray)
                //document.getElementById('btnAgroindustrial'+index).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnAgroindustrial'+index).style.display='none'
            }
        },
        onDataFood (index_production,index_agroindustrial) {
            
            const objFood = {
                name_product: "",
                validity: "",
                origin: "",
                quantity: 0,
                price: 0
            }

            class Food {
                constructor(name_product, validity, origin, quantity, price) {
                    this.name_product = name_product
                    this.validity = validity
                    this.origin = origin
                    this.quantity = quantity
                    this.price = price
                }
            }

            const obj = new Food (
                this.itemsFood.name_product,
                this.itemsFood.validity,
                this.itemsFood.origin,
                this.itemsFood.quantity,
                this.itemsFood.price
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_food_product
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_food_product = array.concat(newArray)
                //document.getElementById('btnFood'+index_production+index_agroindustrial).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnFood'+index_production+index_agroindustrial).style.display='none'
            }
        },
        onDataHand (index_production,index_agroindustrial) {

            const objHand = {
                name_product: "",
                quantity: 0,
                price: 0
            }
            
            class Hand {
                constructor(name_product, quantity, price) {
                    this.name_product = name_product;
                    this.quantity = quantity;
                    this.price = price;
                }
            }

            const obj = new Hand(
                this.itemsHand.name_product,
                this.itemsHand.quantity,
                this.itemsHand.price
                )

            let newArray = [] 
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_handmande_product
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_handmande_product = array.concat(newArray)
                //document.getElementById('btnHand'+index_production+index_agroindustrial).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnHand'+index_production+index_agroindustrial).style.display='none'
            }
        },
        onDataTools (index_production,index_agroindustrial) {

            const objTools = {
                name_tool: "",
                type_tool: "",
                number_tools: 0
            }

            class Tools {
                constructor(name_tool, type_tool, number_tools) {
                    this.name_tool = name_tool;
                    this.type_tool = type_tool;
                    this.number_tools = number_tools;
                }
            }

            const obj = new Tools (
                this.itemsTools.name_tool,
                this.itemsTools.type_tool,
                this.itemsTools.number_tools
                )


            let newArray = [] 
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_tools
            console.log(array)

            if (array.length != 0) {
                newArray.push(obj)
                this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_tools = array.concat(newArray)
                //document.getElementById('btnTools'+index_production+index_agroindustrial).style.display='none'
            }else{
                array.push(obj)
                //document.getElementById('btnTools'+index_production+index_agroindustrial).style.display='none'
            }
        },
        //Delete Data
        deletePerson (index_person) {
            let array = this.form.producer.producer_person

            array.splice(index_person,1)
    
            if (array.length == 0) {
                document.getElementById('btnPerson').style.display = "block"
            }
            array.forEach(element => {
                console.log(element)
                console.log(element.length)
                if (element || array == 0) {
                    document.getElementById('btnPerson').style.display = "block"
                }
            });
            //this.form.producer.producer_person.splice(index_person,1)
        },
        deleteVehicle(index_vehicle) {

            let array = this.form.producer.producer_vehicle

            array.splice(index_vehicle,1)
    
            if (array.length == 0) {
                document.getElementById('btnVehicle').style.display = "block"
            }
            array.forEach(element => {
                console.log(element)
                console.log(element.length)
                if (element || array == 0) {
                    document.getElementById('btnVehicle').style.display = "block"
                }
            });
        },
        deleteWorker(index_worker) {
            
            let array = this.form.producer.producer_activity.activity_worker

            array.splice(index_worker,1)
    
            if (array.length == 0) {
                document.getElementById('btnWorker').style.display = "block"
            }
            array.forEach(element => {
                console.log(element)
                console.log(element.length)
                if (element || array == 0) {
                    document.getElementById('btnWorker').style.display = "block"
                }
            });
            //this.form.producer.producer_activity.activity_worker.splice(index_worker,1)
        },
        deleteProduction(index_production) {

            let array = this.form.producer.production

            array.splice(index_production,1)
    
            if (array.length == 0) {
                document.getElementById('btnProduction').style.display = "block"
            }
            array.forEach(element => {
                console.log(element)
                console.log(element.length)
                if (element || array == 0) {
                    document.getElementById('btnProduction').style.display = "block"
                }
            });
        },
        deleteBarn(index_barn,index_production) {
            let array = this.form.producer.production[index_production].production_installation.installation_barn
            array.splice(index_barn,1)
    
            if (array.length == 0) {
                document.getElementById('btnBarn'+index_production).style.display = "block"
            }
            array.forEach(element => {
     
                if (element || array == 0) {
                    document.getElementById('btnBarn'+index_production).style.display = "block"
                }
            });
            //this.form.producer.production[index_production].production_installation.installation_barn.splice(index_barn,1)
        },
        deleteWell(index_well,index_production) {

            let array = this.form.producer.production[index_production].production_installation.installation_well

            array.splice(index_well,1)
    
            if (array.length == 0) {
                document.getElementById('btnWell'+index_production).style.display = "block"
            }
            array.forEach(element => {

                if (element || array == 0) {
                    document.getElementById('btnWell'+index_production).style.display = "block"
                }
            });
            //this.form.producer.production[index_production].production_installation.installation_well.splice(index_well,1)
        },
        deleteMachine(index_machine,index_production) {
            
            let array = this.form.producer.production[index_production].production_machine

            array.splice(index_machine,1)
    
            if (array.length == 0) {
                document.getElementById('btnMachine'+index_production).style.display = "block"
            }
            array.forEach(element => {
            
                if (element || array == 0) {
                    document.getElementById('btnMachine'+index_production).style.display = "block"
                }
            });
            //this.form.producer.production[index_production].production_machine.splice(index_machine,1)
        },
        deleteAgricultural(index_agricultural, index_production) {
            let array = this.form.producer.production[index_production].production_agricultural
            array.splice(index_agricultural,1)

            if (array.length == 0) {
                document.getElementById('btnAgricultural'+index_production).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnAgricultural'+index_production).style.display = "block"
                }
            });
        },
        deletePests(index_production,index_agricultural,index_pests) {
            let array = this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_pests
            array.splice(index_pests,1)

            if (array.length == 0) {
                document.getElementById('btnPests'+index_production+index_agricultural).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnPests'+index_production+index_agricultural).style.display = "block"
                }
            });
        },
        deleteClimatic(index_production,index_agricultural,index_climatic) {
            let array = this.form.producer.production[index_production].production_agricultural[index_agricultural].agricultural_climatic
            array.splice(index_climatic,1)

            if (array.length == 0) {
                document.getElementById('btnClimatic'+index_production+index_agricultural).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnClimatic'+index_production+index_agricultural).style.display = "block"
                }
            });
        },
        deleteLivestock(index_livestock, index_production) {
            let array = this.form.producer.production[index_production].production_livestock
            array.splice(index_livestock,1)

            if (array.length == 0) {
                document.getElementById('btnLivestock'+index_production).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnLivestock'+index_production).style.display = "block"
                }
            });
        },
        deleteFeeding(index_production,index_livestock,index_feeding) {
            let array = this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_feeding
            array.splice(index_feeding,1)

            if (array.length == 0) {
                document.getElementById('btnFeeding'+index_production+index_livestock).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnFeeding'+index_production+index_livestock).style.display = "block"
                }
            });
        },
        deletePens(index_production,index_livestock,index_pens) {
            let array = this.form.producer.production[index_production].production_livestock[index_livestock].livestock_animal_pens
            array.splice(index_pens,1)

            if (array.length == 0) {
                document.getElementById('btnPens'+index_production+index_livestock).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnPens'+index_production+index_livestock).style.display = "block"
                }
            });
        },
        deleteAgroindustrial(index_agroindustrial, index_production) {
            let array = this.form.producer.production[index_production].production_agroindustrial
            array.splice(index_agroindustrial,1)

            if (array.length == 0) {
                document.getElementById('btnAgroindustrial'+index_production).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnAgroindustrial'+index_production).style.display = "block"
                }
            });
        },
        deleteHand(index_production,index_agroindustrial,index_hand) {
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_handmande_product
            array.splice(index_hand,1)

            if (array.length == 0) {
                document.getElementById('btnHand'+index_production+index_agroindustrial).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnHand'+index_production+index_agroindustrial).style.display = "block"
                }
            });
        },
        deleteFood(index_production,index_agroindustrial,index_food) {
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_food_product
            array.splice(index_food,1)

            if (array.length == 0) {
                document.getElementById('btnFood'+index_production+index_agroindustrial).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnFood'+index_production+index_agroindustrial).style.display = "block"
                }
            });
        },
        deleteTools(index_production,index_agroindustrial,index_tools) {
            let array = this.form.producer.production[index_production].production_agroindustrial[index_agroindustrial].agroindustrial_tools
            array.splice(index_tools,1)

            if (array.length == 0) {
                document.getElementById('btnTools'+index_production+index_agroindustrial).style.display = "block"
            }
            array.forEach(element => {
                if (element || array == 0) {
                    document.getElementById('btnTools'+index_production+index_agroindustrial).style.display = "block"
                }
            });
        }
    },
    computed: {

    },
    created() {
        this.getProducer()
    },
}
</script>

<style lang="css">
/*Buttons delete producer*/
.btn-add {

    margin-top: 15px;
    margin-right: 15px;
    position:absolute;
    top:0;
    right:0;
}
.btn-delete {

    margin-top: 0px;
    margin-right: 5px;
    margin-bottom: 0px;
}   
.content-btn{
    bottom: 20px;
}
#btn-save{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0.5rem;
}
#btn-cancel{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0.5rem;
}

.margin-app {
    margin-top: 80px;
    margin-bottom: 120px;
}
.a-delete {
    padding: 3px;
    border-radius: 50%;
    margin-left: 10px;
    top:0;
    right:0;
    background-color: darkorange;
}
.no-border {
    box-shadow: none;
}
.expand-btn:hover {
    transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -webkit-transition: all 500ms;
}
.text-loader {
    margin-top: 120px;
    color: white;
    overflow-y: hidden;
    position: absolute;
    width: 100%;
}
.content-loader {
    display: fixed;
    word-wrap: break-word;
}
.preloader-data {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 30%;
  background-color: rgba(0, 0, 0, 0.247);
  z-index: 1;
  min-height: 120px;
  width: 252px;
  text-align: center;
  word-wrap: break-word;
  border-radius: 2rem;
  margin-top: 10%;
}
.lds-ripple-data {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple-data div {
  position: absolute;
  border: 4px solid #21ca0b;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple-data 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple-data div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple-data {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>