<template lang="html">
    <div class="container-fluid content-app p-4">
        <div class="justify-content-center">
            <div class="col-lg-8 col-md-10 mx-auto" v-for="(item,index_production) in producer.production" :key="'production'+index_production+1">
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Producción</h4>
                        <b-card-text>
                            <p>Reside en el lugar: 
                                <strong v-if="item.is_resident">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Distrito: <strong>{{item.district}}</strong></p>
                            <p>Superficie de la producción: <strong>{{item.surface}} ha.<sup>2</sup></strong></p>
                            <p>Estado de los caminos: <strong>{{item.road_state}}</strong></p>
                            <p>Renspa: 
                                <strong v-if="item.has_renspa">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Renaf: 
                                <strong v-if="item.has_renaf">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <div class="m-2">
                    <p class="title-maps">Ubicación de zona de producción</p>
                    <GmapMap
                    :center="myCoordinates"
                    :zoom="zoom"
                    class="maps"
                    >
                        <gmap-marker
                        :position="{lat:item.lat, lng:item.lng}"
                        :clickable="clickable"
                        :draggable="draggable"
                        icon="/static/img/location.png"
                        ></gmap-marker>
                    </GmapMap>
                </div>
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Propiedad</h4>
                        <b-card-text>
                            <p>Tenencia de la tierra: <strong>{{item.production_property.land_tenure}}</strong></p>
                            <p>Título: 
                                <strong v-if="item.production_property.has_land_title">
                                    Sí
                                </strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Matrícula catastral: <strong>{{item.production_property.cadastre_registration}}</strong></p>
                            <p>Número de partida: <strong>{{item.production_property.starting_number}}</strong></p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Servicios</h4>
                        <b-card-text>
                            <p>Servicio de agua: 
                                <strong v-if="item.production_service.has_service_aqua">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Servicio de energia: 
                                <strong v-if="item.production_service.has_service_energy">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Red electrica rural: 
                                <strong v-if="item.production_service.has_rural_energy">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Grupo electrogeno: 
                                <strong v-if="item.production_service.has_generator">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Generador hidráulico: 
                                <strong v-if="item.production_service.has_hydraulic_generator">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Paneles solares: 
                                <strong v-if="item.production_service.has_solar_panels">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Instalaciones</h4>
                        <b-card-text>
                            <p>Molinos de viento: 
                                <strong v-if="item.production_installation.has_windmills">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Tanques australianos: 
                                <strong v-if="item.production_installation.has_australian_tanks">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Represas y tajamares: 
                                <strong v-if="item.production_installation.has_dams">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Balanzas para camiones: 
                                <strong v-if="item.production_installation.has_truck_scale">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Picadas cortafuego: 
                                <strong v-if="item.production_installation.has_fire_break">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Picadas de acero: 
                                <strong v-if="item.production_installation.has_minced_steel">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Pileta para acuicultura: 
                                <strong v-if="item.production_installation.has_pools">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <div class="m-2">
                    <p class="title-maps">Pozos y Galpones</p>
                    <GmapMap
                    :center="{lat:item.lat, lng:item.lng}"
                    :zoom=15.5
                    icon="src/assets/img/barn.png"
                    class="maps"
                    >
                        <gmap-marker
                        v-for="(barn,index_barn) in item.production_installation.installation_barn"
                        :key="'barn'+index_barn+1"
                        :position="{lat:barn.lat, lng:barn.lng}"
                        :clickable="clickable"
                        :draggable="draggable"
                        icon="/static/img/barn.png"
                        ></gmap-marker>
                        <gmap-marker
                        v-for="(well,index_well) in item.production_installation.installation_well"
                        :key="'well'+index_well+1"
                        :position="{lat:well.lat, lng:well.lng}"
                        :clickable="clickable"
                        :draggable="draggable"
                        icon="/static/img/well.png"
                        ></gmap-marker>
                    </GmapMap>
                </div>
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Riego y Servicios</h4>
                        <b-card-text>
                            <p>Tipo de riego: <strong>{{item.production_irrigation.type_irrigation}}</strong></p>
                            <p>Riego presurizado: <strong>{{item.production_irrigation.pressurized_irrigation}}</strong></p>
                            <p>Riego superficial: <strong>{{item.production_irrigation.surface_irrigation}}</strong></p>
                            <p>Toma o sección: <strong>{{item.production_irrigation.take_section}}</strong></p>
                            <p>Horas de agua: <strong>{{item.production_irrigation.watering_hours}}</strong></p>
                            <p>Condición de acequias y canales: <strong>{{item.production_irrigation.channel_conditions}}</strong></p>
                            <p>Derecho: <strong>{{item.production_irrigation.right}}</strong></p>
                            <p>Turnos: <strong>{{item.production_irrigation.shifts}}</strong></p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <b-card no-body>
                    <b-card-body>
                        <h4 class="mb-4">Maquinarias</h4>
                        <b-card-text 
                        v-for="(machine,index_machine) in item.production_machine" 
                        :key="'machine'+index_machine+1" 
                        class="mb-2 second"
                        style="padding:15px; border-radius:20px; "
                        >
                            <p><strong>{{machine.name_machine}}</strong></p>
                            <p>Destino de maquinaria: <strong>{{machine.destination}}</strong></p>
                            <p>Tipo de maquinaria: <strong>{{machine.type_maquinary}}</strong></p>
                            <p>Modelo: <strong>{{machine.model}}</strong></p>
                            <p>Estado: <strong>{{machine.state_machine}}</strong></p>
                            <p>Años: <strong>{{machine.age}}</strong></p>
                            <p>Observaciones: <strong>{{machine.observation}}</strong></p>
                        </b-card-text>
                    </b-card-body>
                </b-card>
                <!-- End Production -->
                <br>
                <!-- Production Agricultural -->
                <div v-for="(agricultural, index_agricultural) in item.production_agricultural" :key="'agricultural'+index_agricultural+1">
                    <div class="mb-3">
                        <b-button
                        v-if="item.production_agricultural" 
                        variant="info" 
                        v-b-toggle :href="'#agricultural'+index_production+index_agricultural"
                        class="btn-block"
                        >
                        <b-icon icon="justify"></b-icon>
                        Producción Agricola
                        </b-button>
                    </div>
                    <b-collapse :id="'agricultural'+index_production+index_agricultural">
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Producción Agrícola</h4>
                                    <b-card-text>
                                        <p>Tipo de cultivo: <strong>{{agricultural.activity_name}}</strong></p>
                                        <p>Variedad: <strong>{{agricultural.variety}}</strong></p>
                                        <p>Superficie de actividad: <strong>{{agricultural.surface}} ha.<sup>2</sup></strong></p>
                                        <p>Destino de actividad: <strong>{{agricultural.destination}}</strong></p>
                                        <p>Siembra: <strong>{{agricultural.sowing}}</strong></p>
                                        <p>Tipo de siembra: <strong>{{agricultural.type_sowing}}</strong></p>
                                        <p>Edad en meses: <strong>{{agricultural.age}}</strong></p>
                                        <p>Cierre perimetral: <strong>{{agricultural.perimeter_closure}}</strong></p>
                                        <p>Sugerencias al Municipio: <strong>{{agricultural.suggestion}}</strong></p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Cuidados Culturales</h4>
                                    <b-card-text>
                                        <p>Fertilizantes: 
                                            <strong v-if="agricultural.agricultural_attendance.use_fertilizers">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Abono orgánico: 
                                            <strong v-if="agricultural.agricultural_attendance.use_food_organic">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Utilización de feromonas: 
                                            <strong v-if="agricultural.agricultural_attendance.use_pheromones">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Malla anti granizo: 
                                            <strong v-if="agricultural.agricultural_attendance.use_hail_mesh">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Otros: 
                                            <strong>
                                                {{agricultural.agricultural_attendance.other_practices}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Factores Climáticos</h4>
                                    <b-card-text
                                    v-for="(climatic,index_climatic) in agricultural.agricultural_climatic" 
                                    :key="index_climatic+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p>Factor: 
                                            <strong>
                                                {{climatic.factor}}
                                            </strong>
                                        </p>
                                        <p>Riesgo: 
                                            <strong>
                                                {{climatic.risk}}
                                            </strong>
                                        </p>
                                        <p>Descripción: 
                                            <strong>
                                                {{climatic.description}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Plagas, Pestes y Malezas </h4>
                                    <b-card-text
                                    v-for="(pests,index_pests) in agricultural.agricultural_pests" 
                                    :key="'pests'+index_pests+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p> 
                                            <strong>
                                                {{pests.type_pests}}
                                            </strong>
                                        </p>
                                        <p>Descripción: 
                                            <strong>
                                                {{pests.pests_description}}
                                            </strong>
                                        </p>
                                        <p>Control de {{pests.type_pests}}: 
                                            <strong v-if="pests.make_pests_control">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de control: 
                                            <strong>
                                                {{pests.type_pests_control}}
                                            </strong>
                                        </p>
                                        <p>Agroquimico: 
                                            <strong v-if="pests.make_pesticide">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de agroquimico:
                                            <strong>
                                                {{pests.type_pesticide}}
                                            </strong>
                                        </p>
                                        <p>Otras practicas: 
                                            <strong>
                                                {{pests.other_practices}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Cosecha</h4>
                                    <div
                                    v-for="(harvest,index_harvest) in agricultural.agricultural_harvest" 
                                    :key="'harvest'+index_harvest+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px;"
                                    >
                                        <b-card-text>
                                            <p><b-badge>{{ harvest.created | date-filter }}</b-badge></p>
                                            <p>Superfiie de cosecha cosecha: 
                                                <strong>
                                                    {{harvest.harvest_surface}} ha.<sup>2</sup>
                                                </strong>
                                            </p>
                                            <p>Rendimiento: 
                                                <strong>
                                                    {{harvest.tons_production}} toneladas
                                                </strong>
                                            </p>
                                            <p>Epoca de cosecha:
                                                <strong>{{harvest.harvest_time}}</strong>
                                            </p>
                                        </b-card-text>
                                        <b-card-text>
                                            <h4 class="mb-4">Canal de ventas</h4>
                                            <p>Acopiador: 
                                                <strong v-if="harvest.agricultural_sales_channel.is_collector">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Cooperativa: 
                                                <strong v-if="harvest.agricultural_sales_channel.is_cooperative">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Exportación: 
                                                <strong v-if="harvest.agricultural_sales_channel.is_exporter">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Empacadora: 
                                                <strong v-if="harvest.agricultural_sales_channel.use_baler">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Forma directa o feria: 
                                                <strong v-if="harvest.agricultural_sales_channel.use_fair">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Frigoríficos: 
                                                <strong v-if="harvest.agricultural_sales_channel.use_fridge">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Venta directa: 
                                                <strong v-if="harvest.agricultural_sales_channel.make_direct_sale">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                        </b-card-text>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </div>
                    </b-collapse>
                </div>
                <!-- End Production Agricultural -->
                <br>
                <!-- Production Livestock -->
                <div v-for="(livestock,index_livestock) in item.production_livestock" :key="'livestock'+index_livestock+1">
                    <div class="mb-3">
                        <b-button
                        variant="info" 
                        v-b-toggle :href="'#livestock'+index_production+index_livestock"
                        class="btn-block"
                        >
                        <b-icon icon="justify"></b-icon>
                        Producción Ganadera
                        </b-button>
                    </div>
                    <b-collapse :id="'livestock'+index_production+index_livestock">
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Producción Ganadera</h4>
                                    <b-card-text>
                                        <p>Actividad Ganadera: <strong>{{livestock.type_activity}}</strong></p>
                                        <p>Superficie de actividad: <strong>{{livestock.surface}} ha.<sup>2</sup></strong></p>
                                        <p>Destino de actividad: <strong>{{livestock.destination}}</strong></p>
                                        <p>Asistencia técnica: 
                                            <strong v-if="livestock.make_technical_assistance">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Problemas: <strong>{{livestock.problems}}</strong></p>
                                        <p>Sugerencias al Municipio: <strong>{{livestock.suggestion}}</strong></p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Alimentación</h4>
                                    <b-card-text
                                    v-for="(feeding,index_feeding) in livestock.livestock_animal_feeding" 
                                    :key="'feeding'+index_feeding+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p>Alimento:
                                            <strong>
                                                {{feeding.feeding}}
                                            </strong>
                                        </p>
                                        <p>Tipo de alimentación: 
                                            <strong>
                                                {{feeding.type_feeding}}
                                            </strong>
                                        </p>
                                        <p>Raciones diarias per capita: 
                                            <strong>
                                                {{feeding.daily_rations}} kg.
                                            </strong>
                                        </p>
                                        <p>Descripción: 
                                            <strong>
                                                {{feeding.description}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Reproducción</h4>
                                    <b-card-text>
                                        <p>Manejo reproductivo 
                                            <strong v-if="livestock.livestock_reproduction.make_reproductive_management">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de majo reproductivo 
                                            <strong>
                                                {{livestock.livestock_reproduction.type_reproductive_management}}
                                            </strong>
                                        </p>
                                        <p>Servicio continuo 
                                            <strong v-if="livestock.livestock_reproduction.make_continuous_service">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Otras prácticas 
                                            <strong>
                                                {{livestock.livestock_reproduction.other_practices}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div> 
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Corrales</h4>
                                    <b-card-text
                                    v-for="(pens,index_pens) in livestock.livestock_animal_pens" 
                                    :key="'pens'+index_pens+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                    <p>Orientación: 
                                        <strong>{{pens.orientation}}</strong>
                                    </p>
                                    <p>Materiales: 
                                        <strong>{{pens.building_material}}</strong>
                                    </p>
                                    <p>Tipo de techo: 
                                        <strong>{{pens.roof_material}}</strong>
                                    </p>
                                    <p>Piso: 
                                        <strong>{{pens.foor_material}}</strong>
                                    </p>
                                    <p>Superficie: 
                                        <strong>{{pens.surface}} metros cuadrados</strong>
                                    </p>
                                    <p>Cantidad de animales: 
                                        <strong>{{pens.num_animals}}</strong>
                                    </p>
                                    </b-card-text>
                                </b-card-body>
                                <b-card-body>                                        <!--Maps animal pens-->
                                    <div>
                                        <p class="title-maps">Corrales</p>
                                        <GmapMap
                                        :center="{lat:item.lat, lng:item.lng}"
                                        :zoom=15.5
                                        class="maps"
                                        >
                                            <gmap-marker
                                            v-for="(pens_maps,index) in livestock.livestock_animal_pens"
                                            :key="index+1"
                                            :position="{lat:pens_maps.lat, lng:pens_maps.lng}"
                                            :clickable="clickable"
                                            :draggable="draggable"
                                            icon="/static/img/pens.png"
                                            ></gmap-marker>
                                        </GmapMap>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Sanidad</h4>
                                    <b-card-text>
                                        <p>Tipo de acesoramiento 
                                            <strong>
                                                {{livestock.livestock_health.type_technical_assistance}}
                                            </strong>
                                        </p>
                                        <p>Aplicación de complejo vitaminico 
                                            <strong>
                                                {{livestock.livestock_health.vitamin_complex}}
                                            </strong>
                                        </p>
                                        <p>Desparacitaciones internas 
                                            <strong v-if="livestock.livestock_health.make_internal_deworming">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Desparacitaciones externas 
                                            <strong v-if="livestock.livestock_health.make_external_deworming">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de antiparasitario 
                                            <strong>
                                                {{livestock.livestock_health.type_antiparasitic}}
                                            </strong>
                                        </p>
                                        <p>Vacunación 
                                            <strong v-if="livestock.livestock_health.make_vaccination">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de vacunación 
                                            <strong>
                                                {{livestock.livestock_health.type_vaccination}}
                                            </strong>
                                        </p>
                                        <p>Tipo de enfermedad 
                                            <strong>
                                                {{livestock.livestock_health.type_disease}}
                                            </strong>
                                        </p>
                                        <p>Nombre enfermedad 
                                            <strong>
                                                {{livestock.livestock_health.name_disease}}
                                            </strong>
                                        </p>
                                        <p>Otras practicas 
                                            <strong>
                                                {{livestock.livestock_health.other_practices}}
                                            </strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Comercialización</h4>
                                    <div
                                    v-for="(marketing,index_marketing) in livestock.livestock_marketing" 
                                    :key="'marketing'+index_marketing+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <b-card-text>
                                            <p><b-badge>{{ marketing.created | date-filter }}</b-badge></p>
                                            <p>Cantidad de faenafos: 
                                                <strong>{{marketing.number_slaughtered}} animales</strong>
                                            </p>
                                            <p>Destino de faenados: 
                                                <strong>{{marketing.slaughter_destination}}</strong>
                                            </p>
                                            <p>Cantidad de piel obtenida: 
                                                <strong>{{marketing.amount_leather}} kg.</strong>
                                            </p>
                                            <p>Destino de piel: 
                                                <strong>{{marketing.leather_destination}}</strong>
                                            </p>
                                            <p>Cantidad de esquilados: 
                                                <strong>{{marketing.number_shorn}} animales</strong>
                                            </p>
                                            <p>Cantidad de lana obtenido: 
                                                <strong>{{marketing.amount_wool}} kg.</strong>
                                            </p>
                                            <p>Destino de lana: 
                                                <strong>{{marketing.wool_destination}}</strong>
                                            </p>
                                            <p>Litros de leche obtenidos: 
                                                <strong>{{marketing.liters_milk}} lts.</strong>
                                            </p>
                                            <p>Destino de leche: 
                                                <strong>{{marketing.milk_destination}}</strong>
                                            </p>
                                            <p>Cantidad de hevos: 
                                                <strong>{{marketing.amount_eggs}}</strong>
                                            </p>
                                            <p>Destino de hevos: 
                                                <strong>{{marketing.eggs_destination}}</strong>
                                            </p>
                                            <p>Cantidad de heces: 
                                                <strong>{{marketing.amount_feces}}</strong>
                                            </p>
                                            <p>Destino de heces: 
                                                <strong>{{marketing.feces_destination}}</strong>
                                            </p>
                                        </b-card-text>
                                        <b-card-text>
                                            <h4 class="mb-4">Canal de ventas</h4>
                                            <p>Acopiador:
                                                <strong v-if="marketing.livestock_sales_channel.is_collector">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Cooperativa:
                                                <strong v-if="marketing.livestock_sales_channel.is_cooperative">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Exportador:
                                                <strong v-if="marketing.livestock_sales_channel.is_exporter">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Empacadora:
                                                <strong v-if="marketing.livestock_sales_channel.use_baler">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Forma directa o feria:
                                                <strong v-if="marketing.livestock_sales_channel.use_fair">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Industria:
                                                <strong v-if="marketing.livestock_sales_channel.use_industry">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Frigorifico: 
                                                <strong v-if="marketing.livestock_sales_channel.use_fridge">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                            <p>Venta directa: 
                                                <strong v-if="marketing.livestock_sales_channel.make_direct_sale">
                                                    Sí
                                                </strong>
                                                <strong v-else>No</strong>
                                            </p>
                                        </b-card-text>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='bovino'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo bobino</h4>
                                    <b-card-text
                                    v-for="(bovine,index_bovine) in livestock.livestock_bovine_cycle" 
                                    :key="'bovine'+index_bovine+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ bovine.created | date-filter }}</b-badge></p>
                                        <p>Terneros menos de un año: 
                                           <strong>
                                               {{bovine.calves_under_one_year}}
                                           </strong> 
                                        </p>
                                        <p>Vaquillonas de uno a dos años: 
                                            <strong>
                                                {{bovine.heifers_one_to_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Vaquillonas mayores de dos años: 
                                            <strong>
                                                {{bovine.heifers_over_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Cantidad de vacas: 
                                            <strong>
                                                {{bovine.number_cows}}
                                            </strong> 
                                         </p>
                                         <p>Novillos de uno a dos años: 
                                            <strong>
                                                {{bovine.steers_one_to_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Novillos mayores de dos años: 
                                            <strong>
                                                {{bovine.steers_older_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Toritos de uno a dos años: 
                                            <strong>
                                                {{bovine.bulls_one_to_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Toritos mayores de dos años: 
                                            <strong>
                                                {{bovine.bulls_older_two_years}}
                                            </strong> 
                                         </p>
                                         <p>Cantidad de bueyes y torunos: 
                                            <strong>
                                                {{bovine.number_oxen_torunos}}
                                            </strong> 
                                         </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='ovino'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo ovino</h4>
                                    <b-card-text
                                    v-for="(sheep,index_sheep) in livestock.livestock_sheep_cycle" 
                                    :key="'sheep'+index_sheep+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ sheep.created | date-filter }}</b-badge></p>
                                        <p>Mayores de seis meses: 
                                            <strong>{{sheep.sheep_under_six_months}}</strong>
                                        </p>
                                        <p>Borregas de seis meses hasta parición: 
                                            <strong>{{sheep.sheep_older_six_months_to_calving}}</strong>
                                        </p>
                                        <p>Borregos de seis meses hasta un año: 
                                            <strong>{{sheep.sheep_older_six_months_one_year}}</strong>
                                        </p>
                                        <p>Cantidad de ovejas: 
                                            <strong>{{sheep.number_sheep}}</strong>
                                        </p>
                                        <p>Cantidad de capones: 
                                            <strong>{{sheep.number_capons}}</strong>
                                        </p>
                                        <p>Cantidad de carneros: 
                                            <strong>{{sheep.number_rams}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='caprino'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo Caprino</h4>
                                    <b-card-text
                                    v-for="(goat,index_goat) in livestock.livestock_goat_cycle" 
                                    :key="'goat'+index_goat+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ goat.created | date-filter }}</b-badge></p>
                                        <p>Cantidad de cabritas y cabritos menores de seis meses:
                                            <strong>{{goat.goats_six_months_to_first_calving}}</strong>
                                        </p>
                                        <p>Cantidad de cabritas  de seis meses hasta la primera parición: 
                                            <strong>{{goat.goats_under_six_months}}</strong>
                                        </p>
                                        <p>Cantidad de cabras: 
                                            <strong>{{goat.number_goats}}</strong>
                                        </p>
                                        <p>Cantidad de capones: 
                                            <strong>{{goat.number_capons}}</strong>
                                        </p>
                                        <p>Cantidad de machos cabrios y chivos: 
                                            <strong>{{goat.number_stallions}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='porcino'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo Porcino</h4>
                                    <b-card-text
                                    v-for="(pig,index_pig) in livestock.livestock_pig_cycle" 
                                    :key="'pig'+index_pig+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ pig.created | date-filter }}</b-badge></p>
                                        <p>Cantidad de lechones hasta tres meses:
                                            <strong>{{pig.up_three_months}}</strong>
                                        </p>
                                        <p>Lechones de tres a ocho meses
                                            <strong>{{pig.three_eight_months}}</strong>
                                        </p>
                                        <p>Machos mayores a ocho meses:
                                            <strong>{{pig.males_older_eight_months}}</strong>
                                        </p>
                                        <p>Hembras mayores a ocho meses:
                                            <strong>{{pig.females_older_eight_months}}</strong>
                                        </p>
                                        <p>Total de capones
                                            <strong>{{pig.number_pigs}}</strong>
                                        </p>
                                        <p>Total de Padrillos
                                            <strong>{{pig.number_stallions}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='camelido'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo de camelido</h4>
                                    <b-card-text
                                    v-for="(llama,index_llama) in livestock.livestock_llama_cycle" 
                                    :key="'llama'+index_llama+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ llama.created | date-filter }}</b-badge></p>
                                        <p>Cantidad de tekes: 
                                            <strong>{{llama.number_tekes}}</strong>
                                        </p>
                                        <p>Cantidad de tekes destetados: 
                                            <strong>{{llama.number_tekes_weaned}}</strong>
                                        </p>
                                        <p>Cantidad de maltonas y maltones: 
                                            <strong>{{llama.number_maltones}}</strong>
                                        </p>
                                        <p>Cantidad de hembras jovenes: 
                                            <strong>{{llama.number_young_females}}</strong>
                                        </p>
                                        <p>Cantidad de machos jovenes: 
                                            <strong>{{llama.number_young_males}}</strong>
                                        </p>
                                        <p>Cantidad de madres: 
                                            <strong>{{llama.number_llamas_mothers}}</strong>
                                        </p>
                                        <p>Cantidad de capones: 
                                            <strong>{{llama.number_capons}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='avicultura'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo avicultura</h4>
                                    <b-card-text
                                    v-for="(poultry,index_poultry) in livestock.livestock_poultry_cycle" 
                                    :key="'poultry'+index_poultry+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ poultry.created | date-filter }}</b-badge></p>
                                        <p>Avicultura intensiva: 
                                            <strong v-if="poultry.is_intensive_poultry">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Planta de incubación: 
                                            <strong v-if="poultry.has_hatchery">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Cantidad de incubadoras: 
                                            <strong>{{poultry.number_incubators}}</strong>
                                        </p>
                                        <p>Huevos incubables: 
                                            <strong>{{poultry.number_hatching_eggs}}</strong>
                                        </p>
                                        <p>Pollitos de uno a dos meses: 
                                            <strong>{{poultry.chicks_one_two_months}}</strong>
                                        </p>
                                        <p>Pollos de recria de tres a cinco meses: 
                                            <strong>{{poultry.chicks_three_five_months}}</strong>
                                        </p>
                                        <p>Hembras mayores a seis meses: 
                                            <strong>{{poultry.females_older_six_months}}</strong>
                                        </p>
                                        <p>Parrilleros en engorde: 
                                            <strong>{{poultry.number_broiler_chickens}}</strong>
                                        </p>
                                        <p>Ponedoras reproductoras: 
                                            <strong>{{poultry.number_breeder_layers}}</strong>
                                        </p>
                                        <p>Machos reproductores: 
                                            <strong>{{poultry.number_breeding_males}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='cunicultura'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo cunicultura</h4>
                                    <b-card-text
                                    v-for="(rabbit,index_rabbit) in livestock.livestock_rabbit_cycle" 
                                    :key="'rabbit'+index_rabbit+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ rabbit.created | date-filter }}</b-badge></p>
                                        <p>Orientación: 
                                            <strong>{{livestock.livestock_rabbit_cycle.orientation}}</strong>
                                        </p>
                                        <p>Reproductores machos: 
                                            <strong>{{livestock.livestock_rabbit_cycle.number_breeding_males}}</strong>
                                        </p>
                                        <p>Reproductores hembras: 
                                            <strong>{{livestock.livestock_rabbit_cycle.number_breeding_females}}</strong>
                                        </p>
                                        <p>Cantidad de gazapos: 
                                            <strong>{{livestock.livestock_rabbit_cycle.number_rabbit}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='apicultura'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo apicultura</h4>
                                    <b-card-text
                                    v-for="(beekeeping,index_beekeeping) in livestock.livestock_beekeeping_cycle" 
                                    :key="'beekeeping'+index_beekeeping+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ beekeeping.created | date-filter }}</b-badge></p>
                                        <p>Renapa: 
                                            <strong v-if="beekeeping.renapa">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Raza de abejas:
                                            <strong>{{beekeeping.kind_bee}}</strong>
                                        </p>
                                        <p>Existencia de colmenas: 
                                            <strong v-if="beekeeping.has_bee_hives">
                                                Sí
                                            </strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Tipo de colmenas: 
                                            <strong>{{beekeeping.type_bee_hives}}</strong>
                                        </p>
                                        <p>Cantidad de cajones: 
                                            <strong>{{beekeeping.number_drawers}}</strong>
                                        </p>
                                        <p>Cantidad de alsas por cajon: 
                                            <strong>{{beekeeping.alsas_drawer}}</strong>
                                        </p>
                                        <p>Periodo de polinización: 
                                            <strong>{{beekeeping.pollination_period}}</strong>
                                        </p>
                                        <p>Tipo de flor polinizada: 
                                            <strong>{{beekeeping.pollinated_flower}}</strong>
                                        </p>
                                        
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2" v-if="livestock.type_activity=='acuicultura'">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Ciclo acuicultura</h4>
                                    <b-card-text
                                    v-for="(aquaculture,index_aquaculture) in livestock.livestock_aquaculture_cycle" 
                                    :key="'aquaculture'+index_aquaculture+1" 
                                    class="second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p><b-badge>{{ aquaculture.created | date-filter }}</b-badge></p>
                                        <p>Orientación: 
                                            <strong>{{livestock.livestock_aquaculture_cycle.orientation}}</strong>
                                        </p>
                                        <p>Existencia: 
                                            <strong>{{livestock.livestock_aquaculture_cycle.existence}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                    </b-collapse>
                </div>
                <!-- End Production Livestock-->
                <br>
                <!-- Production Agro Industrial -->
                <div v-for="(agroindustrial,index_agroindustrial) in item.production_agroindustrial" :key="'agro'+index_agroindustrial+1">
                    <div class="mb-3">
                        <b-button
                        variant="info" 
                        v-b-toggle :href="'#agroindustrial'+index_production+index_agroindustrial"
                        class="btn-block"
                        >
                        <b-icon icon="justify"></b-icon>
                        Producción Agro-Industrial</b-button>
                    </div>
                    <b-collapse :id="'agroindustrial'+index_production+index_agroindustrial">
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Producción Agro Industrial</h4>
                                    <b-card-text>
                                        <p>Tipo: 
                                            <strong>{{agroindustrial.description}}</strong>
                                        </p>
                                        <p>Materia Prima: 
                                            <strong>{{agroindustrial.raw_material}}</strong>
                                        </p>
                                        <p>Mecanizada: 
                                            <strong v-if="agroindustrial.is_mechanized">Sí</strong>
                                            <strong v-else>No</strong>
                                        </p>
                                        <p>Conocimiento: 
                                            {{agroindustrial.knowledge}}
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Producos Alimentarios</h4>
                                    <b-card-text
                                    v-for="(food,index_food) in agroindustrial.agroindustrial_food_product" 
                                    :key="'food'+index_food+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p>Producto: 
                                            <strong>{{food.name_product}}</strong>
                                        </p>
                                        <p>Periodo de vigencia: 
                                            <strong>{{food.validity}}</strong>
                                        </p>
                                        <p>Origen: 
                                            <strong>{{food.origin}}</strong>
                                        </p>
                                        <p>Precio: 
                                            <strong>${{food.price}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Producos Artesanales</h4>
                                    <b-card-text
                                    v-for="(handmande,index_handmande) in agroindustrial.agroindustrial_handmande_product" 
                                    :key="'hand'+index_handmande+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p>Producto: 
                                            <strong>{{handmande.name_product}}</strong>
                                        </p>
                                        <p>Cantidad: 
                                            <strong>{{handmande.quantity}}</strong>
                                        </p>
                                        <p>Precio: 
                                            <strong>${{handmande.price}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="mt-2">
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-2">Herramientas</h4>
                                    <b-card-text
                                    v-for="(tools,index_tools) in agroindustrial.agroindustrial_tools" 
                                    :key="'tools'+index_tools+1" 
                                    class="mb-2 second"
                                    style="padding:15px; border-radius:20px; "
                                    >
                                        <p>Herramienta: 
                                            <strong>{{tools.name_tool}}</strong>
                                        </p>
                                        <p>Tipo de herramienta: 
                                            <strong>{{tools.type_tool}}</strong>
                                        </p>
                                        <p>Cantidad: 
                                            <strong>{{tools.number_tools}}</strong>
                                        </p>
                                    </b-card-text>
                                </b-card-body>
                            </b-card>
                        </div>
                    </b-collapse>
                </div>
                <!-- End Agro Industrial -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

const DataProduction = {
  "chart": {
      "caption": "Superficie de la Producción",
      "subCaption" : "Hectareas de produccion",
      "showValues":"1",
      "showPercentInTooltip" : "0",
      "numberPrefix" : "Hectareas: ",
      "enableMultiSlicing":"1",
      "theme": "fusion"
  },
  "data": [{
      "label": "Producción Agricola",
      "value": "300"
  }, {
      "label": "Producción Ganadera",
      "value": "50"
  }, {
      "label": "Agro-Industria",
      "value": "180"
  }]
};

export default {
    name: 'DateProduction',
    data() {
        return {
            producerId: this.$route.params.producerId,
            map: null,
                myCoordinates: {
                    lat: -28.065566,
                    lng: -67.564566
                },
            zoom: 10,
            clickable: true,
            draggable: false,
            //Data Grafic
            type_grafic1: 'pie3d',
            width_grafic1: '450',
            height_grafic1: '350',
            dataFormat_grafic1: 'json',
            dataSource: DataProduction,
        }
    },
    mounted() {
        this.retrieveProducer(this.producerId)
    },
    methods: {
        ...mapActions([
            'retrieveProducer'
        ])
    },
    computed: {
        ...mapGetters([
            'producer'
        ])
    }
}
</script>

<style>
.title-maps{
    z-index: 1;
    position: absolute;
    margin: 15px;
    color: aliceblue;
}
.maps {
    width:100%;
    height:400px;
    margin: 10px auto;
}
.labels {
    color: white;
    margin-top: 20px;
    size: 30px;
}
</style>