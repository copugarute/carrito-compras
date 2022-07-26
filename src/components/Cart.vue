<template>
  <v-container>
        <h1 class="text-center pink--text mb-5">Carrito</h1>
    <v-row justify="center">
        <v-col md="10">
            
                <v-data-table
                    :headers="headers"
                    :items="totalProduct"
                    class="elevation-1"
                >
                    <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title>Total carrito <span class="pink--text">${{Number(totalCart).toLocaleString('en-US')}}</span></v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        
                        <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">¿Estás seguro que quieres borrar este producto?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="addStock(item)"
                    >
                        mdi-plus-circle
                    </v-icon>
                    <v-icon
                        small
                        class="mr-2"
                        @click="removeStock(item)"
                    >
                        mdi-minus-circle
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                    </template>
                    <template v-slot:no-data>
                    <v-btn
                        color="primary"
                        
                    >
                        Reset
                    </v-btn>
                    </template>
                </v-data-table>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data: () => ({
      deleteId:null,
      dialogDelete: false,
      headers: [
        {
          text: 'ID:Producto',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Producto', value: 'title' },
        { text: 'Cantidad', value: 'count' },
        { text: 'Precio', value: 'price' },
        { text: 'Subtotal', value: 'total' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      
    }),

    computed: {
        ...mapGetters(['totalProduct', 'totalCart']),
    },

    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
       },

    methods: {
        ...mapActions(['addStockProduct','removeStockProduct','removeProductCart']),
        addStock(item){
            this.addStockProduct(item.id)
        },
        removeStock(item){
            this.removeStockProduct(item.id)
        },
        deleteItem (item) {
            this.deleteId = item.id
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.removeProductCart(this.deleteId)
            this.closeDelete()
        },

        closeDelete () {
            this.dialogDelete = false
        },
    },
  
}
</script>

<style>

</style>