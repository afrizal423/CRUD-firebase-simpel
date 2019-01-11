<template>
  <div class="hello container">
    <h1>Welcome to Vue CLI App CRUD(Create,Read,Update,Delete) Firebase</h1>
      <div class="card">
        <div class="card-header">
          Tambah Mahasiswa
        </div>
        <div class="card-body">
          <div class="card-text">
            <form @submit.prevent="addMhs">
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label" >Nama:</label>
              <div class="col-sm-10">
                <input type="text" id="nama" class="form-control" v-model="dataMhs.nama">
              </div>
            </div>
            <div class="form-group row">
              <label for="city" class="col-sm-2 col-form-label">NPM:</label>
              <div class="col-sm-10">
                <input type="text" id="npm" class="form-control"  v-model="dataMhs.npm">
              </div>
            </div>
            <div class="form-group row">
              <label for="phone" class="col-sm-2 col-form-label">Jurusan:</label>
              <div class="col-sm-10">
                <input type="text" id="jurusan" class="form-control"  v-model="dataMhs.jurusan">
              </div>
            </div> 
            <button type="submit" class="btn btn-primary float-right">tambah mahasiswa</button>        
          </form>
          </div>
        </div>
      </div>
      <br><br><br>
      <div class="card">
      <h4 class="card-header">
        Mahasiswa List
      </h4>
      <div class="card-body">
        <p class="card-text">
          <table class="table">
            <thead class="thead-inverse">
              <tr>
                <th>Nama</th>
                <th>NPM</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody v-for="dtmhs in mahasiswa" v-bind:key="dtmhs['.key']">
              <tr  v-if="!dtmhs.edit">
                <td>{{ dtmhs.nama }}</td>
                <td>{{ dtmhs.npm }}</td>
                <td>{{ dtmhs.jurusan }}</td>
                <td><button @click="editMhs(dtmhs['.key'])" class="btn btn-warning" >
  Edit
</button><button class="btn btn-danger" @click="removeMhs(dtmhs['.key'])">Remove</button></td>
              </tr>
               <tr v-else>
                 <td><input type="text" v-model="dtmhs.nama"></td>
                 <td><input type="text" v-model="dtmhs.npm"></td>
                 <td><input type="text" v-model="dtmhs.jurusan"></td>
                <td><button @click="saveMhs(dtmhs)" class="btn btn-primary" >
  save
</button><button class="btn btn-danger" @click="cancelMhs(dtmhs['.key'])">Batal</button></td>
              </tr>
            </tbody>
          </table>
        </p>
      </div>
    </div>
    
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-for="dtmhs in mahasiswa" v-bind:key="dtmhs['.key']">
        <div  v-if="dtmhs.edit">
                 <input type="text" v-model="dtmhs.nama">
              </div>
              <button class="btn btn-danger" @click="cancelMhs(dtmhs['.key'])">Batal</button>
        <button @click="saveMhs(dtmhs)" class="btn btn-primary" >
  save
</button>
      </div>
      <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script>
import Firebase from 'firebase'
  let config = {
    // Letak firebase API Muu
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
let app = Firebase.initializeApp(config);
let db = app.database();
let mhsRef = db.ref('mahasiswa');
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  firebase: {
      mahasiswa: mhsRef
    },
  data () {
      return {
        dataMhs: {
          nama: '',
          npm: '',
          jurusan: '',
          edit: false
        }
      }
    },
    methods: {
      addMhs() {
        mhsRef.push(this.dataMhs)
        this.dataMhs.nama = ''
        this.dataMhs.npm = ''
        this.dataMhs.jurusan = ''
      },
      removeMhs(key) {
        mhsRef.child(key).remove();
      },
      editMhs(key) {
        mhsRef.child(key).update({ edit: true});
      },
      cancelMhs(key) {
        mhsRef.child(key).update({ edit: false});
      },
      saveMhs(mhsa){
        const key = mhsa['.key']
        mhsRef.child(key).set({
          nama: mhsa.nama,
          npm: mhsa.npm,
          jurusan: mhsa.jurusan,
        edit: false })
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
