import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiclientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
})
export class ForoComponent  implements OnInit {

  selectedUserId: any;
  usuarios: any;
  publicacion: any = {
    userId: null,
    id: null,
    title: '',
    body: '',
    name: ''
  };
  publicaciones: Array<any> = [];
  publicacionSeleccionada: any;

  constructor(
    private api: ApiclientService,
    private toastController: ToastController) { }
    
  ngOnInit() {}

  ionViewWillEnter() {
    this.selectedUserId = null;
    this.setPublicacion(null, null, '', '', '');
    this.getUsuarios();
    this.getPublicaciones();
  }

  cambiarUsuario($event: number) {
    this.setPublicacion($event, null, '', '', '');
  }

  // El siguiente método limpia las cajas de texto de edición de la Publicación.
  // Pero se debe tener en cuenta de que el campo de control "this.publicacion.userId",
  // no se limpia con un nulo, sino que toma siempre el valor del userId que corresponde
  // al nombre del usuario seleccionado como "Publicador".

  limpiarPublicacion() {
    this.setPublicacion(this.selectedUserId, null, '', '', '');
  }

  // El siguiente método sirve para configurar (o asignar) los valores de las
  // cajas de texto para agregar o modificar una Publicación. La propiedad
  // "this.publicacion" se despliega como interpolación en las cajas de Título y Cuerpo.
  // El método en su segunda parte muestra los datos de la publicación que no se ven,
  // estos son: el id del usuario y el id de la publicación. Estos datos no se deben
  // mostrar porque sólo son datos de control, sin embargo como estamos depurando la
  // aplicación los mostraremos en color verde. Si el parámetro userId viene en null
  // es porque el usuario no ha seleccionado su nombre en el campo "Publicador".
  // Por otro lado si el parámetro pubId viene en null es porque se trata de una
  // nueva publicación, mientras que si tiene un valor, es porque el usuario seleccionó
  // una publicación con el botón de lápiz en el listado de "Publicaciones recientes".

  setPublicacion(userId: any, pubId: any, title: any, body: any, name: any) {

    // Establecer los datos de la publicación

    this.publicacion.userId = userId;
    this.publicacion.id = pubId;
    this.publicacion.title = title;
    this.publicacion.body = body;
    this.publicacion.name = name;

    // mostrar los datos de control, que sirven para saber si se trata de una
    // nueva pubicación o de una ya existente que se está editando actualmente.

    const uid = userId === null? 'no seleccionado' : userId;
    const pid = pubId === null? 'nueva' : pubId;
    this.publicacionSeleccionada = `(userId: ${uid} - pubId: ${pid})`;
  }

  // El siguiente método se subscribe a la Promesa que entrega nuestra Api Cliente
  // mediante el método "this.api.getUsuarios()" de modo que una vez que haya
  // recibidos los usuario, le asigna esta lista a la propiedad "this.usuarios"
  // que está ligada por ngModel con la propiedad "this.selectedUserId" y que
  // llena el "ion-select" con todos los usuarios usando la directiva
  // *ngFor="let u of usuarios" en cada uno de los "ion-select-option" de la lista.

  getUsuarios() {
    this.api.getUsuarios().subscribe(data => this.usuarios = data);
  }

  // El siguiente método llena la lista de "Publicaciones recientes".
  // Para llenar todos los ítem de la lista de "Publicaciones recientes",
  // hay que subscribirse a la Promesa que entrega nuestra Api Cliente
  // mediante el método "this.api.getPublicaciones()". Si la lista es
  // obtenida correctamente, entonces, el programa se subscribe a una
  // nueva Promesa que entrega nuestra Api Cliente mediante el método
  // "this.api.getUsuarios()" de modo que una vez recibidos los usuarios
  // el programa recorre con un forEach todas las publicaciones para
  // llenarles el nombre del usuario que realizó la publicación. Como
  // la lista de Publicaciones viene con los registros desde el más
  // antiguo al más nuevo, lo que se hace es usar el método
  // "publicaciones.reverse()" que invierte el orden de más reciente
  // a más antiguo.

  getPublicaciones() {

    this.api.getPosts().subscribe((publicaciones) => {

      // Las siguientes líneas son para llenar los nombres de los usuarios
      // que realizaron las publicaciones, puesto que en los registros de
      // las "Publicaciones recientes" sólo viene el "ID de Usuario", pero
      // no su nombre. Para obtener todos los nombres de todos los usuarios,
      // hay que subscribirse a la Promesa que entrega nuestra Api Cliente
      // mediante el método "this.api.getUsuarios()"

      this.api.getUsuarios().subscribe((usuarios) => {
        // Recorrer las publicaciones para actualizar el nombre del usuario
        publicaciones.forEach((publicacion: any) => {
          publicacion.name = usuarios.find((u: any) => u.id === publicacion.userId).name;
        });
        // Invertir la lista de publicaciones para que muestre desde la más nueva a la más antigua
        publicaciones.reverse();
        // Actualizar lista de publicaciones
        this.publicaciones = publicaciones;
      });
    });
  }

