[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13922195&assignment_repo_type=AssignmentRepo)
# FSJSP2S5-LC03 - Hacktiv Legend

## Ringkasan

Urgent, kalian mendapatkan tugas untuk membuat aplikasi Full Stack Javascript client-server (Node.js, Express.js, Postgres, Sequelize, React.js) bernama `Hacktiv Legend` yaitu sebuah website yang dapat menampilkan daftar hero dan User dapat menyimpan favourite hero mereka dan mengupdatenya. Feature-feature aplikasi ini adalah:

1. User dapat melakukan register
2. User dapat melakukan login
3. User dapat melihat list Hero
4. User dapat membuat Hero Favourite
5. User dapat mengubah Hero Favourite dengan data Power dan Roles

Aplikasi ini akan dibuat scratch dari awal oleh karena itu pastikan feature yang akan dibuat sesuai dengan yang diminta, kalian hanya diberikan `api_docs.md` sebagai panduan dalam membuat server dan client. Silahkan kalian buat feature by feature sesuai release yang disediakan `README.md` ini!

Silahkan cek contoh demo aplikasi pada link berikut: [Hacktiv Legend](https://drive.google.com/file/d/18GQztoDsuUR0pdj0khLs22upg3xn80CX/view?usp=sharing)

## Aturan & Kebijakan

- Waktu Pengerjaan: **270 min** (4 Jam 30 Min)
- Student diharapkan menjunjung tinggi INTEGRITAS. Segala bentuk ketidakjujuran meliputi peniruan, plagiarisme, pemalsuan pengerjaan akan mendapatkan tindakan tegas dari akademik
- Data hero diperbolehkan untuk dimasukkan melalui seeding atau input manual pada database GUI
- Error minimal ditampilkan menggunakan `console.log` di client
- (-10) jika `node_modules` tidak diignore
- (-5) jika `package.json` tidak ada, tidak valid atau tidak dipush
- (-5) jika tidak menyertakan example value `.env` bagi yang menggunakan dotenv
- (-5) jika tidak menerapkan konsep SPA
- (-5) Error tidak ditampilkan pada client
- (-2) jika menggunakan `alert` bawaan browser (gunakan sweetalert atau sejenisnya)

## Bobot penilaian
- RESTful API			
- Protecting App
- Basic Web Development & Layouting
- UI Library
- State Management
- Testing

## Components

Buatlah client side kalian yang terdiri dari beberapa component-component berikut:

- Login Page
- Home Page
- Navbar
- Favourites Page
- Update Form Page
- Hero Card
- Favourite Card

## Release 0 - Setup Project

Lakukan setup project full stack dengan menginstall package yang sudah diajarkan sebelumnya. Adapun folder yang dibuat hanya ada `server` & `client`. Pada project ini terdapat:

1. `api_docs.md`: API Docs sebagai guideline pembuatan server
2. server: untuk pembuatan REST API
3. template: CSS template yang bisa membantu dalam pembuatan client. Kalian boleh menggunakan framework CSS favorite kalian pada project ini, template atau demo hanya refrensi
4. server/`__tests__`: Testing untuk server

### 0.1 Setup: Server

Aplikasi ini memiliki 3 entitas atau table. Buatlah Model sesuai `api_docs.md` pada folder server dan buatlah relasi yang sesuai antara User, Hero dan Favorite. `User` memiliki relasi many to many terhadap `Hero` melalui table conjuction `Favorite`. Jangan lupa implementasi error handling untuk error yang ada pada server.

### Deployed server

Server ini sebagai backup ketika kalian mengalami kesulitan dalam pengerjaan server.

- url: [Hacktiv Legend API](https://api.h8-legend.phase2.foxhub.space)
- registered user :
```js
user1 = { email : 'user1@mail.com', password: 'user1' }
user2 = { email : 'user2@mail.com', password: 'user2' }
```

Jika ingin membuat user baru, silahkan lakukan register user dengan email yg belum terdaftar sesuai `api_docs.md`

### 0.2 Setup: Client

Aplikasi ini menggunakan React.js. Buatlah folder `client` dengan menggunakan `vite` dan `react-router` untuk pada client side.

## Release 1 - Authentication: Register & Login

Feature ini bertujuan untuk memberikan authentication pada user agar aplikasi exclusive dan bisa menyiman informasi favorite sesuai dengan data user

### 1.1 Server: Register

- Buatlah sebuah endpoint `POST /register` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no.1
- Pastikan kalian melakukan hash password menggunakan `bcrypt` sebelum kalian simpan pada database

### 1.2 Server: Login

- Buatlah sebuah endpoint `POST /login` dengan request, status code, response success, response error (+global error) sesuai `api_doc.md` no.2
- Buatlah proses authentication menggunakan `jsonwebtoken` untuk membuat token, pastikan kalian menyimpan data rahasia pada env

### 1.3 Client: Login

- CATATAN: untuk proses register tidak perlu dibuat client side, Register hanya dilakukan dengan HTTP Client
- Buatlah halaman `/login` untuk menampilkan form login user seperti demo
- Jika proses login berhasil maka akan menuju halaman `/` atau home dan menampilkan semua hero yang ada dari server
- Pastikan ketika user sudah berhasil login, ketika direfresh maka user tidak harus login lagi

### 1.4 Client: Logout

- Buatlah tombol logout dan ketika proses logout berhasil maka akan kembali ke tampilan login
- Pastikan ketika user sudah berhasil logout, ketika direfresh maka user akan ke tampilan login

## Release 2 - Fetch Heroes

Feature ini bertujuan untuk memberikan kepada user valid list hero yang ada pada aplikasi

### 2.1 Server: GET Heroes

- Buatlah sebuah endpoint `GET /heroes` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no.3
- Authentication Check: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Buatlah initial data hero sesuai data json yang diberikan, boleh menggunakan seeding atau input manual pada database GUI

### 2.2 Client: Halaman Home

- Buatlah halaman `/` untuk menampilkan list heroes di client dari server yang sudah dibuat sesuai `api_doc.md`
- Terapkan konsep component untuk setiap bagian yang bersifat `reuseable`
- Buatlah Card untuk menampilkan Hero dan tambahkan tombol `CHOOSE HERO` pada setiap Card Hero yang ada
- TAMBAHAN: Pastikan hanya User yang sudah login yang bisa melihat halaman Home

## Release 3 - Add Hero to Favourites

Feature ini bertujuan agar user valid bisa menambahkan hero favourite pada aplikasi

### 3.1 Server: POST favourites

- Buatlah sebuah endpoint `POST /favourites/:heroId` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no.4

### 3.2 Client: Feature Choose Hero

- Pada halaman Home, Integrasi tombol `Choose Hero` di card Hero sehingga dapat menambahkan Hero ke daftar favourite User yang sedang login
- Jika berhasil menambahkan Hero Favourite maka user akan diarahkan ke Halaman Favourites
- Jika berhasil maka list favourite hero user akan bertambah otomatis di client (Pastikan website kalian reaktif)
- TAMBAHAN: Lakukan validasi untuk club yang duplikat

## Release 4 - Fetch Favourites

Feature ini bertujuan agar user valid bisa melihat hero favourite yang sudah ditambahkan

### 4.1 Server: GET Favourites

- Buatlah sebuah endpoint `GET /favourites` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no.5
- Authentication Check: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Fetch data favourites hanya milik User yang sedang login

### 4.2 Client: Halaman Favourites

- Buatlah halaman `/favourites` untuk menampilkan list heroes favorite User di client dari server yang sudah dibuat sesuai `api_doc.md`
- Buatlah Navigasi untuk menuju halaman `/favourites`
- Buatlah Card untuk menampilkan list dari Hero Favourite dan tambahkan tombol `Update` pada setiap Card Hero yang ada
- Terapkan konsep component untuk setiap bagian yang bersifat `reuseable`

## Release 5 - Update Favourite

Feature ini bertujuan agar user valid mengubah data power dan roles pada hero favouritenya

### 5.1 Server: PUT Favourites By Id

- Buatlah sebuah endpoint `PUT /favourites/:id` dengan headers, request, status code, response success, response error (+global error) sesuai `api_doc.md` no.6
- Authentication Check: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Authorization Check: Pastikan, data yang diubah hanya data yang dibuat oleh user tersebut

### 5.2 Client: Feature Update Hero

- Pada halaman Favourite, Integrasi tombol `Update` pada list Hero Favourite ke Halaman Update Hero sesuai dengan Id
- Buatlah halaman `/update/:id` untuk menampilkan form update Hero Favourite by Id di client. Data yang diupdate adalah `Power (Input Number)` dan `Roles (Select Option yang terdiri: Jungler, Roamer, Mid Laner, Gold Laner, Exp Laner)`
- Jika berhasil melakukan Update Hero Favourite, user akan diredirect ke halaman Favourites
- Jika berhasil update Hero Favourite maka list Hero Favourite akan berubah sesuai dengan data yang diupdate tanpa harus di refresh (Pastikan website kalian reaktif)

## Github Live Code Workflow

Dalam pengerjaan live code, kalian diminta untuk melakukan `commit` sebagai checkpoin pengerjaan. Jika pengerjaan release sudah selesai, segera lakukan `add commit push` dengan message relase yang jelas.

- Contoh 1: `git commit -m "Release 0.1 Setup: Server, Done"`
- Contoh 2: `git commit -m "Release 3.1 Server: POST favourites, Done"`
- Contoh 3: `git commit -m "2.2 Client: Halaman Home, Done No TAMBAHAN"`

## Testing

Kalian bisa menguji apakah REST API yang sudah kalian buat sesuai dengan docs yang diharapkan dengan testing berikut:

1. Drop db testing: `sequelize --env test db:drop`
2. Create db testing: `sequelize --env test db:create`
3. Migrate db testing: `sequelize --env test db:migrate`
4. Ketika run test, app.listen nya boleh dicomment atau bikin di bin/www, di app.js lakukan module.exports = app
5. Pada package.json tambahkan script `"test": "jest --runInBand --forceExit"`
