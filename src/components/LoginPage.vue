<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">{{ title }}</div>

          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required autofocus>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>

              <div class="form-group">
                <button @click="login" type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie';

export default {
  data() {
    return {
      email: '',
      password: '',
      title: 'Login'
    }
  },

  methods: {
    login() {
      const user = {
        email: this.email,
        contraseña: this.password
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
                }
        })
        .then(response => {
            if (response.status == 401){
                alert('Credenciales invalidas')
            } else if (response.status == 200){
                cookies.set("userToken", this.email, { samesite: 'strict'});
                this.$router.push("/panel")
            }
        })
        }
    }
}
</script>