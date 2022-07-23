<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    
        <template slot="progress">
            <v-progress-linear
                color="pink"
                hight="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-img
            height="250"
            :src="product.image"
        ></v-img>

        <v-card-title>
            {{ product.title }}
        </v-card-title>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                    :value="product.rating.rate"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>
                <div class="pink--text ms-4">
                    {{product.rating.rate}} ({{product.rating.count}})
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                ${{product.price}}
            </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
            <v-btn 
                color="pink" 
                text
            >
                Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>
                    {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                </v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div
                v-show="show"
            >
                <v-divider></v-divider>

                <v-card-text>
                    {{product.description}}
                </v-card-text>
            </div>
        </v-expand-transition>

        <v-card-actions>
            <v-btn
                color="pink"
                dark
                text
                @click="add(product)"
            >
                <v-icon>mdi-cart</v-icon> Agregar
            </v-btn>
        </v-card-actions>
        <v-snackbar
            v-model="snackbar"
            :aria-multiline="multiLine"
            color="pink"
        >
            {{ product.title }} Agregando al carrito

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'card-product',
    data(){
        return{
            loading: false,
            show:false,
            snackbar:false,
            multiLine:true,

        }
    },
    props: {
        product: {
            type: Object,
            required:true,
        }
    },
    methods:{
      ...mapActions(['addProdToCart']),
      add(){
        let prod = {
            id: this.product.id,
            title: this.product.title,
            price: this.product.price,
            count:1,
        }
        console.log(prod)
        this.addProdToCart(prod)
        this.snackbar = true
      }  
    }

}
</script>

<style>

</style>