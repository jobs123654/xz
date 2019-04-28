<template>
    <div class="panel panel-default col-md-2" v-show="visible">

        <div class="panel-body">
              <div>
                <div class="form-group">
                    <select name=""  class="form-control" @change='change' v-model="item">
                        <option v-for="item in maps" :value="item" :key="item.name">{{item.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "TabMap",
            props:{
                maps:Array,
            },
            data(){
                return{
                 visible:false,
                    item:this.maps[0]
                }
            },
          components:{

          },
      mounted(){
        bus.$on('showTabMap',e=>{
          this.visible=!this.visible
        });
        bus.$on('closeTabMap',e=>{
          this.visible=false
        });

      },
        methods:{
             change(){
               bus.$emit('tabMap',this.item);
             },

            show(){
                this.visible=true
            },
            close(){
                this.visible=false
                this.more=false
              bus.$emit('showEditClose')
              this.isEdit=false
            }
        }
    }
</script>

<style scoped>

</style>