  // Este método permite guardar las publicaciones que se mostrarán en la lista de
  // "Publicaciones recientes". El método primero verifica que se haya seleccionado: un
  // Usuario Publicador, el Título y el Cuerpo de la Publicación.
  // El programa verifica si la propiedad "this.publicacion.id" es null, en cuyo caso
  // se trata de una publicación nueva, pero en caso de que tenga valor se trata
  // de la edición de una Publicación ya existente. El valor de "this.publicacion.id"
  // se usa como dato de control para saber si hay que crear o actualizar. Cada vez
  // que un susuario presiona el botón de lápiz para editar una publicación, se llena el
  // valor de "this.publicacion.id" con número de publicación correspondiente al
  // item seleccionado en la lista.

  guardarPublicacion() {
    if (this.publicacion.userId === null) {
      this.mostrarMensaje('Antes de hacer una publicación debe seleccionar un usuario.');
      return;
    }
    if (this.publicacion.title.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.body.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el cuerpo.');
      return;
    }
    if (this.publicacion.id === null) {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  // Es importante entender que el sitio web JSON Place holder no puede insertar
  // nuevas publicaciones de los programadores que usan su api para hacer pruebas.
  // Esto es muy lógico, pues de lo contrario todos los programadores que usaran
  // sus apis saturarían de registros sus servidores. No obstante, como indica la
  // documentación de JSON Place holder, ellos devolverán los mismos datos que
  // uno les mandó para hacer el "create", pero con el id "101". Para demostrar
  // que el registro fue creado, mostraremos un mensaje emergente de ToastController.
  // Para crear una nueva publicación hay que subscribirse a la Promesa que entrega
  // nuestra Api Cliente mediante el método "this.api.createPublicacion()"
  // enviándole los datos por medio de la propiedad "this.publicacion"

  crearPublicacion() {
    this.api.createPost(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION CREADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE CREAR LA PUBLICACION.', error)
    );
  }

  // Para actualizar una publicación hay que subscribirse a la Promesa que entrega
  // nuestra Api Cliente mediante el método "this.api.updatePublicacion()"
  // enviándole los datos por medio de la propiedad "this.publicacion"

  actualizarPublicacion() {
    this.api.updatePost(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ACTUALIZADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ACTUALIZAR LA PUBLICACION.', error)
    );
  }

  // Este método se usa para transferir los datos de una Publicación desde la lista
  // de "Publicaciones recientes", hacia las cajas de texto de Título y Cuerpo, donde
  // se pueden modificar ambos datos, para luego poder actualizarlos presionando el
  // botón de Guardar. El método se activa cuando el usuario hace clic en el botón de
  // lápiz que se encuentra a la derecha de cada publicación en la lista implementada
  // con el control gráfico "ion-list". Nótese que al lado de cada ítem hay un botón de
  // lápiz para editar y otro de tarro de basura para eliminar una publicación.
  // Resulta muy importante comprender que para poder modificar una publicación ya
  // existente, se debe guardar el Id del usuario y el Id de la publicación (su número),
  // ya que sólo de esta forma el programa se puede dar cuenta de cuál publicación es la
  // que hay que actualizar. El Id de usuario se almacena en la propiedad
  // "this.publicacion.userId" y se actualiza cada vez que el usuario decide cambiar
  // su nombre de "Publicador" en el "ion-select" (combobox de usuarios). Cuando
  // un usuario cambia de "Publicador" en el combobox se activa el evento
  // "cambiarUsuario($event: number)" que recibe el Id del usuario seleccionado
  // por medio del parámetro $event.

  editarPublicacion($event){
    const pub = $event;
    this.setPublicacion(pub.userId, pub.id, pub.title, pub.body, pub.name);
    document.getElementById('topOfPage')?.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  // Este método sirve para eliminar una publicación de la lista. Para poder identificar
  // la publicación que ha seleccionado el usuario se le envía el objeto completo
  // con todos los datos de la publicación. Lo anterior se consigue programando el evento
  // (click)="editarPublicacion(p)" donde p es la publicación que se va mostrando una
  // por una gracias al comando *ngFor="let p of publicaciones;" usando en el tag "ion-item"

  eliminarPublicacion($event){
    const pubId = $event.id;
    this.api.deletePost(pubId).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ELIMINADA CORRECTAMENTE: ${pubId}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ELIMINAR LA PUBLICACION.', error)
    );
  }

  // Este método ayuda a Angular a resolver más rápidamente la necesidad
  // refrescar las listas de datos cuando son muy grandes, ya que es el
  // propio programador quién le indica a Angular cuál es el identificador
  // único del ítem. En este caso la lista está compuesta por publicaciones,
  // donde el identificador único de cada publicación es la propiedad "id"
  // (es el campo que aparece en la lista como "Publicación #nnn").

  getIdentificadorItemPublicacion(index: any, item: any) {
    return item.id;
  }

  // El siguiente método sirve para mostrar un mensaje informativo al usuario

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  // El siguiente método se encarga de mostrar un mensaje de error en
  // caso de que algún método lo haya informado en los scripts de
  // "error" o "catch". Esta función no sólo muestra un mensaje al usuario
  // sino que también arroja el mismo error a la consola del browser,
  // para que el programador pueda encontrar rápidamente el problema

  async mostrarError(mensaje: any, error: any) {
    console.log(mensaje);
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
    throw error;
  }

  public limpiar(): void {}

  public publicar(): void {}
}
